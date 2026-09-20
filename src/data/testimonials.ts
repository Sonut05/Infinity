import type { Testimonial } from '../types';

/**
 * Testimonial Data Layer
 * 
 * Strict Zero-Fabrication Rule:
 * No synthetic reviews, fake ratings, or fictional client identities.
 * Only render cards where `verified === true`.
 * When verified count is zero, display a subtle trust alternative.
 */
export const TESTIMONIALS: Testimonial[] = [];

export const TESTIMONIAL_NOTICE = {
  heading: "CLIENT EXPERIENCES",
  subheading: "Verified client feedback and project reviews will be published as on-site project handovers in Ranchi are documented.",
  note: "Infinity Space Group follows a strict zero-fabrication policy for client testimonials.",
};

