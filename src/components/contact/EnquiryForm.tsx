import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquare, AlertCircle, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { ALL_VERIFIED_SERVICES } from '../../data/services';
import { getWhatsAppLink, formatEnquiryWhatsAppMessage } from '../../config/contact';
import { sendEnquiryToApi } from '../../config/api';

interface EnquiryFormProps {
  initialService?: string;
  className?: string;
}

export interface EnquiryData {
  name: string;
  phone: string;
  email: string;
  service: string;
  projectType: string;
  location: string;
  message: string;
  budget: string;
}

const PROJECT_TYPES = [
  'Residential',
  'Commercial',
  'Interior',
  'Renovation',
  'Landscape',
  'Other',
];

const BUDGET_RANGES = [
  'Prefer not to specify / Early stage',
  'Under 25 Lakhs',
  '25 Lakhs - 50 Lakhs',
  '50 Lakhs - 1 Crore',
  'Above 1 Crore',
  'Requires Estimation & Costing',
];

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ initialService, className = '' }) => {
  const [formData, setFormData] = useState<EnquiryData>({
    name: '',
    phone: '',
    email: '',
    service: initialService || ALL_VERIFIED_SERVICES[0].title,
    projectType: 'Residential',
    location: '',
    message: '',
    budget: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<EnquiryData | null>(null);
  const [confirmedEnquiryId, setConfirmedEnquiryId] = useState<number | null>(null);

  // Sync with initialService if prop changes (e.g. from query param)
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EnquiryData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (formData.phone.trim().replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Please provide a valid contact number (at least 7 digits).';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service of interest.';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project classification.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Project location (e.g. Ranchi, Morabadi) is required.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a brief note on your requirements or space.';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Please provide at least 5 characters describing your requirement.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await sendEnquiryToApi({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        service: formData.service,
        project_type: formData.projectType,
        project_location: formData.location.trim(),
        message: formData.message.trim(),
        budget: formData.budget || undefined,
      });

      if (response.ok) {
        setConfirmedEnquiryId(response.data.enquiry.id);
        setSubmittedSnapshot({ ...formData });
        setSubmitted(true);
      } else {
        const backendErrors = response.validationErrors;
        if (backendErrors) {
          // Map backend validation field names
          const mappedErrors: Partial<Record<keyof EnquiryData, string>> = {};
          if (backendErrors.name) mappedErrors.name = backendErrors.name;
          if (backendErrors.phone) mappedErrors.phone = backendErrors.phone;
          if (backendErrors.email) mappedErrors.email = backendErrors.email;
          if (backendErrors.service) mappedErrors.service = backendErrors.service;
          if (backendErrors.project_type) mappedErrors.projectType = backendErrors.project_type;
          if (backendErrors.project_location) mappedErrors.location = backendErrors.project_location;
          if (backendErrors.message) mappedErrors.message = backendErrors.message;
          setErrors(mappedErrors);
        }
        setSubmitError(response.message || "We couldn't submit your enquiry right now. Please try again or contact us directly.");
      }
    } catch {
      setSubmitError("We couldn't submit your enquiry right now. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmittedSnapshot(null);
    setConfirmedEnquiryId(null);
    setSubmitError(null);
  };

  if (submitted && submittedSnapshot) {
    const waText = formatEnquiryWhatsAppMessage({
      name: submittedSnapshot.name,
      phone: submittedSnapshot.phone,
      email: submittedSnapshot.email,
      service: submittedSnapshot.service,
      projectType: submittedSnapshot.projectType,
      location: submittedSnapshot.location,
      budget: submittedSnapshot.budget,
      message: submittedSnapshot.message,
      referenceId: confirmedEnquiryId || undefined,
    });

    return (
      <div
        className={`p-8 sm:p-10 bg-white border-2 border-brand-navy shadow-sm ${className}`}
        role="region"
        aria-live="polite"
        aria-label="Enquiry Submission State"
      >
        <div className="flex items-center gap-3 pb-6 border-b border-slate-200 mb-6">
          <div className="w-12 h-12 bg-brand-navy text-brand-accent flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-blue block">
              {confirmedEnquiryId ? `REF #ISG-${confirmedEnquiryId}` : 'CLIENT CONSULTATION'}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-medium text-brand-navy uppercase tracking-tight">
              ENQUIRY RECEIVED
            </h3>
          </div>
        </div>

        {/* Real Success Notice */}
        <div className="p-5 bg-brand-slate border-l-4 border-brand-blue text-xs sm:text-sm text-slate-700 space-y-2 mb-6">
          <p className="font-semibold text-brand-navy text-sm sm:text-base">
            Thank you. Your enquiry has been received. Our team will review your requirements and get in touch.
          </p>
          <p className="text-slate-600 text-xs leading-relaxed">
            Your project enquiry has been safely recorded in our consultation database. A summary of your details is displayed below. You may also initiate immediate discussion via WhatsApp.
          </p>
        </div>

        {/* Structured Summary Review Box */}
        <div className="bg-brand-slate/80 p-5 border border-slate-200 text-xs font-mono space-y-2.5 mb-8">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-200 flex items-center justify-between">
            <span>RECORDED ENQUIRY SUMMARY</span>
            <span className="text-brand-blue">STATUS: NEW</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-800">
            <div>
              <span className="text-slate-400">Client:</span> {submittedSnapshot.name}
            </div>
            <div>
              <span className="text-slate-400">Phone:</span> {submittedSnapshot.phone}
            </div>
            <div>
              <span className="text-slate-400">Email:</span> {submittedSnapshot.email}
            </div>
            <div>
              <span className="text-slate-400">Service:</span> {submittedSnapshot.service}
            </div>
            <div>
              <span className="text-slate-400">Classification:</span> {submittedSnapshot.projectType}
            </div>
            <div>
              <span className="text-slate-400">Location:</span> {submittedSnapshot.location}
            </div>
            {submittedSnapshot.budget && (
              <div className="sm:col-span-2">
                <span className="text-slate-400">Budget / Scope:</span> {submittedSnapshot.budget}
              </div>
            )}
          </div>
          <div className="pt-2 border-t border-slate-200 text-slate-700">
            <span className="text-slate-400 block mb-1">Requirements Note:</span>
            <p className="font-sans text-xs bg-white p-2.5 border border-slate-200">
              {submittedSnapshot.message}
            </p>
          </div>
        </div>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Button
            href={getWhatsAppLink(waText)}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="md"
            icon={<MessageSquare className="w-4 h-4" />}
            className="flex-1 justify-center"
          >
            Send Consult Report via WhatsApp
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="md"
            icon={<RefreshCw className="w-4 h-4" />}
            className="flex-1 justify-center"
          >
            Submit Another Enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`p-8 sm:p-10 bg-white border border-slate-200 shadow-sm ${className}`}
      aria-label="Project Consultation Form"
    >
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-4 h-0.5 bg-brand-accent inline-block" />
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-brand-blue">
            PROJECT CONSULTATION
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-brand-navy uppercase tracking-tight">
          REQUEST A CONSULTATION
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
          Share your plot, space, or architectural requirements in Ranchi or surrounding regions.
        </p>
      </div>

      {/* Global API Error Banner */}
      {submitError && (
        <div
          className="p-4 mb-6 bg-red-50 border-l-4 border-red-500 text-xs sm:text-sm text-red-700 flex items-start gap-2.5"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-red-900">{submitError}</p>
            <p className="text-xs text-red-600">
              Your details remain saved below so you do not need to retype. You can try again or contact us directly on WhatsApp.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="enquiry-name"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="enquiry-name"
              type="text"
              required
              disabled={isSubmitting}
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'enquiry-name-error' : undefined}
              placeholder="e.g. Rahul Sharma"
              className={`w-full px-4 py-3 bg-brand-slate border text-sm text-brand-dark focus:bg-white transition-colors outline-none disabled:opacity-60 ${
                errors.name ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-brand-blue'
              }`}
            />
            {errors.name && (
              <p id="enquiry-name-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="enquiry-phone"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Phone / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              id="enquiry-phone"
              type="tel"
              required
              disabled={isSubmitting}
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'enquiry-phone-error' : undefined}
              placeholder="e.g. +91 98000 00000"
              className={`w-full px-4 py-3 bg-brand-slate border text-sm text-brand-dark focus:bg-white transition-colors outline-none disabled:opacity-60 ${
                errors.phone ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-brand-blue'
              }`}
            />
            {errors.phone && (
              <p id="enquiry-phone-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Email & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="enquiry-email"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="enquiry-email"
              type="email"
              required
              disabled={isSubmitting}
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'enquiry-email-error' : undefined}
              placeholder="e.g. client@example.com"
              className={`w-full px-4 py-3 bg-brand-slate border text-sm text-brand-dark focus:bg-white transition-colors outline-none disabled:opacity-60 ${
                errors.email ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-brand-blue'
              }`}
            />
            {errors.email && (
              <p id="enquiry-email-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="enquiry-location"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Project Location in Ranchi / Jharkhand <span className="text-red-500">*</span>
            </label>
            <input
              id="enquiry-location"
              type="text"
              required
              disabled={isSubmitting}
              value={formData.location}
              onChange={(e) => {
                setFormData({ ...formData, location: e.target.value });
                if (errors.location) setErrors({ ...errors, location: undefined });
              }}
              aria-invalid={Boolean(errors.location)}
              aria-describedby={errors.location ? 'enquiry-location-error' : undefined}
              placeholder="e.g. Morabadi / Kanke Road / Bariatu / Doranda"
              className={`w-full px-4 py-3 bg-brand-slate border text-sm text-brand-dark focus:bg-white transition-colors outline-none disabled:opacity-60 ${
                errors.location ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-brand-blue'
              }`}
            />
            {errors.location && (
              <p id="enquiry-location-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.location}</span>
              </p>
            )}
          </div>
        </div>

        {/* Service of Interest & Project Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="enquiry-service"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Service of Interest <span className="text-red-500">*</span>
            </label>
            <select
              id="enquiry-service"
              disabled={isSubmitting}
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-4 py-3 bg-brand-slate border border-slate-200 text-sm text-brand-dark focus:bg-white focus:border-brand-blue transition-colors outline-none disabled:opacity-60"
            >
              {ALL_VERIFIED_SERVICES.map((svc) => (
                <option key={svc.id} value={svc.title}>
                  {svc.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="enquiry-project-type"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Project Type <span className="text-red-500">*</span>
            </label>
            <select
              id="enquiry-project-type"
              disabled={isSubmitting}
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full px-4 py-3 bg-brand-slate border border-slate-200 text-sm text-brand-dark focus:bg-white focus:border-brand-blue transition-colors outline-none disabled:opacity-60"
            >
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Optional Approximate Budget */}
        <div>
          <label
            htmlFor="enquiry-budget"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2"
          >
            Approximate Budget / Scope (Optional)
          </label>
          <select
            id="enquiry-budget"
            disabled={isSubmitting}
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-4 py-3 bg-brand-slate border border-slate-200 text-sm text-brand-dark focus:bg-white focus:border-brand-blue transition-colors outline-none disabled:opacity-60"
          >
            <option value="">Select an approximate bracket (optional)</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Message / Requirements */}
        <div>
          <label
            htmlFor="enquiry-message"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2"
          >
            Project Requirements &amp; Spatial Brief <span className="text-red-500">*</span>
          </label>
          <textarea
            id="enquiry-message"
            rows={4}
            required
            disabled={isSubmitting}
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (errors.message) setErrors({ ...errors, message: undefined });
            }}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'enquiry-message-error' : undefined}
            placeholder="Please mention plot dimensions, proposed floors (e.g. G+2), architectural preferences, scope of work (design only vs execution), or desired start date..."
            className={`w-full px-4 py-3 bg-brand-slate border text-sm text-brand-dark focus:bg-white transition-colors outline-none resize-none disabled:opacity-60 ${
              errors.message ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-brand-blue'
            }`}
          />
          {errors.message && (
            <p id="enquiry-message-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-mono">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Submit Actions */}
        <div className="space-y-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full justify-center"
            icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Consultation Request'}
          </Button>
          <p className="text-[11px] font-mono text-slate-500 text-center">
            Your project enquiry will be securely recorded and shared with our Ranchi architectural team.
          </p>
        </div>
      </div>
    </form>
  );
};
