import type { ContactConfig } from '../types';

/**
 * Centralized Contact Configuration
 * 
 * IMPORTANT: In accordance with brand integrity guidelines,
 * all sensitive business data fields remain as placeholders until
 * officially verified details are provided by Infinity Space Group.
 */
export const CONTACT: ContactConfig = {
  companyName: "INFINITY SPACE GROUP",
  brandPositioning: "Architects | Engineers | Contractors",
  tagline: "From Concept to Creation",
  location: {
    city: "Ranchi",
    state: "Jharkhand",
    country: "India",
    addressNote: "Ranchi, Jharkhand, India",
    fullAddressPlaceholder: "Registered Office: Ranchi, Jharkhand (Exact branch address to be updated)",
  },
  address: "Ranchi, Jharkhand, India",
  // Official contact channels
  phone: "+91 90225 98556",
  whatsapp: "919022598556", // International format for wa.me URL
  whatsappDisplay: "+91 90225 98556",
  email: "", // Pending verified business email
  instagram: "https://www.instagram.com/infinity_space_group/", // Verified Instagram profile
  googleMaps: "", // Placeholder - to be updated with verified Google Maps link
  officeHours: "Monday - Saturday: 10:00 AM - 7:00 PM (IST)",
};

/**
 * Helper to generate WhatsApp discussion URL safely
 */
export function getWhatsAppLink(prefillMessage = "Hello Infinity Space Group, I would like to discuss a project in Ranchi."): string {
  if (!CONTACT.whatsapp) {
    // When WhatsApp number is not yet verified, route internally to the contact enquiry form
    return `/contact?source=whatsapp&message=${encodeURIComponent(prefillMessage)}`;
  }
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(prefillMessage)}`;
}

/**
 * Helper to generate service-specific WhatsApp inquiry link
 */
export function getServiceWhatsAppLink(serviceTitle: string): string {
  const message = `Hello Infinity Space Group, I would like to discuss ${serviceTitle} for my project in Ranchi.`;
  return getWhatsAppLink(message);
}

/**
 * Helper to generate structured consultation report message for WhatsApp handoff
 */
export function formatEnquiryWhatsAppMessage(data: {
  name: string;
  phone: string;
  email?: string;
  service: string;
  projectType: string;
  location: string;
  message?: string;
  budget?: string;
  referenceId?: string | number;
}): string {
  const lines = [
    `*CONSULTATION REPORT — INFINITY SPACE GROUP*`,
  ];
  if (data.referenceId) {
    lines.push(`Reference: #ISG-${data.referenceId}`);
  }
  lines.push(
    `Client Name: ${data.name}`,
    `Phone: ${data.phone}`,
  );
  if (data.email) {
    lines.push(`Email: ${data.email}`);
  }
  lines.push(
    `Service: ${data.service}`,
    `Project Type: ${data.projectType}`,
    `Location: ${data.location}`,
  );
  if (data.budget) {
    lines.push(`Approx Budget/Scope: ${data.budget}`);
  }
  if (data.message) {
    lines.push(`Project Brief & Requirements:\n${data.message}`);
  }
  return lines.join('\n');
}

