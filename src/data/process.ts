import type { ProcessStep } from '../types';

/**
 * Typical 6-Stage Project Journey: From Concept to Creation
 * 
 * Note: Actual project workflows vary depending on project classification,
 * client objectives, and site conditions. These represent a typical way a project may progress.
 */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'DISCUSS',
    subtitle: 'Requirements & Site Context',
    description: "Understand the client's requirement, site context and objectives through initial consultations.",
    deliverables: [
      'Preliminary requirement briefing',
      'Site context and orientation review',
      'Initial scope and timeline alignment',
    ],
    relatedServices: ['Planning', 'Estimating & Costing'],
  },
  {
    number: '02',
    title: 'PLAN',
    subtitle: 'Planning & Design Direction',
    description: 'Develop the appropriate planning and design direction based on zoning, bylaws, and spatial logic.',
    deliverables: [
      'Spatial layout schematics',
      'Regulatory and municipal bye-laws review',
      'Map approval documentation preparation',
    ],
    relatedServices: ['Planning', 'Map Approval'],
  },
  {
    number: '03',
    title: 'DEVELOP',
    subtitle: 'Coordinated Design & Engineering',
    description: 'Coordinate relevant architectural, civil, structural, interior or visualization work.',
    deliverables: [
      'Detailed architectural plans & working drawings',
      'Structural design framing calculations',
      'Photorealistic 3D visualization and elevations',
    ],
    relatedServices: ['Structural Designing', 'Interior Designing', '3D Animation / 3D Visualization'],
  },
  {
    number: '04',
    title: 'REFINE',
    subtitle: 'Review & Feedback Incorporation',
    description: 'Review the proposed direction with the client and incorporate constructive feedback.',
    deliverables: [
      'Design adjustments and iteration review',
      'Specification refinement and itemized costing updates',
      'Final sign-off on implementation scope',
    ],
    relatedServices: ['Estimating & Costing', 'Interior Designing'],
  },
  {
    number: '05',
    title: 'EXECUTE',
    subtitle: 'On-Site Construction & Implementation',
    description: 'Move toward the relevant construction, renovation or implementation stage with site coordination.',
    deliverables: [
      'On-site civil execution and milestone coordination',
      'Material quality verification against specifications',
      'Regular site progress and supervisor reviews',
    ],
    relatedServices: ['2D & 3D Civil Work', 'Renovation'],
  },
  {
    number: '06',
    title: 'COMPLETE',
    subtitle: 'Scope Finalization & Handover',
    description: 'Bring the agreed project scope toward completion with thorough quality checks.',
    deliverables: [
      'Final quality review and snag rectification',
      'Interior, landscape, or civil handover documentation',
      'Project scope completion walk-through',
    ],
    relatedServices: ['Renovation', 'Interior Designing', 'Landscaping'],
  },
];

