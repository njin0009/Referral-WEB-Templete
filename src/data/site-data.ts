export type Job = {
  id: string;
  title: string;
  team: string;
  location: string;
  fit: number;
  contract: string;
  reason: string;
  jobNumber: string;
  closeDate: string;
  url: string;
  image: string;
  priority?: number;
  strengths: string[];
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  summary: string;
  email: string;
  visa: string;
  highlights: string[];
  links: Array<{ label: string; href: string }>;
};

export type CapabilityItem = {
  id: string;
  title: string;
  category: string;
  period: string;
  location?: string;
  coordinates?: [number, number];
  workType?: "internship" | "full-time";
  image: string;
  summary: string;
  points: string[];
  link?: string;
  status?: string;
  group?: string;
  detailTitle?: string;
  details?: string[];
};

export const profile: Profile = {
  name: "Nora Jin",
  role: "Product-minded technologist for BUPA digital roles",
  location: "Melbourne, Australia",
  summary:
    "A compact portfolio prototype for Nora's BUPA applications: product strategy, international delivery, engineering QA, and stakeholder communication in one maintainable site.",
  email: "nuojin01@gmail.com",
  visa: "Eligible to apply for the 485 post-study work visa after graduating in June.",
  highlights: [
    "Product strategy and market-entry work for Australian context",
    "Full-stack delivery across AWS Lambda, Firebase, REST APIs and React",
    "System testing background with CAN/LIN, HMI, OTA and release-quality thinking",
    "Bilingual stakeholder communication across China, Sweden, Malaysia, the UK and Australia",
  ],
  links: [
    { label: "GitHub", href: "https://github.com/njin0009" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/norajin-it" },
    { label: "Email", href: "mailto:nuojin01@gmail.com" },
  ],
};

export const technicalTimeline: CapabilityItem[] = [
  {
    id: "pathwayiq",
    title: "PathwayIQ",
    category: "PM + Full-Stack",
    period: "Apr 2026 - Present",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
    summary:
      "A production-oriented Next.js / React product project covering user journeys, frontend experience, deployment iteration, and product positioning. It is Nora's strongest code plus product ownership case study.",
    points: ["Next.js", "React", "Product ownership", "Live site"],
    link: "https://iteration3.pathwayiq.me/",
    status: "In development",
  },
  {
    id: "glowcheck",
    title: "GlowCheck / UV Aware",
    category: "Serverless Data",
    period: "2026",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    summary:
      "A serverless UV-aware sun safety platform using AWS Lambda, S3, Athena, and Node.js to build a data analytics pipeline with sub-200ms responses. Access password: 1111.",
    points: ["AWS Lambda", "S3", "Athena", "Node.js"],
    link: "https://uvaware.me/",
    status: "Password 1111",
  },
  {
    id: "studycouch",
    title: "StudyCouch",
    category: "Full-Stack",
    period: "2026",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    summary:
      "A full-stack learning and collaboration product that demonstrates Nora's ability to structure user flows, information architecture, and frontend/backend feature delivery.",
    points: ["Full-stack", "UX flow", "Data model", "Collaboration"],
    link: "https://rubystudycouch.pages.dev/",
    status: "In development",
  },
  {
    id: "cloud-pose",
    title: "Cloud Pose Recognition",
    category: "Cloud + AI",
    period: "2025",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    summary:
      "A cloud-based pose recognition project showing Docker, Kubernetes, and cloud deployment capability, supporting Nora's narrative for full-stack software engineering roles.",
    points: ["Docker", "Kubernetes", "Cloud deployment", "Computer vision"],
    link: "https://github.com/njin0009",
  },
];

export const managementTimeline: CapabilityItem[] = [
  {
    id: "helloride",
    title: "Product Marketing Manager Intern - HelloRide",
    category: "Australian local experience · Product Marketing",
    period: "Nov 2025 - Dec 2025",
    location: "Melbourne / Hybrid",
    coordinates: [-37.8136, 144.9631],
    workType: "internship",
    image: "/assets/experience/nexstar-certificates.png",
    summary:
      "HelloRide internship, hybrid. Nora worked on market and stakeholder analysis for the Australian local context, user segmentation, value propositions, product positioning, and success metrics, earning the City of Melbourne NexStar Excellence Award.",
    points: ["Market analysis", "Stakeholder alignment", "Product positioning", "NexStar Award"],
    group: "Australian local experience",
    detailTitle: "NexStar Excellence Award Recipient | City of Melbourne",
    details: [
      "Nov 2025 - Dec 2025 · 2 mos · Hybrid",
      "Conducted market and stakeholder analysis to identify user segments and value propositions.",
      "Developed product positioning and recommendations, earning the NexStar Excellence Award for impact.",
      "Clarified user journeys and success metrics for a digital mentoring platform, improving product priorities.",
      "Introduced structured planning models that improved delivery clarity and stakeholder alignment.",
      "Skills: Technical Product Management, Product Strategy, stakeholder communication, product positioning.",
    ],
  },
  {
    id: "futurelab",
    title: "Product & Technology Intern - FutureLab",
    category: "Australia / Malaysia / United Kingdom · Remote",
    period: "Jun 2025 - Jul 2025",
    location: "Melbourne, Australia / Remote",
    coordinates: [-37.8136, 144.9631],
    workType: "internship",
    image: "/assets/experience/teamwork-certificate.png",
    summary:
      "FutureLab.my internship through the Monash x Warwick TeaMWork Virtual Internship. Nora collaborated across Australia, Malaysia, and the United Kingdom on full-stack solution design, product ideation, feature prioritisation, and stakeholder communication.",
    points: ["International teamwork", "Product ideation", "Rapid prototyping", "Agile delivery"],
    group: "Australia / Malaysia / United Kingdom remote collaboration",
    detailTitle: "TeaMWork Virtual Internship Certificate - FutureLab",
    details: [
      "Jun 2025 - Jul 2025 · 2 mos · Melbourne, Victoria, Australia · Remote",
      "Collaborated in a cross-functional international team to design and deliver a full-stack solution.",
      "Engaged in product ideation and feature prioritisation to meet project goals.",
      "Enhanced product thinking, rapid prototyping, stakeholder communication and Agile collaboration skills.",
      "Completed TeaMWork Virtual Internship from 30 June to 25 July 2025 in collaboration with FutureLab, Monash University and the University of Warwick.",
      "Skills: Digital Product Development, Agile Methodologies, teamwork, stakeholder communication.",
    ],
  },
  {
    id: "ecarx",
    title: "Product Manager - ECARX",
    category: "China-Sweden experience · Volvo / Polestar",
    period: "Jun 2023 - Jun 2024",
    location: "China / On-site",
    coordinates: [30.5928, 114.3055],
    workType: "full-time",
    image: "/assets/experience/ecarx-certificate.png",
    summary:
      "Full-time Product Manager at ECARX. Nora contributed to end-to-end delivery of Volvo / Polestar automotive infotainment systems, managing system integration, release readiness, and cross-border stakeholder coordination.",
    points: ["Technical PM", "Release readiness", "Stakeholder management", "Python automation"],
    group: "China-Sweden automotive delivery experience",
    detailTitle: "Senior Product Development Engineer | System Integration & Delivery | ECARX",
    details: [
      "Jun 2023 - Jun 2024 · 1 yr 1 mo · China · On-site",
      "Contributed to end-to-end delivery of automotive infotainment systems for Volvo and Polestar at ECARX.",
      "Managed system integration, release readiness and stakeholder coordination across cross-border teams.",
      "Supported issue resolution, technical process alignment and delivery timelines between engineering teams.",
      "Enhanced efficiency through Python automation and ensured product quality via system-level validation.",
      "Skills: Technical Product Management, Stakeholder Management, system integration, delivery governance.",
    ],
  },
  {
    id: "isoftstone",
    title: "Software Testing Engineer - Volvo V216",
    category: "China-Sweden experience · System Integration QA",
    period: "May 2022 - May 2023",
    location: "China / On-site",
    coordinates: [30.5928, 114.3055],
    workType: "full-time",
    image: "/assets/experience/isoftstone-certificate.png",
    summary:
      "Full-time Software Engineer in Test at iSoftStone. Nora supported Volvo / Polestar automotive infotainment platforms through system-level and integration testing, CAN/LIN validation, and Python automation regression work.",
    points: ["System testing", "CAN/LIN", "CANoe", "Python automation"],
    group: "China-Sweden automotive delivery experience",
    detailTitle: "Certificate of Termination of Employment | iSoftStone",
    details: [
      "May 2022 - May 2023 · 1 yr 1 mo · China · On-site",
      "Designed and executed system-level and integration test cases for enterprise software and automotive systems, achieving near-100% coverage.",
      "Validated CAN/LIN communication protocol compliance using CANoe and Simulation Box.",
      "Developed Python automation scripts on Linux to improve regression efficiency across multi-module scenarios.",
      "Supported Volvo and Polestar projects and collaborated with cross-border teams (China-Sweden) to align integration issues and delivery timelines.",
      "Skills: system-level validation, protocol validation, Python automation, release quality.",
    ],
  },
  {
    id: "dongfeng",
    title: "Accounting Assistant Intern - Dongfeng Motor",
    category: "China local experience · Finance",
    period: "Aug 2021 - Oct 2021",
    location: "China / On-site",
    coordinates: [30.5928, 114.3055],
    workType: "internship",
    image: "/assets/experience/dongfeng-internship-certificate.png",
    summary:
      "Dongfeng Motor Corporation Passenger Vehicle Company internship. Nora supported finance department operations, account verification, reconciliation, and archiving of 100+ financial documents, demonstrating early-career discipline and accuracy.",
    points: ["Finance accuracy", "Reconciliation", "Archive", "Documentation"],
    group: "China local foundation experience",
    detailTitle: "Internship Certificate - Dongfeng Motor Corporation",
    details: [
      "Aug 2021 - Oct 2021 · 3 mos · China · On-site",
      "Supported day-to-day accounting operations in the Finance Department of Dongfeng Motor Corporation.",
      "Performed accounts verification and reconciliation to ensure financial accuracy.",
      "Managed collection and systematic archiving of 100+ financial documents.",
      "Recognised for collaboration, diligence and strong work ethic throughout the internship.",
      "Skills: Account Reconciliation, Document Management, financial accuracy, archive discipline.",
    ],
  },
];

export const jobs: Job[] = [
  {
    id: "j1",
    title: "Digital Product Manager",
    team: "Byte Squad / Bupa Dental",
    location: "Melbourne",
    fit: 92,
    contract: "Permanent Full Time",
    jobNumber: "#61680",
    closeDate: "25/05/2026",
    url: "https://careers.bupa.com.au/job/melbourne/digital-product-manager/40796/38295245120",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    priority: 1,
    reason:
      "The strongest match across the role set. Byte Squad needs backlog management, Agile squad leadership, and B2C/B2B2C delivery, which aligns with Nora's ECARX product management experience and PathwayIQ product ownership.",
    strengths: ["Direct PM experience", "Backlog ownership", "Agile squad", "PMP + AWS AI"],
  },
  {
    id: "j2",
    title: "Technology Application Owner - Optical & Hearing",
    team: "Optical & Hearing Apps",
    location: "Melbourne",
    fit: 78,
    contract: "Permanent Full Time",
    jobNumber: "#61810",
    closeDate: "01/06/2026",
    url: "https://careers.bupa.com.au/job/melbourne/technology-application-owner-optical-and-hearing/40796/38299680320",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    priority: 2,
    reason:
      "Application lifecycle management, vendor coordination, and Azure API work sit inside Nora's technical product management strengths. Her Volvo/Polestar and China engineering collaboration experience is transferable.",
    strengths: ["App lifecycle", "Vendor coordination", "Go/No-Go gating", "Technical PM"],
  },
  {
    id: "j3",
    title: "Full Stack Software Engineer",
    team: "Digital Engineering",
    location: "Melbourne",
    fit: 68,
    contract: "Fixed Term - 1 year",
    jobNumber: "#60605",
    closeDate: "22/05/2026",
    url: "https://careers.bupa.com.au/job/melbourne/full-stack-software-engineer/40796/36545355008",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    priority: 3,
    reason:
      "Nora can directly demonstrate Next.js, React, Docker, and Kubernetes experience. The main gap is .NET Core, but her AWS Lambda experience gives her a strong architectural bridge to Azure Functions.",
    strengths: ["Next.js", "React", "Docker/K8s", "AWS Lambda"],
  },
  {
    id: "j4",
    title: "Senior Customer & Product Insights Analyst",
    team: "Blua / Product Insights",
    location: "Melbourne",
    fit: 48,
    contract: "Permanent Full Time",
    jobNumber: "#61703",
    closeDate: "29/05/2026",
    url: "https://careers.bupa.com.au/job/melbourne/senior-customer-and-product-insights-analyst/40796/38180991168",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    reason:
      "This sits close to the Digital Product Manager direction within Blua. It requires advanced SQL, Power BI, Adobe Analytics, and 5+ years of analytics experience, so it works best as a supporting application rather than the primary target.",
    strengths: ["Python", "Athena pipeline", "Product insight", "Supplement role"],
  },
  {
    id: "j5",
    title: "Digital Data Specialist",
    team: "Digital Data",
    location: "Melbourne",
    fit: 42,
    contract: "Fixed Term",
    jobNumber: "#61386",
    closeDate: "15/05/2026",
    url: "https://careers.bupa.com.au/job/melbourne/digital-data-specialist/40796/37487295232",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    reason:
      "If the role leans heavily toward Adobe Analytics or Tealium, it should be approached carefully. If the focus is data pipelines or engineering, Nora's Athena, S3, and public dataset integration work becomes strong evidence.",
    strengths: ["Athena", "S3 pipeline", "Data integration", "Check JD first"],
  },
  {
    id: "jcs1",
    title: "Customer Value Specialist - Box Hill",
    team: "Retail Health Insurance",
    location: "Box Hill",
    fit: 38,
    contract: "Permanent Full Time",
    jobNumber: "#61786",
    closeDate: "02/06/2026",
    url: "https://careers.bupa.com.au/job/box-hill/customer-value-specialist-box-hill/40796/38065488128",
    image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=900&q=80",
    priority: 4,
    reason:
      "This is a face-to-face retail health insurance sales and retention role, best kept as a backup option. Nora's fluent Mandarin would be a real advantage in the Box Hill Chinese-Australian community.",
    strengths: ["Backup option", "Mandarin fluency", "Customer value", "Box Hill"],
  },
];
