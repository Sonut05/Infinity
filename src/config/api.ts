/**
 * Centralized API configuration for Infinity Space Group
 * 
 * Uses environment variable VITE_API_BASE_URL when configured,
 * defaulting to the local development Flask API at http://localhost:5000.
 */

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
).replace(/\/$/, '');

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/api/health`,
  READY: `${API_BASE_URL}/api/ready`,
  ENQUIRIES: `${API_BASE_URL}/api/enquiries`,
  ADMIN: {
    CSRF: `${API_BASE_URL}/api/admin/csrf`,
    LOGIN: `${API_BASE_URL}/api/admin/login`,
    LOGOUT: `${API_BASE_URL}/api/admin/logout`,
    ME: `${API_BASE_URL}/api/admin/me`,
    DASHBOARD: `${API_BASE_URL}/api/admin/dashboard`,
    ENQUIRIES: `${API_BASE_URL}/api/admin/enquiries`,
    ENQUIRY: (id: number | string) => `${API_BASE_URL}/api/admin/enquiries/${id}`,
  },
} as const;

export interface EnquiryApiPayload {
  name: string;
  phone: string;
  email: string;
  service: string;
  project_type: string;
  project_location: string;
  message: string;
  budget?: string;
}

export interface EnquirySuccessResponse {
  success: true;
  message: string;
  enquiry: {
    id: number;
    status: string;
  };
}

export interface EnquiryValidationErrorResponse {
  error: string;
  fields: Record<string, string>;
}

export interface EnquiryGenericErrorResponse {
  error: string;
  message?: string;
}

export type EnquiryApiResponse =
  | { ok: true; data: EnquirySuccessResponse; message?: string; validationErrors?: never }
  | { ok: false; status: number; validationErrors?: Record<string, string>; message: string };

// Admin data structures
export interface AdminUser {
  id: number;
  username: string;
  email: string;
}

export interface AdminDashboardCounts {
  total: number;
  new: number;
  contacted: number;
  in_progress: number;
  closed: number;
}

export type EnquiryStatus = 'new' | 'contacted' | 'in_progress' | 'closed';

export interface AdminEnquiryItem {
  id: number;
  reference: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  project_type: string;
  project_location: string;
  budget?: string;
  message: string;
  status: EnquiryStatus;
  created_at: string;
  updated_at?: string;
}

export interface AdminEnquiryListResponse {
  items: AdminEnquiryItem[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

/**
 * Sends enquiry to Flask REST API
 */
export async function sendEnquiryToApi(payload: EnquiryApiPayload): Promise<EnquiryApiResponse> {
  try {
    const response = await fetch(API_ENDPOINTS.ENQUIRIES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (response.status === 201 && data?.success) {
      return { ok: true, data, message: data.message };
    }

    if (response.status === 422 && data?.fields) {
      return {
        ok: false,
        status: 422,
        validationErrors: data.fields,
        message: data.error || 'Please review and correct the highlighted fields.',
      };
    }

    return {
      ok: false,
      status: response.status,
      message: data?.message || data?.error || "We couldn't submit your enquiry right now. Please try again or contact us directly.",
    };
  } catch {
    return {
      ok: false,
      status: 0,
      message: "We couldn't submit your enquiry right now. Please try again or contact us directly.",
    };
  }
}

// In-memory CSRF token cache
let activeCsrfToken: string | null = null;

export function setActiveCsrfToken(token: string | null) {
  activeCsrfToken = token;
}

export function getActiveCsrfToken(): string | null {
  return activeCsrfToken;
}

export async function fetchCsrfToken(): Promise<string | null> {
  try {
    const response = await fetch(API_ENDPOINTS.ADMIN.CSRF, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Accept': 'application/json' },
    });
    if (response.ok) {
      const data = await response.json();
      if (data?.csrf_token) {
        activeCsrfToken = data.csrf_token;
        return activeCsrfToken;
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Admin Login API call
 */
export async function adminLoginApi(email: string, password: string): Promise<{
  ok: boolean;
  status: number;
  admin?: AdminUser;
  error?: string;
}> {
  try {
    let token = activeCsrfToken;
    if (!token) {
      token = await fetchCsrfToken();
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (token) {
      headers['X-CSRF-Token'] = token;
    }

    const response = await fetch(API_ENDPOINTS.ADMIN.LOGIN, {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data?.success) {
      if (data.csrf_token) {
        activeCsrfToken = data.csrf_token;
      }
      return { ok: true, status: response.status, admin: data.admin };
    }

    return {
      ok: false,
      status: response.status,
      error: data?.error || 'Authentication failed. Please check your credentials.',
    };
  } catch {
    return {
      ok: false,
      status: 0,
      error: 'Unable to connect to authentication service. Please check your network.',
    };
  }
}

/**
 * Admin Logout API call
 */
export async function adminLogoutApi(): Promise<boolean> {
  try {
    let token = activeCsrfToken;
    if (!token) {
      token = await fetchCsrfToken();
    }
    const headers: Record<string, string> = { 'Accept': 'application/json' };
    if (token) {
      headers['X-CSRF-Token'] = token;
    }

    const response = await fetch(API_ENDPOINTS.ADMIN.LOGOUT, {
      method: 'POST',
      credentials: 'include',
      headers,
    });
    activeCsrfToken = null;
    return response.ok;
  } catch {
    activeCsrfToken = null;
    return false;
  }
}

/**
 * Admin Current Session Verification
 */
export async function getAdminMeApi(): Promise<{
  authenticated: boolean;
  admin?: AdminUser;
  status: number;
}> {
  try {
    const response = await fetch(API_ENDPOINTS.ADMIN.ME, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Accept': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.csrf_token) {
        activeCsrfToken = data.csrf_token;
      }
      return { authenticated: true, admin: data.admin, status: 200 };
    }

    return { authenticated: false, status: response.status };
  } catch {
    return { authenticated: false, status: 0 };
  }
}

/**
 * Fetch Admin Dashboard Summary Statistics
 */
export async function getAdminDashboardApi(): Promise<{
  ok: boolean;
  data?: AdminDashboardCounts;
  status: number;
}> {
  try {
    const response = await fetch(API_ENDPOINTS.ADMIN.DASHBOARD, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Accept': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      return { ok: true, data, status: 200 };
    }

    return { ok: false, status: response.status };
  } catch {
    return { ok: false, status: 0 };
  }
}

/**
 * Fetch Paginated Admin Enquiries with Filters
 */
export interface AdminEnquiriesQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  service?: string;
  sort?: 'newest' | 'oldest';
}

export async function getAdminEnquiriesApi(query: AdminEnquiriesQuery = {}): Promise<{
  ok: boolean;
  data?: AdminEnquiryListResponse;
  status: number;
  error?: string;
}> {
  try {
    const params = new URLSearchParams();
    if (query.page) params.set('page', String(query.page));
    if (query.limit) params.set('limit', String(query.limit));
    if (query.search) params.set('search', query.search);
    if (query.status && query.status !== 'all') params.set('status', query.status);
    if (query.service && query.service !== 'all') params.set('service', query.service);
    if (query.sort) params.set('sort', query.sort);

    const url = `${API_ENDPOINTS.ADMIN.ENQUIRIES}?${params.toString()}`;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Accept': 'application/json' },
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data?.items) {
      return { ok: true, data, status: response.status };
    }

    return {
      ok: false,
      status: response.status,
      error: data?.error || 'Failed to load enquiries.',
    };
  } catch {
    return {
      ok: false,
      status: 0,
      error: 'Network error while fetching enquiries.',
    };
  }
}

/**
 * Fetch Single Enquiry by ID
 */
export async function getAdminEnquiryDetailApi(id: number | string): Promise<{
  ok: boolean;
  enquiry?: AdminEnquiryItem;
  status: number;
  error?: string;
}> {
  try {
    const response = await fetch(API_ENDPOINTS.ADMIN.ENQUIRY(id), {
      method: 'GET',
      credentials: 'include',
      headers: { 'Accept': 'application/json' },
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data?.enquiry) {
      return { ok: true, enquiry: data.enquiry, status: response.status };
    }

    return {
      ok: false,
      status: response.status,
      error: data?.error || 'Enquiry not found.',
    };
  } catch {
    return {
      ok: false,
      status: 0,
      error: 'Network error while fetching enquiry details.',
    };
  }
}

/**
 * Update Enquiry Status
 */
export async function updateEnquiryStatusApi(
  id: number | string,
  status: EnquiryStatus
): Promise<{
  ok: boolean;
  enquiry?: AdminEnquiryItem;
  status: number;
  error?: string;
}> {
  try {
    let token = activeCsrfToken;
    if (!token) {
      token = await fetchCsrfToken();
    }
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (token) {
      headers['X-CSRF-Token'] = token;
    }

    const response = await fetch(API_ENDPOINTS.ADMIN.ENQUIRY(id), {
      method: 'PATCH',
      credentials: 'include',
      headers,
      body: JSON.stringify({ status }),
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data?.enquiry) {
      return { ok: true, enquiry: data.enquiry, status: response.status };
    }

    return {
      ok: false,
      status: response.status,
      error: data?.error || 'Failed to update enquiry status.',
    };
  } catch {
    return {
      ok: false,
      status: 0,
      error: 'Network error while updating enquiry status.',
    };
  }
}
