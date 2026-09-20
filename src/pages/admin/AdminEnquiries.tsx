import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  type AdminEnquiryItem,
  type EnquiryStatus,
  getAdminEnquiriesApi,
} from '../../config/api';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  MapPin,
  X,
  AlertCircle,
} from 'lucide-react';

const VERIFIED_SERVICES_LIST = [
  'Planning',
  'Interior Designing',
  '2D & 3D Civil Work',
  'Structural Designing',
  'Estimating & Costing',
  'Landscaping',
  'Renovation',
  'Map Approval',
  '3D Animation / 3D Visualization',
];

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'closed', label: 'Closed' },
];

export const AdminEnquiries: React.FC = () => {
  const { handleUnauthorized } = useAdminAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state synchronization
  const initialStatus = searchParams.get('status') || 'all';
  const initialService = searchParams.get('service') || 'all';
  const initialSort = (searchParams.get('sort') || 'newest') as 'newest' | 'oldest';
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [serviceFilter, setServiceFilter] = useState(initialService);
  const [sortOption, setSortOption] = useState<'newest' | 'oldest'>(initialSort);
  const [page, setPage] = useState(initialPage);

  const [enquiries, setEnquiries] = useState<AdminEnquiryItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(15);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounced search state
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
      setPage(1); // reset to page 1 on new search
    }, 350);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Update query params in URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', String(page));
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (serviceFilter !== 'all') params.set('service', serviceFilter);
    if (sortOption !== 'newest') params.set('sort', sortOption);
    setSearchParams(params, { replace: true });
  }, [page, debouncedSearch, statusFilter, serviceFilter, sortOption, setSearchParams]);

  // Fetch enquiries on dependencies change
  const fetchEnquiries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getAdminEnquiriesApi({
        page,
        limit,
        search: debouncedSearch,
        status: statusFilter,
        service: serviceFilter,
        sort: sortOption,
      });

      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      if (res.ok && res.data) {
        setEnquiries(res.data.items);
        setTotal(res.data.total);
        setTotalPages(res.data.total_pages || 1);
      } else {
        setError(res.error || 'Failed to load enquiries.');
      }
    } catch {
      setError('A network error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [page, debouncedSearch, statusFilter, serviceFilter, sortOption]);

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setPage(1);
  };

  const handleServiceChange = (service: string) => {
    setServiceFilter(service);
    setPage(1);
  };

  const handleSortChange = (sort: 'newest' | 'oldest') => {
    setSortOption(sort);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    setStatusFilter('all');
    setServiceFilter('all');
    setSortOption('newest');
    setPage(1);
  };

  const getStatusBadge = (status: EnquiryStatus) => {
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

  const hasActiveFilters =
    debouncedSearch !== '' ||
    statusFilter !== 'all' ||
    serviceFilter !== 'all' ||
    sortOption !== 'newest';

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#07151D] font-serif">
            Client Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage, review, and track incoming project consultations from Ranchi and across Jharkhand.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={fetchEnquiries}
            disabled={isLoading}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={fetchEnquiries} className="underline font-semibold hover:text-red-900 cursor-pointer">
            Retry
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
        {/* Search Row */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search enquiries by name, phone, email, location..."
              className="w-full pl-9 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1479D1] focus:border-[#1479D1] transition-colors outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Service Dropdown */}
          <div className="w-full md:w-56">
            <select
              value={serviceFilter}
              onChange={(e) => handleServiceChange(e.target.value)}
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1479D1] focus:border-[#1479D1] bg-white outline-none cursor-pointer"
            >
              <option value="all">All Services</option>
              {VERIFIED_SERVICES_LIST.map((srv) => (
                <option key={srv} value={srv}>
                  {srv}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="w-full md:w-44">
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value as 'newest' | 'oldest')}
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1479D1] focus:border-[#1479D1] bg-white outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status Filter Tabs Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <span className="text-xs font-semibold text-gray-500 mr-1 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1" />
              Status:
            </span>
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleStatusChange(opt.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  statusFilter === opt.value
                    ? 'bg-[#063A58] text-white shadow-sm font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-red-600 hover:text-red-800 font-medium inline-flex items-center cursor-pointer"
            >
              <X className="w-3.5 h-3.5 mr-1" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Header Info */}
      <div className="flex items-center justify-between text-xs text-gray-600 px-1">
        <span>
          Showing <strong className="text-gray-900">{enquiries.length}</strong> of{' '}
          <strong className="text-gray-900">{total}</strong> total enquiries
        </span>
        {totalPages > 1 && (
          <span>
            Page <strong className="text-gray-900">{page}</strong> of{' '}
            <strong className="text-gray-900">{totalPages}</strong>
          </span>
        )}
      </div>

      {/* Content: Desktop Table vs Mobile Cards */}
      {isLoading ? (
        <div className="bg-white p-12 rounded-xl border border-gray-200 text-center text-xs text-gray-500 shadow-sm">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#1479D1] mb-2" />
          Loading client enquiries...
        </div>
      ) : enquiries.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-gray-200 text-center shadow-sm">
          <p className="text-sm font-semibold text-gray-800">No enquiries found</p>
          <p className="text-xs text-gray-500 mt-1">
            {hasActiveFilters
              ? 'Try modifying your search or clearing your active filters.'
              : 'No client enquiries have been submitted yet.'}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-4 inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1479D1] bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Table (> 768px) */}
          <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 text-left text-xs">
              <thead className="bg-[#063A58]/5 text-gray-700 font-semibold uppercase tracking-wider">
                <tr>
                  <th scope="col" className="py-3.5 px-4">
                    Reference
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Date
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Client Name
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Service
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Project Type
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Location
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Status
                  </th>
                  <th scope="col" className="py-3.5 px-4 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {enquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#063A58] whitespace-nowrap">
                      {item.reference}
                    </td>
                    <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN') : '-'}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      <div>{item.name}</div>
                      <div className="text-[11px] text-gray-400 font-mono">{item.phone}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-[#1479D1]">
                      {item.service}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {item.project_type}
                    </td>
                    <td className="py-3 px-4 text-gray-600 max-w-[150px] truncate" title={item.project_location}>
                      {item.project_location}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <Link
                        to={`/admin/enquiries/${item.id}`}
                        className="inline-flex items-center space-x-1 font-semibold text-[#063A58] bg-gray-100 hover:bg-[#1479D1] hover:text-white px-2.5 py-1 rounded transition-colors"
                      >
                        <span>Inspect</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout (< 768px) */}
          <div className="md:hidden space-y-3">
            {enquiries.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-[#063A58] bg-brand-light px-2 py-0.5 rounded">
                      {item.reference}
                    </span>
                    <span className="text-xs text-gray-400">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN') : ''}
                    </span>
                  </div>
                  {getStatusBadge(item.status)}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                  <div className="text-xs text-gray-500 font-mono mt-0.5 flex items-center space-x-2">
                    <span>{item.phone}</span>
                    <span>•</span>
                    <span className="truncate max-w-[180px]">{item.email}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                      Service
                    </span>
                    <span className="font-medium text-[#1479D1]">{item.service}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                      Project Type
                    </span>
                    <span className="text-gray-700">{item.project_type}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-600 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1 flex-shrink-0" />
                  <span className="truncate">{item.project_location}</span>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <Link
                    to={`/admin/enquiries/${item.id}`}
                    className="w-full flex items-center justify-center space-x-2 py-2 text-xs font-semibold text-[#063A58] bg-gray-100 hover:bg-[#1479D1] hover:text-white rounded-lg transition-colors"
                  >
                    <span>View Full Enquiry Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm text-xs">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1 || isLoading}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <div className="text-gray-600">
                Page <strong className="text-gray-900">{page}</strong> of{' '}
                <strong className="text-gray-900">{totalPages}</strong>
              </div>

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages || isLoading}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
