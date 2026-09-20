import type { ProjectItem } from '../types';

/**
 * Project Portfolio Data Architecture
 * 
 * STRICT ZERO-FABRICATION POLICY:
 * All entries below represent architectural layout placeholders and visual studies.
 * Every placeholder has verified: false and is clearly labeled as a study.
 * Real verified company photography and site documentation will replace these entries.
 */
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'featured-project-01',
    slug: 'featured-project-01',
    title: 'Featured Project 01',
    category: 'Residential',
    location: 'Ranchi Region (Study)',
    description: 'A residential spatial study exploring modern structural framing, natural cross-ventilation, and dedicated living zones.',
    services: ['Planning', 'Structural Designing', '2D & 3D Civil Work'],
    images: [
      '/assets/hero-project.svg',
      '/assets/3d-walkthrough.svg',
      '/assets/hero-project.svg',
    ],
    processStages: ['01 IDEA', '02 PLAN', '03 DESIGN', '04 ENGINEER', '05 BUILD'],
    featured: true,
    verified: false,
    mediaPlaceholderLabel: 'PROJECT MEDIA PLACEHOLDER • FEATURED PROJECT 01',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: 'commercial-study-02',
    slug: 'commercial-study-02',
    title: 'Commercial Study 02',
    category: 'Commercial',
    location: 'Ranchi Region (Study)',
    description: 'An architectural study focused on commercial circulation, municipal setback adherence, and column spacing efficiency.',
    services: ['Planning', 'Map Approval', 'Structural Designing'],
    images: [
      '/assets/hero-project.svg',
      '/assets/3d-walkthrough.svg',
    ],
    processStages: ['02 PLAN', '04 ENGINEER'],
    featured: true,
    verified: false,
    mediaPlaceholderLabel: 'PROJECT MEDIA PLACEHOLDER • COMMERCIAL STUDY 02',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'interior-space-03',
    slug: 'interior-space-03',
    title: 'Interior Space 03',
    category: 'Interior',
    location: 'Ranchi Region (Study)',
    description: 'A study in contemporary interior volume, integrated false ceiling lighting, and functional joinery organization.',
    services: ['Interior Designing', '3D Animation / 3D Visualization'],
    images: [
      '/assets/3d-walkthrough.svg',
      '/assets/hero-project.svg',
    ],
    processStages: ['03 DESIGN', '06 DELIVER'],
    featured: true,
    verified: false,
    mediaPlaceholderLabel: 'PROJECT MEDIA PLACEHOLDER • INTERIOR SPACE 03',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'structural-study-04',
    slug: 'structural-study-04',
    title: 'Structural Study 04',
    category: 'Residential',
    location: 'Ranchi Region (Study)',
    description: 'An engineered framing study analyzing load-bearing alignment, footing depth, and economical material allocation.',
    services: ['Structural Designing', 'Estimating & Costing'],
    images: [
      '/assets/hero-project.svg',
      '/assets/3d-walkthrough.svg',
    ],
    processStages: ['02 PLAN', '04 ENGINEER', '05 BUILD'],
    featured: false,
    verified: false,
    mediaPlaceholderLabel: 'PROJECT MEDIA PLACEHOLDER • STRUCTURAL STUDY 04',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'renovation-study-05',
    slug: 'renovation-study-05',
    title: 'Renovation Study 05',
    category: 'Renovation',
    location: 'Ranchi Region (Study)',
    description: 'A spatial transformation study exploring partition reconfiguration, facade updates, and renewed daylight penetration.',
    services: ['Renovation', '2D & 3D Civil Work'],
    images: [
      '/assets/hero-project.svg',
      '/assets/3d-walkthrough.svg',
    ],
    processStages: ['01 IDEA', '05 BUILD', '06 DELIVER'],
    featured: false,
    verified: false,
    mediaPlaceholderLabel: 'PROJECT MEDIA PLACEHOLDER • RENOVATION STUDY 05',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'landscape-study-06',
    slug: 'landscape-study-06',
    title: 'Landscape Study 06',
    category: 'Residential',
    location: 'Ranchi Region (Study)',
    description: 'An exterior study integrating hardscape pathways, boundary transitions, and climate-appropriate green borders.',
    services: ['Landscaping', 'Planning'],
    images: [
      '/assets/hero-project.svg',
      '/assets/3d-walkthrough.svg',
    ],
    processStages: ['03 DESIGN', '06 DELIVER'],
    featured: false,
    verified: false,
    mediaPlaceholderLabel: 'PROJECT MEDIA PLACEHOLDER • LANDSCAPE STUDY 06',
    aspectRatio: 'aspect-[4/3]',
  },
];

export const PROJECT_CATEGORIES = ['All', 'Residential', 'Commercial', 'Interior', 'Renovation'] as const;
