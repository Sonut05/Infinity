import type { ServiceItem } from '../types';

/**
 * Verified 9 Service Offerings of Infinity Space Group
 * 
 * In accordance with Phase 2 guidelines:
 * - All descriptions are kept neutral, concise, and professional.
 * - No unsupported technical claims or fabricated certifications are included.
 */
export const ALL_VERIFIED_SERVICES: ServiceItem[] = [
  {
    id: 'planning',
    slug: 'planning',
    number: '01',
    title: 'Planning',
    shortDescription: 'Planning support that helps shape the direction, organization, and functional requirements of a proposed space.',
    description: 'Planning establishes the conceptual foundation of every built environment. We collaborate with clients to evaluate site conditions, understand spatial needs, and develop structured layout plans for efficient land and space utilization.',
    typicalContext: 'New residential plots, commercial site layouts, and spatial master planning.',
    processConnection: ['01 IDEA', '02 PLAN'],
    ctaText: 'Start with your idea →',
    icon: 'Compass',
    image: '/assets/hero-project.svg',
    verified: true,
  },
  {
    id: 'interior-designing',
    slug: 'interior-designing',
    number: '02',
    title: 'Interior Designing',
    shortDescription: 'Interior design focused on creating functional, comfortable, and visually considered spaces.',
    description: 'Our interior design services focus on translating living and working requirements into coherent interior environments. We guide material selection, space organization, joinery, and lighting layout to suit client preferences.',
    typicalContext: 'Residential homes, apartments, executive offices, and commercial interior spaces.',
    processConnection: ['03 DESIGN', '06 DELIVER'],
    ctaText: 'Discuss your interior →',
    icon: 'Layers',
    image: '/assets/3d-walkthrough.svg',
    verified: true,
  },
  {
    id: 'civil-work',
    slug: 'civil-work',
    number: '03',
    title: '2D & 3D Civil Work',
    shortDescription: 'Civil execution and on-site construction coordinated from technical drawings and models.',
    description: 'Civil construction managed with attention to technical drawings and on-site coordination. We assist in translating approved architectural and structural drawings into physical execution with structured site supervision.',
    typicalContext: 'Ground-up residential construction, structural additions, and built-space execution.',
    processConnection: ['04 ENGINEER', '05 BUILD'],
    ctaText: 'Discuss your civil project →',
    icon: 'Hammer',
    image: '/assets/hero-project.svg',
    verified: true,
  },
  {
    id: 'structural-designing',
    slug: 'structural-designing',
    number: '04',
    title: 'Structural Designing',
    shortDescription: 'Structural design support for building projects, developed according to project requirements.',
    description: 'Structural engineering design focused on stability, safety, and appropriate material specification. We provide structural drawings and foundation recommendations tailored to the site and building scale.',
    typicalContext: 'Residential frames, load-bearing structures, and commercial building frameworks.',
    processConnection: ['02 PLAN', '04 ENGINEER'],
    ctaText: 'Discuss structural requirements →',
    icon: 'Ruler',
    image: '/assets/hero-project.svg',
    verified: true,
  },
  {
    id: 'estimating-costing',
    slug: 'estimating-costing',
    number: '05',
    title: 'Estimating & Costing',
    shortDescription: 'Transparent quantity estimation and budget planning to help clients understand project expenditure.',
    description: 'Clear pre-construction estimates that outline anticipated material requirements, labor components, and construction stages. This helps clients make informed financial decisions prior to breaking ground.',
    typicalContext: 'Pre-construction budgeting, quantity take-offs, and milestone planning.',
    processConnection: ['02 PLAN', '04 ENGINEER'],
    ctaText: 'Request budget planning →',
    icon: 'Calculator',
    image: '/assets/hero-project.svg',
    verified: true,
  },
  {
    id: 'landscaping',
    slug: 'landscaping',
    number: '06',
    title: 'Landscaping',
    shortDescription: 'Outdoor planning and landscaping to complement the architecture of your property.',
    description: 'Harmonious outdoor planning integrating pathways, green areas, boundary treatments, and exterior features that elevate the overall living experience and curb appeal of the space.',
    typicalContext: 'Private garden spaces, villa surrounds, terrace gardens, and commercial perimeters.',
    processConnection: ['03 DESIGN', '06 DELIVER'],
    ctaText: 'Plan your landscape →',
    icon: 'Trees',
    image: '/assets/hero-project.svg',
    verified: true,
  },
  {
    id: 'renovation',
    slug: 'renovation',
    number: '07',
    title: 'Renovation',
    shortDescription: 'Modifications, layout updates, and aesthetic refreshes for existing residential and commercial properties.',
    description: 'Transforming existing spaces to meet modern lifestyle or operational demands. We help evaluate current room arrangements, propose layout improvements, and oversee refurbishment execution.',
    typicalContext: 'Aging residential properties, interior remodels, and facade modernizations.',
    processConnection: ['01 IDEA', '05 BUILD', '06 DELIVER'],
    ctaText: 'Plan your renovation →',
    icon: 'RefreshCw',
    image: '/assets/hero-project.svg',
    verified: true,
  },
  {
    id: 'map-approval',
    slug: 'map-approval',
    number: '08',
    title: 'Map Approval',
    shortDescription: 'Preparation of architectural drawings and documentation suited for municipal submission.',
    description: 'Drafting compliant architectural plans and submission documentation aligned with local municipal formats in Ranchi and Jharkhand, helping streamline the statutory submission process.',
    typicalContext: 'New building sanction drawings, boundary verification layouts, and floor plan submissions.',
    processConnection: ['02 PLAN'],
    ctaText: 'Discuss map approval →',
    icon: 'FileCheck',
    image: '/assets/hero-project.svg',
    verified: true,
  },
  {
    id: 'visualization-3d',
    slug: 'visualization-3d',
    number: '09',
    title: '3D Animation / 3D Visualization',
    shortDescription: '3D architectural views and walkthroughs to visualize proposed spaces prior to execution.',
    description: 'Digital 3D modeling and visual walkthroughs that allow clients to view elevations, room relationships, and spatial proportions before on-site work begins, reducing ambiguity and supporting decision-making.',
    typicalContext: 'Exterior building elevations, interior walkthrough simulations, and project visualization.',
    processConnection: ['03 DESIGN'],
    ctaText: 'Request 3D visualization →',
    icon: 'Box',
    image: '/assets/3d-walkthrough.svg',
    verified: true,
  },
];

/**
 * 6 Main Service Categories for Homepage Preview
 */
export const HOMEPAGE_SERVICES: ServiceItem[] = [
  ALL_VERIFIED_SERVICES[0], // Planning
  ALL_VERIFIED_SERVICES[3], // Structural Designing
  ALL_VERIFIED_SERVICES[2], // 2D & 3D Civil Work
  ALL_VERIFIED_SERVICES[1], // Interior Designing
  ALL_VERIFIED_SERVICES[6], // Renovation
  ALL_VERIFIED_SERVICES[8], // 3D Visualization
];
