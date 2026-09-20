import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  type AdminDashboardCounts,
  type AdminEnquiryItem,
  getAdminDashboardApi,
  getAdminEnquiriesApi,
} from '../../config/api';
import {
  Inbox,
  Clock,
  PhoneCall,
  CheckCircle2,
  FolderSync,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { handleUnauthorized } = useAdminAuth();
  const navigate = useNavigate();

  const [counts, setCounts] = useState<AdminDashboardCounts | null>(null);
  const [recentEnquiries, setRecentEnquiries] = useState<AdminEnquiryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [dashRes, enqRes] = await Promise.all([
        getAdminDashboardApi(),
        getAdminEnquiriesApi({ page: 1, limit: 5, sort: 'newest' }),
      ]);

      if (dashRes.status === 401 || enqRes.status === 401) {
        handleUnauthorized();
        return;
      }

      if (dashRes.ok && dashRes.data) {
        setCounts(dashRes.data);
      } else {
        setError('Failed to fetch dashboard metrics.');
      }

      if (enqRes.ok && enqRes.data) {
        setRecentEnquiries(enqRes.data.items);
      }
    } catch {
      setError('An unexpected network error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5" />
            New
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mr-1.5" />
            Contacted
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mr-1.5" />
            In Progress
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mr-1.5" />
            Closed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#07151D] font-serif">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Real-time summary of architectural, engineering, and construction client consultations.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={fetchData}
            disabled={isLoading}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link
            to="/admin/enquiries"
            className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#1479D1] hover:bg-[#063A58] transition-colors shadow-sm"
          >
            <Inbox className="w-3.5 h-3.5 mr-1.5" />
            <span>Manage All Enquiries</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span>{error}</span>
          </div>
          <button onClick={fetchData} className="underline font-semibold hover:text-red-900">
            Retry
          </button>
        </div>
      )}

      {/* Summary Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total */}
        <div
          onClick={() => navigate('/admin/enquiries')}
          className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-[#1479D1] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium uppercase tracking-wider">
            <span>Total Enquiries</span>
            <Inbox className="w-4 h-4 text-gray-400 group-hover:text-[#1479D1] transition-colors" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold text-[#07151D]">
              {isLoading ? '...' : counts?.total ?? 0}
            </span>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">All incoming submissions</p>
        </div>

        {/* New */}
        <div
          onClick={() => navigate('/admin/enquiries?status=new')}
          className="bg-white p-5 rounded-xl border border-blue-200 shadow-sm hover:border-blue-400 transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#1479D1]" />
          <div className="flex items-center justify-between text-blue-700 text-xs font-semibold uppercase tracking-wider">
            <span>New</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold text-blue-900">
              {isLoading ? '...' : counts?.new ?? 0}
            </span>
          </div>
          <p className="text-[11px] text-blue-600 mt-2">Pending initial review</p>
        </div>

        {/* Contacted */}
        <div
          onClick={() => navigate('/admin/enquiries?status=contacted')}
          className="bg-white p-5 rounded-xl border border-amber-200 shadow-sm hover:border-amber-400 transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
          <div className="flex items-center justify-between text-amber-800 text-xs font-semibold uppercase tracking-wider">
            <span>Contacted</span>
            <PhoneCall className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold text-amber-900">
              {isLoading ? '...' : counts?.contacted ?? 0}
            </span>
          </div>
          <p className="text-[11px] text-amber-600 mt-2">Initial call/email made</p>
        </div>

        {/* In Progress */}
        <div
          onClick={() => navigate('/admin/enquiries?status=in_progress')}
          className="bg-white p-5 rounded-xl border border-purple-200 shadow-sm hover:border-purple-400 transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-purple-600" />
          <div className="flex items-center justify-between text-purple-800 text-xs font-semibold uppercase tracking-wider">
            <span>In Progress</span>
            <FolderSync className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold text-purple-900">
              {isLoading ? '...' : counts?.in_progress ?? 0}
            </span>
          </div>
          <p className="text-[11px] text-purple-600 mt-2">Under active discussion</p>
        </div>

        {/* Closed */}
        <div
          onClick={() => navigate('/admin/enquiries?status=closed')}
          className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-gray-400 transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-400" />
          <div className="flex items-center justify-between text-gray-700 text-xs font-semibold uppercase tracking-wider">
            <span>Closed</span>
            <CheckCircle2 className="w-4 h-4 text-gray-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold text-gray-800">
              {isLoading ? '...' : counts?.closed ?? 0}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">Converted or finalized</p>
        </div>
      </div>

      {/* Recent Enquiries Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#07151D]">Recent Client Enquiries</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Latest consultation requests received via the website contact forms.
            </p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-semibold text-[#1479D1] hover:text-[#063A58] flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-xs text-gray-500">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto text-brand-blue mb-2" />
            Loading recent enquiries...
          </div>
        ) : recentEnquiries.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500">
            No enquiries recorded yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentEnquiries.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:px-6 hover:bg-gray-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-[#063A58] bg-brand-light px-2 py-0.5 rounded">
                      {item.reference}
                    </span>
                    <span className="text-xs font-semibold text-gray-900">{item.name}</span>
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="text-xs text-gray-600 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-medium text-[#1479D1]">{item.service}</span>
                    <span>•</span>
                    <span>{item.project_type}</span>
                    <span>•</span>
                    <span className="text-gray-500">{item.project_location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <span className="text-[11px] text-gray-400 font-mono">
                    {item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN') : ''}
                  </span>
                  <Link
                    to={`/admin/enquiries/${item.id}`}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-[#063A58] bg-gray-100 hover:bg-[#1479D1] hover:text-white px-2.5 py-1.5 rounded transition-colors"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
