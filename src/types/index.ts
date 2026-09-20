export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  description: string;
  typicalContext: string;
  processConnection: string[];
  ctaText: string;
  icon: string; // Lucide icon identifier
  image: string;
  verified: boolean;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Interior' | 'Renovation';
  location: string;
  description: string;
  services: string[];
  images: string[];
  processStages: string[];
  featured: boolean;
  verified: boolean;
  mediaPlaceholderLabel: string;
  aspectRatio?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables?: string[];
  relatedServices?: string[];
}

export interface ValueProp {
  number: string;
  title: string;
  description: string;
}

export interface ContactConfig {
  companyName: string;
  brandPositioning: string;
  tagline: string;
  location: {
    city: string;
    state: string;
    country: string;
    addressNote: string;
    fullAddressPlaceholder: string;
  };
  address: string;
  phone: string;
  whatsapp: string;
  whatsappDisplay?: string;
  email: string;
  instagram: string;
  googleMaps: string;
  officeHours: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  projectType: string;
  location: string;
  content: string;
  isVerified: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  projectType: string;
  verified: boolean;
}

