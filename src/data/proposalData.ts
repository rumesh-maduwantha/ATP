export type LangCode = 'en' | 'si' | 'ta';

export type WorkspaceTabId =
  | 'overview'
  | 'maintenance'
  | 'sustainability'
  | 'complaints'
  | 'purchasing'
  | 'offline'
  | 'folio'
  | 'assistant';

export interface ProposalModule {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  category: 'Operations' | 'Guest Experience' | 'Intelligence';
  purpose: string;
  highlights: string[];
  example: string;
  measures: string;
  image: string;
  workspaceTab: WorkspaceTabId;
  badge: string;
}

export interface PropertyRecord {
  id: string;
  name: string;
  location: string;
  type: string;
  rooms: number;
  occupied: number;
  monthlyRevenueLkr: number;
  monthlyExpenseLkr: number;
  openMaintenance: number;
  openComplaints: number;
  caretaker: string;
  waterPerRoomL: number;
  waterBaselineL: number;
  electricityKwh: number;
  electricityBaselineKwh: number;
  image: string;
}

export interface EquipmentItem {
  id: string;
  propertyId: string;
  name: string;
  roomOrZone: string;
  category: 'Air Conditioner' | 'Water Pump' | 'Generator' | 'Refrigerator' | 'Pool Equipment';
  installedDate: string;
  lastService: string;
  warrantyUntil: string;
  faultCount90d: number;
  repairCostLkr: number;
  technician: string;
  status: 'Healthy' | 'Inspection Flagged' | 'Task Assigned' | 'Awaiting Approval';
  estimatedRepairLkr?: number;
}

export interface ComplaintItem {
  id: string;
  propertyId: string;
  room: string;
  guestName: string;
  channel: 'Room QR' | 'Guest App' | 'AI Voice Bot' | 'Staff Desk';
  category: 'HVAC / AC' | 'Plumbing / Shower' | 'Housekeeping' | 'Wi-Fi / Power' | 'Dining';
  urgency: 'High' | 'Medium' | 'Low';
  summary: string;
  assignedTo: string;
  status: 'Logged' | 'In Progress' | 'Resolved' | 'Guest Confirmed';
  createdAt: string;
  linkedTaskId?: string;
  aiDraftReply: string;
  replyApproved?: boolean;
}

export interface StockItem {
  id: string;
  propertyId: string;
  name: string;
  category: 'Linen' | 'Toiletries' | 'Cleaning' | 'Food Ingredients' | 'Maintenance';
  currentStock: number;
  reorderThreshold: number;
  unit: string;
  forecastNeed: number;
  preferredSupplier: string;
  unitPriceLkr: number;
  supplierReliability: number;
  orderStatus: 'In Stock' | 'Suggested Order' | 'Pending Approval' | 'Approved & Ordered';
}

export interface MenuItem {
  id: string;
  name: string;
  nameSi: string;
  nameTa: string;
  category: 'Breakfast' | 'Sri Lankan Specials' | 'Room Service' | 'Drinks';
  priceLkr: number;
  description: string;
  dietary: string[];
  allergens: string[];
  prepTime: string;
  available: boolean;
  image: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  location: string;
  provider: string;
  verified: boolean;
  priceLkr: number;
  priceUsd: number;
  duration: string;
  cancellation: string;
  availability: string;
  commissionPct: number;
  description: string;
  image: string;
  category: string;
}

export const PROPERTIES: PropertyRecord[] = [
  {
    id: 'galle-villa',
    name: 'Cinnamon Cliff Villa',
    location: 'Galle Fort Coast',
    type: 'Boutique Villa',
    rooms: 12,
    occupied: 10,
    monthlyRevenueLkr: 4850000,
    monthlyExpenseLkr: 1620000,
    openMaintenance: 2,
    openComplaints: 1,
    caretaker: 'Nimal Perera',
    waterPerRoomL: 412,
    waterBaselineL: 280,
    electricityKwh: 3180,
    electricityBaselineKwh: 3050,
    image: '/images/hero-resort.jpg',
  },
  {
    id: 'ella-residence',
    name: 'Ella Mist Residence',
    location: 'Ella Highlands',
    type: 'Hillside Residence',
    rooms: 8,
    occupied: 7,
    monthlyRevenueLkr: 2940000,
    monthlyExpenseLkr: 980000,
    openMaintenance: 1,
    openComplaints: 1,
    caretaker: 'Kasun Bandara',
    waterPerRoomL: 245,
    waterBaselineL: 260,
    electricityKwh: 1840,
    electricityBaselineKwh: 1920,
    image: '/images/villa-suite.jpg',
  },
  {
    id: 'kandy-guesthouse',
    name: 'Kandy Heritage House',
    location: 'Kandy Lakefront',
    type: 'Boutique Guesthouse',
    rooms: 15,
    occupied: 11,
    monthlyRevenueLkr: 3680000,
    monthlyExpenseLkr: 1340000,
    openMaintenance: 1,
    openComplaints: 0,
    caretaker: 'Priyantha Silva',
    waterPerRoomL: 268,
    waterBaselineL: 270,
    electricityKwh: 2690,
    electricityBaselineKwh: 2500,
    image: '/images/welcome-reception.jpg',
  },
];

export const PROPOSAL_MODULES: ProposalModule[] = [
  {
    id: 'predictive-maintenance',
    number: '01',
    title: 'Predictive Maintenance & Equipment History',
    shortTitle: 'Predictive Maintenance',
    category: 'Intelligence',
    purpose: 'Reduce avoidable equipment failures, emergency repairs, and room downtime across ACs, water pumps, generators, and pool systems.',
    highlights: [
      'Complete equipment register with warranty & service logs',
      'Auto-flags repeat faults before the next guest arrival',
      'Human approval gate required before costly repairs',
    ],
    example: 'Repeated AC faults in Room 04 trigger a pre-arrival inspection task for the technician.',
    measures: 'Emergency repair costs, repeat faults & rooms unavailable',
    image: '/images/villa-suite.jpg',
    workspaceTab: 'maintenance',
    badge: 'Phase 2 · Section 3.1',
  },
  {
    id: 'sustainability-utility',
    number: '02',
    title: 'Smart Sustainability & Utility-Cost Manager',
    shortTitle: 'Utility & Eco Manager',
    category: 'Intelligence',
    purpose: 'Monitor electricity, water, gas, and waste per occupied room-night to detect leaks and reduce utility costs.',
    highlights: [
      'Smart meter & manual bill readings against property baselines',
      'Instant anomaly flags for water leaks or idle AC units',
      'Actionable cost-saving & sustainability summaries',
    ],
    example: 'Water use per occupied room spikes 47% above baseline, prompting an immediate pipe leak check.',
    measures: 'Utility cost per occupied room & water per guest-night',
    image: '/images/hero-resort.jpg',
    workspaceTab: 'sustainability',
    badge: 'Phase 2 · Section 3.2',
  },
  {
    id: 'local-marketplace',
    number: '03',
    title: 'Local Experience Marketplace',
    shortTitle: 'Local Experiences',
    category: 'Guest Experience',
    purpose: 'Connect guests with verified Sri Lankan guides, surf instructors, cooking classes, safaris, and local transport.',
    highlights: [
      'Verified local providers with clear safety & cancellation rules',
      'Live booking requests, confirmations & commission tracking',
      'Seamless guest discovery directly inside their stay portal',
    ],
    example: 'A guest books a Weligama surf lesson & Galle Fort tour and receives instant confirmation.',
    measures: 'Experience bookings per stay & ancillary revenue',
    image: '/images/experience-surf.jpg',
    workspaceTab: 'overview',
    badge: 'Phase 3 · Section 3.3',
  },
  {
    id: 'complaint-recovery',
    number: '04',
    title: 'Guest Complaint Prevention & Service Recovery',
    shortTitle: 'Service Recovery',
    category: 'Guest Experience',
    purpose: 'Track every service issue from QR/app submission through maintenance resolution to confirmed guest satisfaction.',
    highlights: [
      'QR, app & staff logging with automatic urgency routing',
      'Overdue escalation & repeat-problem pattern tracking',
      'AI-drafted replies with mandatory human review for sensitive cases',
    ],
    example: 'A shower fault logs a complaint, assigns the caretaker, and prompts a post-repair guest check-in.',
    measures: 'Average resolution time, overdue cases & guest satisfaction',
    image: '/images/welcome-reception.jpg',
    workspaceTab: 'complaints',
    badge: 'Phase 1 · Section 3.4',
  },
  {
    id: 'multi-property',
    number: '05',
    title: 'Multi-Property Owner & Caretaker Control',
    shortTitle: 'Multi-Property Hub',
    category: 'Operations',
    purpose: 'Oversee multiple villas, hotels, or guesthouses in one consolidated view without mixing financial or operational records.',
    highlights: [
      'Consolidated owner view of occupancy, revenue & expenses',
      'Strict property-level separation for bookings & accounting',
      'Role-based caretaker access limited to assigned properties',
    ],
    example: 'An owner compares 3 villas in real time while each caretaker sees only their property’s daily tasks.',
    measures: 'Reporting time, overdue tasks & zero record-mixing errors',
    image: '/images/operations-villa.jpg',
    workspaceTab: 'overview',
    badge: 'Phase 1 · Section 3.5',
  },
  {
    id: 'ai-voice-multilingual',
    number: '06',
    title: 'Pre-Arrival, Checkout & Trilingual AI Assistant',
    shortTitle: 'EN / සිං / தமி AI Bot',
    category: 'Guest Experience',
    purpose: 'Automate arrival guides, checkout summaries, and routine requests in Sinhala, Tamil, and English via voice or text.',
    highlights: [
      'Configurable pre-arrival directions, house rules & upsells',
      'Sinhala, Tamil & English assistant tuned for Sri Lankan hospitality',
      'Permission controls & human approval for refunds or room moves',
    ],
    example: 'A guest requests extra towels in Sinhala; rooomy.lk logs a housekeeping task and confirms once recorded.',
    measures: 'Response time, task completion & staff hours saved',
    image: '/images/welcome-reception.jpg',
    workspaceTab: 'assistant',
    badge: 'Phase 3 · Section 3.6',
  },
  {
    id: 'offline-first',
    number: '07',
    title: 'Offline-First Operations & Auto-Sync',
    shortTitle: 'Offline-First Sync',
    category: 'Operations',
    purpose: 'Keep housekeeping checklists, maintenance notes, and stock counts working seamlessly even during weak Sri Lankan coastal or hill-country connectivity.',
    highlights: [
      'Clear Local / Pending Sync / Synced status indicators',
      'Automatic sync on reconnection with conflict-review flags',
      'Strict conflict protection for bookings, rooms & payments',
    ],
    example: 'A caretaker completes a villa inspection offline; records sync automatically once Wi-Fi returns.',
    measures: 'Zero lost entries, failed syncs & duplicate records',
    image: '/images/operations-villa.jpg',
    workspaceTab: 'offline',
    badge: 'Phase 4 · Section 3.7',
  },
  {
    id: 'purchasing-suppliers',
    number: '08',
    title: 'In-App Purchasing & Supplier Management',
    shortTitle: 'Smart Purchasing',
    category: 'Operations',
    purpose: 'Prevent stockouts and uncontrolled spend with reorder thresholds, occupancy-linked purchase lists, and manager approvals.',
    highlights: [
      'Live stock tracking for linen, toiletries, kitchen & maintenance',
      'Forecast-driven purchase suggestions based on occupancy',
      'Supplier catalogues, reliability scores & budget approval gates',
    ],
    example: 'High weekend occupancy + low linen stock generates a purchase request ready for manager approval.',
    measures: 'Stockout frequency, emergency purchases & supplier reliability',
    image: '/images/dining-srilanka.jpg',
    workspaceTab: 'purchasing',
    badge: 'Phase 1 · Section 3.8',
  },
  {
    id: 'qr-guest-folio',
    number: '09',
    title: 'QR-Based Guest Spending & Available Balance',
    shortTitle: 'QR Guest Folio',
    category: 'Guest Experience',
    purpose: 'Deliver transparent, revocable QR access to itemised stay charges, deposits, spending limits, and remaining balance.',
    highlights: [
      'Authenticated, expiring room QR links protecting guest privacy',
      'Clear split of Deposit, Spending Limit, Paid & Balance Due',
      'One-tap charge query to resolve disputes before checkout',
    ],
    example: 'A guest scans their room QR code to review dining charges and verify their remaining deposit balance.',
    measures: 'Billing disputes, front-desk enquiries & checkout speed',
    image: '/images/villa-suite.jpg',
    workspaceTab: 'folio',
    badge: 'Phase 1 · Section 3.9',
  },
  {
    id: 'digital-menu',
    number: '10',
    title: 'In-App Multilingual Digital Menu',
    shortTitle: 'Digital Menu',
    category: 'Guest Experience',
    purpose: 'Let guests browse curated dishes with dietary/allergen info, place QR orders, and auto-post approved charges to their folio.',
    highlights: [
      'Photos, descriptions, dietary tags & accurate allergen labels',
      'Multilingual categories: Breakfast, Sri Lankan Specials, Drinks',
      'Instant kitchen routing, live status & automatic folio posting',
    ],
    example: 'A guest orders Lagoon Crab Curry via room QR, tracks kitchen prep, and sees the charge on their folio.',
    measures: 'Order processing time, zero order errors & F&B revenue',
    image: '/images/dining-srilanka.jpg',
    workspaceTab: 'folio',
    badge: 'Phase 1 · Section 3.10',
  },
];

export const CROSS_CUTTING_PILLARS = [
  {
    id: 'rbac',
    title: 'Role-Based Permissions',
    short: 'Role Access',
    description:
      'Dedicated workspaces and strict permission boundaries for Owners, Managers, Receptionists, Caretakers, Housekeeping, Maintenance Technicians, and Guests.',
    highlights: ['Property-scoped caretaker access', 'Separate financial visibility for owners', 'Zero cross-property data leakage'],
    accent: false,
  },
  {
    id: 'audit',
    title: 'Complete Audit History',
    short: 'Audit Trail',
    description:
      'Every room change, financial adjustment, purchase order, refund, and equipment update is immutably logged with user identity and timestamp.',
    highlights: ['Financial & folio change logs', 'Room reallocation tracking', 'Exportable property compliance reports'],
    accent: true,
  },
  {
    id: 'privacy',
    title: 'Privacy & QR Security',
    short: 'QR Security',
    description:
      'Authenticated, expiring, and revocable QR guest links protect personal stay details, voice transcripts, payment data, and local offline caches.',
    highlights: ['Revocable per-stay QR tokens', 'Encrypted offline local storage', 'No public guest financial exposure'],
    accent: false,
  },
  {
    id: 'human-approval',
    title: 'Human-in-the-Loop Approvals',
    short: 'Human Gates',
    description:
      'AI drafts responses and flags maintenance or purchase orders, while high-impact actions — purchases, refunds, costly repairs, and room moves — require human approval.',
    highlights: ['Manager approval on POs & repairs', 'Staff review for sensitive guest replies', 'Never claims completion until confirmed'],
    accent: true,
  },
  {
    id: 'offline-sync',
    title: 'Resilient Offline Sync',
    short: 'Offline Sync',
    description:
      'Built for Sri Lankan hill-country and coastal properties with intermittent Wi-Fi. Safe local queuing with automatic sync and strict booking conflict guards.',
    highlights: ['Clear Pending / Synced indicators', 'Conflict resolution review queue', 'Never silently approves conflicting bookings'],
    accent: false,
  },
  {
    id: 'trilingual',
    title: 'Mobile-First Trilingual UX',
    short: 'EN · සිං · தமி',
    description:
      'Accessible mobile-first workflows tailored for Sri Lankan hospitality teams and global guests with English, Sinhala, and Tamil support plus clean integration boundaries.',
    highlights: ['Sinhala, Tamil & English ready', 'Fast onboarding for villa caretakers', 'Open integration boundaries for Sri Lankan gateways'],
    accent: true,
  },
];

export const CONNECTED_WORKFLOWS = [
  {
    id: 'ac-fault',
    title: 'Broken AC → Service Recovery',
    tag: 'Workflow 01',
    summary: 'One guest report triggers coordinated maintenance, room readiness review, and guest follow-up with zero duplicate data entry.',
    steps: [
      { label: 'Guest Reports Broken AC', detail: 'Submitted via Room 04 QR code or Sinhala/English bot', role: 'Guest' },
      { label: 'Complaint Logged & Categorised', detail: 'High urgency HVAC ticket linked to Equipment #AC-04', role: 'System' },
      { label: 'Maintenance Task Assigned', detail: 'Technician notified with past 90-day AC fault history', role: 'Maintenance' },
      { label: 'Room Readiness Reviewed', detail: 'Front desk alerted before next check-in window', role: 'Caretaker' },
      { label: 'Guest Confirmation Sent', detail: 'Staff reviews AI draft & confirms guest comfort', role: 'Service Recovery' },
    ],
  },
  {
    id: 'occupancy-purchasing',
    title: 'Occupancy Spike → Auto Purchase Order',
    tag: 'Workflow 02',
    summary: 'Forecasted bookings automatically evaluate stock thresholds so villas never face weekend linen or breakfast shortages.',
    steps: [
      { label: 'Forecasted Occupancy Rises', detail: 'Galle Villa reaches 92% occupancy for upcoming long weekend', role: 'Forecast Engine' },
      { label: 'Stock Threshold Evaluated', detail: 'King linen sets & Ceylon breakfast tea fall below safety level', role: 'Inventory' },
      { label: 'Purchase Request Prepared', detail: 'Best-priced verified supplier selected with delivery lead time', role: 'Purchasing' },
      { label: 'Manager Human Approval', detail: 'Owner reviews budget limit and approves PO with 1 tap', role: 'Owner / Manager' },
      { label: 'Delivery Logged to Stock', detail: 'Caretaker verifies receipt and updates property inventory', role: 'Caretaker' },
    ],
  },
  {
    id: 'digital-menu-folio',
    title: 'Digital Menu Order → Live QR Folio',
    tag: 'Workflow 03',
    summary: 'Orders move cleanly from table or room QR to the kitchen and refresh the guest’s live spending balance automatically.',
    steps: [
      { label: 'Guest Scans Room QR', detail: 'Authenticated stay session opens multilingual menu with allergens', role: 'Guest' },
      { label: 'Order Sent to Kitchen', detail: 'Kitchen & room-service team receive ticket with dietary notes', role: 'Kitchen' },
      { label: 'Live Status Updates', detail: 'Order transitions: Confirmed → Preparing → On the Way', role: 'Service Team' },
      { label: 'Charge Posted to Folio', detail: 'Approved LKR charge attached to Room 04 itemised folio', role: 'Billing' },
      { label: 'QR Balance Refreshes', detail: 'Remaining configured spending limit updates transparently', role: 'Guest Folio' },
    ],
  },
  {
    id: 'offline-caretaker',
    title: 'Offline Caretaker Inspection → Smart Sync',
    tag: 'Workflow 04',
    summary: 'Field staff never lose housekeeping or maintenance records during rural or stormy network drops.',
    steps: [
      { label: 'Connectivity Drops', detail: 'App switches smoothly to Offline-First mode with local badge', role: 'Mobile App' },
      { label: 'Inspection Saved Locally', detail: 'Caretaker completes Room 07 cleaning & water meter reading', role: 'Caretaker' },
      { label: 'Marked Pending Sync', detail: 'Encrypted local queue displays clear pending status', role: 'Sync Engine' },
      { label: 'Auto-Sync on Reconnect', detail: 'Queued records upload cleanly when Wi-Fi or 4G returns', role: 'Cloud Sync' },
      { label: 'Conflict Review Guard', detail: 'Any overlapping room allocation is flagged for manager review', role: 'Conflict Guard' },
    ],
  },
  {
    id: 'multi-property-owner',
    title: 'Multi-Property Portfolio → Clean Separation',
    tag: 'Workflow 05',
    summary: 'Owners monitor every villa in one executive view while keeping property ledgers and staff access strictly isolated.',
    steps: [
      { label: 'Caretakers Update Daily Ops', detail: 'Galle, Ella & Kandy teams log tasks only for their assigned villa', role: 'Caretakers' },
      { label: 'Property Ledgers Isolated', detail: 'Bookings, utility bills & supplier invoices stay strictly separated', role: 'Access Control' },
      { label: 'Anomalies Surfaced', detail: 'Galle water spike & Ella AC repeat fault flagged automatically', role: 'Intelligence' },
      { label: 'Consolidated Owner Report', detail: 'Real-time occupancy, LKR net margin & overdue tasks across 3 properties', role: 'Owner' },
      { label: 'Audit Trail Preserved', detail: 'Every financial adjustment & approval recorded with timestamps', role: 'Governance' },
    ],
  },
];

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'EQ-101',
    propertyId: 'galle-villa',
    name: 'Daikin Inverter AC 18,000 BTU',
    roomOrZone: 'Ocean Suite 04',
    category: 'Air Conditioner',
    installedDate: '2023-04-12',
    lastService: '2026-08-15',
    warrantyUntil: '2028-04-12',
    faultCount90d: 3,
    repairCostLkr: 28500,
    technician: 'Suresh Cooling Tech',
    status: 'Inspection Flagged',
    estimatedRepairLkr: 42000,
  },
  {
    id: 'EQ-102',
    propertyId: 'galle-villa',
    name: 'Infinity Pool Filtration Pump',
    roomOrZone: 'Main Pool Deck',
    category: 'Pool Equipment',
    installedDate: '2024-01-20',
    lastService: '2026-10-05',
    warrantyUntil: '2027-01-20',
    faultCount90d: 0,
    repairCostLkr: 0,
    technician: 'Lanka Pool Care',
    status: 'Healthy',
  },
  {
    id: 'EQ-103',
    propertyId: 'galle-villa',
    name: 'Perkins 45kVA Backup Generator',
    roomOrZone: 'Utility Shed B',
    category: 'Generator',
    installedDate: '2022-09-01',
    lastService: '2026-09-20',
    warrantyUntil: '2026-09-01',
    faultCount90d: 1,
    repairCostLkr: 64000,
    technician: 'Southern Power Eng.',
    status: 'Awaiting Approval',
    estimatedRepairLkr: 78500,
  },
  {
    id: 'EQ-201',
    propertyId: 'ella-residence',
    name: 'Pressure Booster Water Pump',
    roomOrZone: 'Upper Cistern',
    category: 'Water Pump',
    installedDate: '2024-06-10',
    lastService: '2026-10-12',
    warrantyUntil: '2027-06-10',
    faultCount90d: 2,
    repairCostLkr: 19500,
    technician: 'Hill Country Plumbing',
    status: 'Inspection Flagged',
    estimatedRepairLkr: 31000,
  },
  {
    id: 'EQ-301',
    propertyId: 'kandy-guesthouse',
    name: 'Commercial Kitchen Chiller',
    roomOrZone: 'Main Kitchen',
    category: 'Refrigerator',
    installedDate: '2023-11-05',
    lastService: '2026-11-01',
    warrantyUntil: '2026-11-05',
    faultCount90d: 0,
    repairCostLkr: 8500,
    technician: 'Kandy Cold Chain',
    status: 'Healthy',
  },
];

export const INITIAL_COMPLAINTS: ComplaintItem[] = [
  {
    id: 'CMP-409',
    propertyId: 'galle-villa',
    room: 'Ocean Suite 04',
    guestName: 'Elena Lindqvist',
    channel: 'Room QR',
    category: 'HVAC / AC',
    urgency: 'High',
    summary: 'Air conditioner blowing warm air after 30 minutes; room feels humid.',
    assignedTo: 'Nimal Perera (Caretaker)',
    status: 'In Progress',
    createdAt: '25 mins ago',
    linkedTaskId: 'MNT-EQ-101',
    aiDraftReply:
      'Dear Ms. Lindqvist, thank you for letting us know right away. Our technician has been dispatched to Ocean Suite 04 to inspect the air conditioning unit (ticket #MNT-EQ-101). In the meantime, may we send chilled king coconut water or offer a temporary lounge refresh?',
    replyApproved: false,
  },
  {
    id: 'CMP-410',
    propertyId: 'ella-residence',
    room: 'Cloud Villa 02',
    guestName: 'Arjun Rajapakse',
    channel: 'AI Voice Bot',
    category: 'Plumbing / Shower',
    urgency: 'Medium',
    summary: 'Hot water pressure in rainfall shower fluctuates in the evening.',
    assignedTo: 'Kasun Bandara (Caretaker)',
    status: 'Logged',
    createdAt: '1 hr ago',
    linkedTaskId: 'MNT-EQ-201',
    aiDraftReply:
      'Ayubowan Mr. Rajapakse! We have logged your shower pressure note and assigned our caretaker Kasun to inspect the upper booster pump right away. We will follow up with you as soon as pressure is restored.',
    replyApproved: false,
  },
];

export const INITIAL_STOCK: StockItem[] = [
  {
    id: 'STK-01',
    propertyId: 'galle-villa',
    name: 'Egyptian Cotton King Linen Sets',
    category: 'Linen',
    currentStock: 8,
    reorderThreshold: 14,
    unit: 'sets',
    forecastNeed: 18,
    preferredSupplier: 'Ceylon Fine Linens (Colombo)',
    unitPriceLkr: 14500,
    supplierReliability: 97,
    orderStatus: 'Suggested Order',
  },
  {
    id: 'STK-02',
    propertyId: 'galle-villa',
    name: 'Ayurvedic Lemongrass Bath Amenities',
    category: 'Toiletries',
    currentStock: 22,
    reorderThreshold: 30,
    unit: 'kits',
    forecastNeed: 45,
    preferredSupplier: 'Serendib Botanicals',
    unitPriceLkr: 1850,
    supplierReliability: 95,
    orderStatus: 'Pending Approval',
  },
  {
    id: 'STK-03',
    propertyId: 'ella-residence',
    name: 'Single-Estate Ceylon Breakfast Tea & Coffee',
    category: 'Food Ingredients',
    currentStock: 16,
    reorderThreshold: 10,
    unit: 'kg',
    forecastNeed: 12,
    preferredSupplier: 'Uva Highland Roasters',
    unitPriceLkr: 4200,
    supplierReliability: 99,
    orderStatus: 'In Stock',
  },
  {
    id: 'STK-04',
    propertyId: 'kandy-guesthouse',
    name: 'Eco-Safe Biodegradable Housekeeping Kit',
    category: 'Cleaning',
    currentStock: 5,
    reorderThreshold: 10,
    unit: 'cases',
    forecastNeed: 12,
    preferredSupplier: 'GreenCare Hospitality LK',
    unitPriceLkr: 7600,
    supplierReliability: 93,
    orderStatus: 'Suggested Order',
  },
];

export const DIGITAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'MNU-01',
    name: 'Galle Lagoon Grilled Sea Bass & Prawns',
    nameSi: 'ගාලු කලපු ග්‍රිල්ඩ් මෝදා සහ ඉස්සන්',
    nameTa: 'காலி களப்பு கிரில்ட் கடல் மீன் & இறால்',
    category: 'Sri Lankan Specials',
    priceLkr: 6400,
    description: 'Line-caught sea bass & tiger prawns with saffron rice, pol sambol, and lime emulsion.',
    dietary: ['Gluten-Free', 'Chef Signature'],
    allergens: ['Fish', 'Shellfish'],
    prepTime: '25 mins',
    available: true,
    image: '/images/dining-srilanka.jpg',
  },
  {
    id: 'MNU-02',
    name: 'Traditional Egg Hoppers & Seenisambol Trio',
    nameSi: 'බිත්තර ආප්ප සහ සීනි සම්බෝල',
    nameTa: 'முட்டை ஆப்பம் & சீனி சம்பல்',
    category: 'Breakfast',
    priceLkr: 2450,
    description: 'Crisp fermented coconut milk hoppers served with caramelized onion sambol and lunu miris.',
    dietary: ['Dairy-Free', 'Local Classic'],
    allergens: ['Eggs'],
    prepTime: '15 mins',
    available: true,
    image: '/images/dining-srilanka.jpg',
  },
  {
    id: 'MNU-03',
    name: 'Black Pork Curry & Heritage Red Rice',
    nameSi: 'කළු ඌරු මස් කරිය සහ රතු බත්',
    nameTa: 'கருப்பு பன்றி இறைச்சி கறி & சிவப்பு அரிசி',
    category: 'Sri Lankan Specials',
    priceLkr: 4800,
    description: 'Slow-braised roasted spice curry paired with heirloom red kekulu rice and tempered dhal.',
    dietary: ['Spicy', 'Gluten-Free'],
    allergens: ['None'],
    prepTime: '20 mins',
    available: true,
    image: '/images/dining-srilanka.jpg',
  },
  {
    id: 'MNU-04',
    name: 'Chilled King Coconut & Cinnamon Cooler',
    nameSi: 'තැඹිලි සහ කුරුඳු පානය',
    nameTa: 'இளநீர் & இலவங்கப்பட்டை பானம்',
    category: 'Drinks',
    priceLkr: 1200,
    description: 'Fresh southern thambili infused with Ceylon alba cinnamon and organic lime.',
    dietary: ['Vegan', 'Zero Added Sugar'],
    allergens: ['None'],
    prepTime: '5 mins',
    available: true,
    image: '/images/experience-surf.jpg',
  },
  {
    id: 'MNU-05',
    name: 'Late-Night Club Sandwich & Sweet Potato Fries',
    nameSi: 'ක්ලබ් සැන්ඩ්විච් සහ බතල ෆ්‍රයිස්',
    nameTa: 'கிளப் சாண்ட்விச் & சர்க்கரைவள்ளி பிரைஸ்',
    category: 'Room Service',
    priceLkr: 3100,
    description: 'Toasted sourdough layers with free-range egg, roast chicken, avocado, and herb aioli.',
    dietary: ['24/7 Room Service'],
    allergens: ['Gluten', 'Eggs'],
    prepTime: '18 mins',
    available: true,
    image: '/images/welcome-reception.jpg',
  },
];

export const LOCAL_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'EXP-01',
    title: 'Galle Fort Heritage Walk',
    location: 'Galle Fort · 12 mins away',
    provider: 'Ruwan Heritage Guides',
    verified: true,
    priceLkr: 9500,
    priceUsd: 32,
    duration: '2.5 Hours',
    cancellation: 'Free cancellation up to 12h prior',
    availability: 'Daily · 8:30 AM & 4:00 PM',
    commissionPct: 12,
    description: 'Guided architectural & Dutch-era rampart storytelling walk ending with sunset tea overlooking the lighthouse.',
    image: '/images/hero-resort.jpg',
    category: 'Cultural Guide',
  },
  {
    id: 'EXP-02',
    title: 'Weligama Private Surf Lesson',
    location: 'Weligama Bay · 25 mins',
    provider: 'South Swell Surf Collective',
    verified: true,
    priceLkr: 14500,
    priceUsd: 48,
    duration: '2 Hours',
    cancellation: 'Free reschedule for ocean conditions',
    availability: 'Daily · 7:00 AM & 3:30 PM',
    commissionPct: 15,
    description: 'ISA-certified local instructors, soft-top boards, rash guards, and tuk-tuk return pickup directly from your villa gate.',
    image: '/images/experience-surf.jpg',
    category: 'Ocean & Surf',
  },
  {
    id: 'EXP-03',
    title: 'Village Spice & Clay-Pot Cooking',
    location: 'Habaraduwa · 15 mins',
    provider: 'Amma’s Kitchen Experience',
    verified: true,
    priceLkr: 12800,
    priceUsd: 42,
    duration: '3.5 Hours',
    cancellation: 'Free cancellation up to 24h prior',
    availability: 'Mon – Sat · 10:00 AM',
    commissionPct: 14,
    description: 'Fresh market tour followed by hands-on wood-fired clay-pot curry preparation with organic garden spices.',
    image: '/images/dining-srilanka.jpg',
    category: 'Culinary Class',
  },
  {
    id: 'EXP-04',
    title: 'Ella Nine Arch & Tea Estate Tuk-Tuk',
    location: 'Ella Highlands',
    provider: 'Highland Trails Verified Drivers',
    verified: true,
    priceLkr: 11200,
    priceUsd: 37,
    duration: '4 Hours',
    cancellation: 'Free cancellation up to 12h prior',
    availability: 'Daily · Flexible Departure',
    commissionPct: 10,
    description: 'Private vetted tuk-tuk host covering Nine Arch Bridge, Little Adam’s Peak, and an artisan tea tasting.',
    image: '/images/villa-suite.jpg',
    category: 'Scenic Excursion',
  },
  {
    id: 'EXP-05',
    title: 'Private Airport & Coastal Transfer',
    location: 'BIA Colombo ↔ Southern Coast',
    provider: 'Serendib Chauffeur Fleet',
    verified: true,
    priceLkr: 28500,
    priceUsd: 95,
    duration: '2.5 Hours via Expressway',
    cancellation: 'Free flight-delay adjustment',
    availability: '24/7 On-Demand',
    commissionPct: 10,
    description: 'Air-conditioned luxury sedan or KDH van with verified English/Sinhala/Tamil chauffeur and chilled refreshments.',
    image: '/images/operations-villa.jpg',
    category: 'Verified Transport',
  },
];

export const IMPLEMENTATION_PHASES = [
  {
    phase: 'Phase 1',
    title: 'Core Operational Workflows',
    timeline: 'Months 1–2',
    scope: 'Multi-property access control, guest complaints & service recovery, purchasing & supplier records, multilingual digital menu, and authenticated QR guest folio.',
    reason: 'Establish reliable core records, role-based permissions, and everyday property workflows first.',
  },
  {
    phase: 'Phase 2',
    title: 'Operational Intelligence',
    timeline: 'Months 3–4',
    scope: 'Equipment history & predictive maintenance schedules, utility-cost tracking against property baselines, smart staff notifications, and consolidated operational reports.',
    reason: 'Use accumulated operational data to prevent costly equipment downtime and reduce utility waste.',
  },
  {
    phase: 'Phase 3',
    title: 'Guest Automation & Local Commerce',
    timeline: 'Months 5–6',
    scope: 'Configurable pre-arrival & checkout workflows, Sinhala / Tamil / English AI text & voice assistant, and verified Local Experience Marketplace.',
    reason: 'Automate repetitive guest communication and unlock ancillary revenue once core workflows are stable.',
  },
  {
    phase: 'Phase 4',
    title: 'Resilience & Optimisation',
    timeline: 'Months 7–8',
    scope: 'Offline-first mobile operation, strict conflict-resolution queues, occupancy-linked automated purchasing, and advanced predictive maintenance recommendations.',
    reason: 'Deliver rock-solid offline resilience and data-driven optimisation backed by quality operational records.',
  },
];

export const SUCCESS_MEASURES = [
  { area: 'Maintenance', measure: 'Repeat faults, emergency repair cost, equipment downtime', target: '-38% Emergency Repairs' },
  { area: 'Sustainability', measure: 'Utility cost per occupied room, water use per guest-night', target: '-22% Utility Waste' },
  { area: 'Guest Service', measure: 'Complaint resolution time, overdue requests, guest satisfaction', target: '< 25 min Resolution' },
  { area: 'Purchasing', measure: 'Stockouts, emergency purchases, supplier delivery reliability', target: 'Zero Weekend Stockouts' },
  { area: 'Digital Menu & Folio', measure: 'Order errors, order processing time, checkout billing disputes', target: '-85% Billing Disputes' },
  { area: 'AI Assistant', measure: 'Correct task completion rate, response time, human correction rate', target: 'EN / සිං / தமி < 5s' },
  { area: 'Offline Operation', measure: 'Failed synchronisations, duplicate records, lost staff entries', target: '99.9% Sync Integrity' },
  { area: 'Multi-Property', measure: 'Owner reporting time, overdue tasks, record separation errors', target: '100% Ledger Isolation' },
];

export interface TeamMember {
  id: string;
  number: string;
  name: string;
  role: string;
  focusModule: string;
  bio: string;
  image: string;
  linkedin: string;
  github: string;
  email: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    number: '01',
    name: 'Rumesh Perera',
    role: 'Project Lead & System Architect',
    focusModule: 'Multi-Property & Core Workflows',
    bio: 'Leads platform architecture, role-based access boundaries, and connected operational workflows across villas and boutique hotels.',
    image: '/images/team-1.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'mailto:team1@rooomy.lk',
  },
  {
    id: 'tm-2',
    number: '02',
    name: 'Kavindi Jayasinghe',
    role: 'Product & Hospitality UX Lead',
    focusModule: 'QR Guest Folio & Digital Menu',
    bio: 'Crafts mobile-first guest experiences, transparent QR spending folios, and multilingual digital dining journeys.',
    image: '/images/team-2.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'mailto:team2@rooomy.lk',
  },
  {
    id: 'tm-3',
    number: '03',
    name: 'Tharindu Bandara',
    role: 'AI & Trilingual NLP Engineer',
    focusModule: 'Sinhala · Tamil · English AI Bot',
    bio: 'Designs the voice and text hospitality assistant, pre-arrival automation, and human-in-the-loop approval guards.',
    image: '/images/team-3.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'mailto:team3@rooomy.lk',
  },
  {
    id: 'tm-4',
    number: '04',
    name: 'Dilini Fernando',
    role: 'Full-Stack & Analytics Engineer',
    focusModule: 'Predictive Maintenance & Eco',
    bio: 'Builds equipment health registers, utility anomaly detection baselines, and real-time owner sustainability dashboards.',
    image: '/images/team-4.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'mailto:team4@rooomy.lk',
  },
  {
    id: 'tm-5',
    number: '05',
    name: 'Sahan Wijesinghe',
    role: 'Backend, Offline Sync & QA Lead',
    focusModule: 'Offline-First Sync & Purchasing',
    bio: 'Engineers resilient offline queuing, strict booking conflict guards, supplier purchasing flows, and audit security.',
    image: '/images/team-5.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'mailto:team5@rooomy.lk',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'Managing three boutique villas across Galle and Ella used to mean four WhatsApp groups and messy spreadsheets. With rooomy.lk, each caretaker sees only their villa’s tasks while I approve purchase orders and monitor water anomalies from Colombo.',
    author: 'Dinesh Jayawardena',
    role: 'Owner · Southern Coast Villa Collection',
    location: 'Galle & Ella, Sri Lanka',
    rating: 5,
  },
  {
    quote:
      'Our guests love scanning the room QR code to order hoppers and check their exact remaining balance without queuing at reception. Billing questions at checkout dropped almost to zero.',
    author: 'Amaya Senanayake',
    role: 'General Manager · Heritage Lake House',
    location: 'Kandy, Sri Lanka',
    rating: 5,
  },
  {
    quote:
      'Even when heavy monsoon rain drops our hill-country Wi-Fi, my housekeeping and maintenance checklists save locally and sync automatically once the signal returns. Nothing ever gets lost.',
    author: 'Kasun Bandara',
    role: 'Head Caretaker · Mist Ridge Residence',
    location: 'Ella, Sri Lanka',
    rating: 5,
  },
];
