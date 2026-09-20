import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  type AdminEnquiryItem,
  type EnquiryStatus,
  getAdminEnquiryDetailApi,
  updateEnquiryStatusApi,
} from '../../config/api';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building,
  DollarSign,
  FileText,
  Clock,
  CheckCircle2,
  PhoneCall,
  FolderSync,
  AlertCircle,
  Loader2,
  Check,
} from 'lucide-react';

export const AdminEnquiryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { handleUnauthorized } = useAdminAuth();

  const [enquiry, setEnquiry] = useState<AdminEnquiryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchDetail = async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await getAdminEnquiryDetailApi(id);
      if (res.status === 401) {
        handleUnauthorized();
        return;
      }
      if (res.ok && res.enquiry) {
        setEnquiry(res.enquiry);
      } else {
        setError(res.error || 'Enquiry not found.');
      }
    } catch {
      setError('Network error occurred while fetching details.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const handleStatusChange = async (newStatus: EnquiryStatus) => {
    if (!id || !enquiry || enquiry.status === newStatus || isUpdating) return;

    setIsUpdating(true);
    setActionSuccess(null);
    setError(null);

    try {
      const res = await updateEnquiryStatusApi(id, newStatus);
      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      if (res.ok && res.enquiry) {
        setEnquiry(res.enquiry);
        setActionSuccess(`Status updated to "${newStatus.replace('_', ' ')}".`);
        setTimeout(() => setActionSuccess(null), 4000);
      } else {
        setError(res.error || 'Failed to update enquiry status.');
      }
    } catch {
      setError('Network error during status update.');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600 mr-2" />
            New
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-600 mr-2" />
            Contacted
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
            <span className="w-2 h-2 rounded-full bg-purple-600 mr-2" />
            In Progress
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300">
            <span className="w-2 h-2 rounded-full bg-gray-500 mr-2" />
            Closed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white p-12 rounded-xl border border-gray-200 text-center text-xs text-gray-500 shadow-sm">
        <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#1479D1] mb-2" />
        Loading enquiry details...
      </div>
    );
  }

  if (error && !enquiry) {
    return (
      <div className="bg-white p-8 rounded-xl border border-gray-200 text-center shadow-sm space-y-4">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
        <h2 className="text-base font-bold text-gray-900">Enquiry Unavailable</h2>
        <p className="text-xs text-gray-500">{error}</p>
        <Link
          to="/admin/enquiries"
          className="inline-flex items-center space-x-1 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#063A58] hover:bg-[#1479D1] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Back to Enquiry List</span>
        </Link>
      </div>
    );
  }

  if (!enquiry) return null;

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/enquiries"
          className="inline-flex items-center space-x-1 text-xs font-semibold text-gray-600 hover:text-[#1479D1] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to Enquiries</span>
        </Link>

        <span className="text-xs text-gray-400 font-mono">
          Internal ID: #{enquiry.id}
        </span>
      </div>

      {/* Action Notification Banners */}
      {actionSuccess && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 text-xs text-green-800">
          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-xs text-red-800">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Header Card: Reference, Status, and Update Toolbar */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold font-mono text-[#063A58]">
                {enquiry.reference}
              </h1>
              {getStatusBadge(enquiry.status)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Received on{' '}
              {enquiry.created_at
                ? new Date(enquiry.created_at).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })
                : '-'}
            </p>
          </div>

          {/* Status Update Actions */}
          <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
            <span className="text-xs font-semibold text-gray-500 mr-1 hidden lg:inline">
              Update Status:
            </span>

            {enquiry.status !== 'contacted' && (
              <button
                type="button"
                onClick={() => handleStatusChange('contacted')}
                disabled={isUpdating}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                <span>Mark Contacted</span>
              </button>
            )}

            {enquiry.status !== 'in_progress' && (
              <button
                type="button"
                onClick={() => handleStatusChange('in_progress')}
                disabled={isUpdating}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <FolderSync className="w-3.5 h-3.5 text-purple-600" />
                <span>Mark In Progress</span>
              </button>
            )}

            {enquiry.status !== 'closed' && (
              <button
                type="button"
                onClick={() => handleStatusChange('closed')}
                disabled={isUpdating}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-gray-600" />
                <span>Mark Closed</span>
              </button>
            )}

            {enquiry.status !== 'new' && (
              <button
                type="button"
                onClick={() => handleStatusChange('new')}
                disabled={isUpdating}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Reset to New</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Client & Project Specifications */}
        <div className="lg:col-span-1 space-y-6">
          {/* Client Information */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
              Client Contact Details
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-gray-400 block font-medium">Client Full Name</span>
                <span className="text-sm font-bold text-gray-900">{enquiry.name}</span>
              </div>

              <div>
                <span className="text-[11px] text-gray-400 block font-medium">Contact Phone</span>
                <a
                  href={`tel:${enquiry.phone}`}
                  className="inline-flex items-center space-x-2 text-sm font-mono font-medium text-[#1479D1] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{enquiry.phone}</span>
                </a>
              </div>

              <div>
                <span className="text-[11px] text-gray-400 block font-medium">Email Address</span>
                <a
                  href={`mailto:${enquiry.email}?subject=Infinity Space Group - Consultation Enquiry [${enquiry.reference}]`}
                  className="inline-flex items-center space-x-2 text-sm font-medium text-[#1479D1] hover:underline break-all"
                >
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{enquiry.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Project Specifications */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
              Project Information
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-gray-400 block font-medium">Service Requested</span>
                <span className="text-sm font-bold text-[#063A58]">{enquiry.service}</span>
              </div>

              <div>
                <span className="text-[11px] text-gray-400 block font-medium">Project Typology</span>
                <span className="text-sm text-gray-800 flex items-center mt-0.5">
                  <Building className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
                  <span>{enquiry.project_type}</span>
                </span>
              </div>

              <div>
                <span className="text-[11px] text-gray-400 block font-medium">Location</span>
                <span className="text-sm text-gray-800 flex items-center mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1.5 flex-shrink-0" />
                  <span>{enquiry.project_location}</span>
                </span>
              </div>

              {enquiry.budget && (
                <div>
                  <span className="text-[11px] text-gray-400 block font-medium">Estimated Budget</span>
                  <span className="text-sm font-medium text-gray-900 flex items-center mt-0.5">
                    <DollarSign className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
                    <span>{enquiry.budget}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Message & Activity Log */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enquiry Message Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#1479D1]" />
              <h2 className="text-sm font-bold text-[#07151D]">Project Scope & Message</h2>
            </div>
            <div className="bg-[#F1F4F6]/50 p-4 rounded-lg border border-gray-200 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
              {enquiry.message}
            </div>
          </div>

          {/* Audit & Timestamps Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
              Audit & Tracking
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600">
              <div className="flex items-start space-x-2">
                <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-700 block">Submitted At</span>
                  <span>
                    {enquiry.created_at
                      ? new Date(enquiry.created_at).toLocaleString('en-IN')
                      : '-'}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-700 block">Last Status Update</span>
                  <span>
                    {enquiry.updated_at
                      ? new Date(enquiry.updated_at).toLocaleString('en-IN')
                      : 'Never modified'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
