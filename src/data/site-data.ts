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
  roleRequirements: string[];
  fitReasons: string[];
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
  evidenceTranslation?: {
    title: string;
    body: string[];
    note?: string;
  };
};

export const profile: Profile = {
  name: "Nora Jin",
  role: "Product-minded technologist for BUPA digital roles",
  location: "Melbourne, Australia",
  summary:
    "BUPA-relevant candidate profile across product strategy, international delivery, engineering QA, and stakeholder communication.",
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
    image: "/assets/projects/pathwayiq.png",
    summary:
      "A Next.js / React product project covering user journeys, frontend experience, deployment iteration, and product positioning. Strong evidence for product ownership with hands-on technical delivery.",
    points: ["Next.js", "React", "Product ownership", "Live site"],
    link: "https://iteration3.pathwayiq.me/",
    status: "In development",
  },
  {
    id: "glowcheck",
    title: "GlowCheck / UV Aware",
    category: "Serverless Data",
    period: "2026",
    image: "/assets/projects/glowcheck-uv-aware.png",
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
    image: "/assets/projects/studycouch.png",
    summary:
      "A full-stack learning and collaboration product with clear user flows, information architecture, and frontend/backend feature delivery.",
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
      "A cloud-based pose recognition project showing Docker, Kubernetes, computer vision, and cloud deployment capability for full-stack engineering roles.",
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
    evidenceTranslation: {
      title: "Employment Termination Certificate | ECARX",
      body: [
        "This certificate confirms that Nuo Jin joined ECARX on 21 June 2023.",
        "Her latest employment contract covered the period from 21 June 2023 to 30 June 2026.",
        "Her employment relationship with the company was terminated on 9 April 2024.",
        "Before leaving, she worked in the Testing Center department as a Senior Product Development Engineer.",
        "The certificate was issued by ECARX (Hubei) Technology Co., Ltd. on 29 April 2024.",
      ],
      note: "Translated from the original Chinese certificate for readability. The original image remains the source document.",
    },
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
    evidenceTranslation: {
      title: "Termination of Employment Relationship Certificate | iSoftStone",
      body: [
        "This certificate confirms that Nuo Jin signed an employment contract with iSoftStone Information Technology (Group) Co., Ltd. on 29 April 2022.",
        "Her valid employment contract period was from 1 August 2022 to 31 July 2025.",
        "Before leaving, her position was Software Engineer.",
        "The employment relationship with iSoftStone Wuhan Branch was terminated on 19 June 2023.",
        "Her service period with iSoftStone was 13.7 months.",
        "From the date of termination, the company had no obligation to pay non-compete compensation, and the employee had no non-compete obligations.",
      ],
      note: "Translated from the original Chinese certificate for readability. The original image remains the source document.",
    },
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
    evidenceTranslation: {
      title: "Internship Certificate | Dongfeng Motor Corporation",
      body: [
        "This certificate confirms that Nuo Jin, a student majoring in Economics and Finance at Changchun Normal University, completed an internship at Dongfeng Motor Corporation Passenger Vehicle Company.",
        "The internship period was from 4 August 2021 to 1 October 2021.",
        "Her internship role was Accounting Assistant.",
        "Her main responsibilities included account verification, document receiving and dispatching, and archive data management.",
        "During the internship, she studied carefully, reflected actively, applied university knowledge to practical work, followed company systems, respected internship staff, and maintained good relationships with colleagues.",
      ],
      note: "Translated from the original Chinese certificate for readability. The original image remains the source document.",
    },
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
      "A product manager who can translate customer journeys into shipped digital experiences, while also speaking fluently with engineering teams.",
    roleRequirements: [
      "Own digital product roadmap, discovery, booking pathways, and prioritised backlog",
      "Lead Agile squad delivery across product, design, engineering, testing, and business teams",
      "Use analytics, experimentation, and customer insight to improve digital outcomes",
    ],
    fitReasons: [
      "ECARX product roadmap ownership, Go/No-Go release gates, Jira dashboards, and Volvo/Polestar cross-functional delivery",
      "PathwayIQ and GlowCheck show hands-on product ownership across user journeys, frontend experience, APIs, and deployment",
      "HelloRide adds Australian market research, stakeholder analysis, value proposition, and product positioning evidence",
    ],
    strengths: ["Roadmap ownership", "Discovery + backlog", "Agile squad delivery", "Analytics + experiments"],
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
      "A technical product/application owner with release readiness, vendor coordination, and systems integration experience.",
    roleRequirements: [
      "Manage application lifecycle, release/change control, support, monitoring, and continuous improvement",
      "Coordinate business stakeholders, IT teams, vendors, MSPs, cloud APIs, and relational data platforms",
      "Keep enterprise applications reliable, secure, compliant, and aligned to service-line goals",
    ],
    fitReasons: [
      "ECARX experience covers release readiness, system integration, Go/No-Go gates, issue triage, and delivery governance",
      "Volvo/Polestar work proves stakeholder coordination across engineering, product, QA, and cross-border teams",
      "Python/Linux automation plus AWS/API project work gives Nora credible cloud and technical troubleshooting language",
    ],
    strengths: ["App lifecycle", "Release/change control", "Vendor + stakeholder liaison", "Cloud APIs + databases"],
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
      "A full-stack candidate with strong React/Next.js, cloud API, Docker/Kubernetes, and QA discipline, with .NET/Azure as the main ramp-up area.",
    roleRequirements: [
      "Build with React, Next.js, .NET Core APIs, Azure Functions, Service Bus, SQL Server, and CI/CD",
      "Deliver testable, maintainable code using Docker, design patterns, regression tests, and Agile practices",
      "Work across analysis, design, coding, testing, implementation, and production support",
    ],
    fitReasons: [
      "PathwayIQ directly demonstrates React/Next.js product delivery, user flows, frontend architecture, and deployment iteration",
      "GlowCheck demonstrates serverless APIs, AWS Lambda/API Gateway, Athena/S3 data work, and sub-200ms backend responses",
      "Cloud pose recognition and QA experience add Docker/Kubernetes, performance testing, regression discipline, and defect analysis",
    ],
    strengths: ["React + Next.js", "Serverless APIs", "Docker/Kubernetes", "Testing mindset"],
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
      "A product-minded analyst who can connect customer journey insight, data pipelines, dashboards, and stakeholder storytelling.",
    roleRequirements: [
      "Turn customer/product data into insights for journey optimisation, product decisions, and commercial impact",
      "Use SQL or Python, Power BI dashboards, web analytics, and digital/offline data sources",
      "Communicate findings clearly to product, digital, and business stakeholders in an Agile environment",
    ],
    fitReasons: [
      "GlowCheck gives Python-style data pipeline evidence across S3, Lambda, Athena, APIs, and public health data",
      "PathwayIQ uses labour-market datasets and data labels to support career decision journeys",
      "Jira dashboards, HelloRide research, and FutureLab product discovery support stakeholder storytelling and product insight",
    ],
    strengths: ["Python analytics", "Customer journey insight", "Dashboard storytelling", "Product decision support"],
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
      "A data-aware digital builder who can discuss data layers, tracking quality, API validation, and customer journey analytics.",
    roleRequirements: [
      "Maintain digital data layer, tagging strategies, metrics tracking, CRO/personalisation support, and journey analytics",
      "Integrate digital and enterprise data, estimate data backlog work, and support reporting/insights teams",
      "Promote consistent data capture, evidence-based decisions, and digital data best practices",
    ],
    fitReasons: [
      "GlowCheck provides S3/Lambda/Athena pipeline evidence, API data validation, serverless backend delivery, and metrics thinking",
      "PathwayIQ shows structured data labels, public dataset integration, and product-facing data presentation",
      "QA background strengthens the case for reliable data capture, validation discipline, and regression-aware implementation",
    ],
    strengths: ["Data layer thinking", "Athena/S3 pipeline", "Metrics validation", "Journey analytics"],
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
      "A customer-facing backup role where Nora's Mandarin, research mindset, and stakeholder communication can support Box Hill community service.",
    roleRequirements: [
      "Deliver customer-first sales, needs-based product recommendations, member education, and in-store service",
      "Build community relationships and explain health insurance value clearly to diverse customers",
      "Mandarin or Cantonese is advantageous for the Box Hill customer base",
    ],
    fitReasons: [
      "Mandarin fluency and Box Hill community fit give Nora a practical advantage for customer conversations",
      "HelloRide market/user research supports needs-based questioning, customer segmentation, and value communication",
      "Finance internship accuracy and stakeholder communication experience support trustworthy, detail-oriented service",
    ],
    strengths: ["Mandarin advantage", "Needs-based advice", "Community engagement", "Customer-first communication"],
  },
];
