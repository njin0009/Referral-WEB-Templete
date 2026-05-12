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
  visa: "6月毕业后下 485 工作签证",
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
      "生产级 Next.js / React 个人产品项目，覆盖用户路径、前端体验、部署迭代和产品定位，是 Nora code + product ownership 的核心作品。",
    points: ["Next.js", "React", "Product ownership", "Live site"],
    link: "https://iteration3.pathwayiq.me/",
    status: "开发中",
  },
  {
    id: "glowcheck",
    title: "GlowCheck / UV Aware",
    category: "Serverless Data",
    period: "2026",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    summary:
      "Serverless UV 防晒建议平台，使用 AWS Lambda + S3 + Athena + Node.js 构建数据分析管道，响应时间低于 200ms。访问密码：1111。",
    points: ["AWS Lambda", "S3", "Athena", "Node.js"],
    link: "https://uvaware.me/",
    status: "密码 1111",
  },
  {
    id: "studycouch",
    title: "StudyCouch",
    category: "Full-Stack",
    period: "2026",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    summary:
      "学习与协作场景的全栈项目，体现 Nora 对用户流程、信息架构和前后端功能拆解的实现能力。",
    points: ["Full-stack", "UX flow", "Data model", "Collaboration"],
    link: "https://rubystudycouch.pages.dev/",
    status: "开发中",
  },
  {
    id: "cloud-pose",
    title: "Cloud Pose Recognition",
    category: "Cloud + AI",
    period: "2025",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    summary:
      "云端姿态识别项目，展示 Docker / Kubernetes / 云部署能力，可支撑 Full Stack Software Engineer 岗位叙事。",
    points: ["Docker", "Kubernetes", "Cloud deployment", "Computer vision"],
    link: "https://github.com/njin0009",
  },
];

export const managementTimeline: CapabilityItem[] = [
  {
    id: "helloride",
    title: "Product Marketing Manager Intern - HelloRide",
    category: "澳洲本地经验 · Product Marketing",
    period: "Nov 2025 - Dec 2025",
    location: "Melbourne / Hybrid",
    coordinates: [-37.8136, 144.9631],
    workType: "internship",
    image: "/assets/experience/nexstar-certificates.png",
    summary:
      "HelloRide internship, Hybrid。围绕澳洲本地市场做 market / stakeholder analysis、用户细分、价值主张、产品定位和成功指标，并获得 City of Melbourne NexStar Excellence Award。",
    points: ["Market analysis", "Stakeholder alignment", "Product positioning", "NexStar Award"],
    group: "澳洲本地经验",
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
    category: "澳洲 / 马来西亚 / 英国 · Remote",
    period: "Jun 2025 - Jul 2025",
    location: "Melbourne, Australia / Remote",
    coordinates: [-37.8136, 144.9631],
    workType: "internship",
    image: "/assets/experience/teamwork-certificate.png",
    summary:
      "FutureLab.my internship, Monash x Warwick TeaMWork Virtual Internship。跨澳洲、马来西亚和英国团队，参与 full-stack solution 设计交付、产品构思、功能优先级和 stakeholder communication。",
    points: ["International teamwork", "Product ideation", "Rapid prototyping", "Agile delivery"],
    group: "澳洲 / 马来西亚 / 英国远程协作",
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
    category: "中国-瑞典经验 · Volvo / Polestar",
    period: "Jun 2023 - Jun 2024",
    location: "China / On-site",
    coordinates: [30.5928, 114.3055],
    workType: "full-time",
    image: "/assets/experience/ecarx-certificate.png",
    summary:
      "ECARX full-time Product Manager。参与 Volvo / Polestar 车载信息娱乐系统端到端交付，管理系统集成、release readiness 和跨境 stakeholder coordination。",
    points: ["Technical PM", "Release readiness", "Stakeholder management", "Python automation"],
    group: "中国-瑞典车载项目经验",
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
    category: "中国-瑞典经验 · System Integration QA",
    period: "May 2022 - May 2023",
    location: "China / On-site",
    coordinates: [30.5928, 114.3055],
    workType: "full-time",
    image: "/assets/experience/isoftstone-certificate.png",
    summary:
      "iSoftStone full-time Software Engineer in Test。为 Volvo / Polestar automotive infotainment platform 做系统级与集成测试、CAN/LIN 验证和 Python 自动化回归。",
    points: ["System testing", "CAN/LIN", "CANoe", "Python automation"],
    group: "中国-瑞典车载项目经验",
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
    category: "中国本地经验 · Finance",
    period: "Aug 2021 - Oct 2021",
    location: "China / On-site",
    coordinates: [30.5928, 114.3055],
    workType: "internship",
    image: "/assets/experience/dongfeng-internship-certificate.png",
    summary:
      "Dongfeng Motor Corporation Passenger Vehicle Company internship。支持财务部日常运营、账务核对、对账和 100+ 财务文档归档，作为早期职业纪律和准确性证明。",
    points: ["Finance accuracy", "Reconciliation", "Archive", "Documentation"],
    group: "中国本地基础经验",
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
      "13 个职位中匹配度最高。Byte Squad 需要 backlog 管理、Agile squad 领导、B2C+B2B2C 交付，和 Nora 的 ECARX PM 经历及 PathwayIQ 很贴。",
    strengths: ["PM 经历直接命中", "Backlog ownership", "Agile squad", "PMP + AWS AI"],
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
      "应用生命周期管理、供应商协调、Azure API 都在 Nora 的 Technical PM 优势区。Volvo/Polestar 与中国工程团队协作经验可迁移。",
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
      "Next.js、React、Docker/K8s 经验可以直接展示。缺口是 .NET Core，但 AWS Lambda 到 Azure Functions 的架构理解可桥接。",
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
      "与 Digital Product Manager 同属 Blua 方向。需要高级 SQL、Power BI、Adobe Analytics 和 5+ 年分析经验，可作为主投岗位的补充申请。",
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
      "如果 JD 偏 Adobe Analytics/Tealium 就谨慎；如果偏数据管道/工程，Athena + S3 pipeline 和政府数据集集成是强证据。",
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
      "Bupa 门店面对面健康险销售与留存岗，仅作备选。普通话流利在 Box Hill 的中澳社区会是真实优势。",
    strengths: ["Backup option", "Mandarin", "Customer value", "Box Hill"],
  },
];
