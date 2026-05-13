import { useRef, useState } from "react";
import JSZip from "jszip";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  BadgeInfo,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

import type { Job, Profile } from "@/data/site-data";
import type { Language } from "@/App";

const noraAvatar = "/assets/nora-portrait.png";
const bupaLogo = "/assets/bupa-logo.svg";

type ReferralRolesProps = {
  jobs: Job[];
  language: Language;
  profile: Profile;
};

const copy = {
  zh: {
    allZip: "一键下载压缩包",
    closeDate: "截止",
    coverLetter: "下载求职信",
    coverLetterTitle: "Nora Jin 求职信",
    fit: "匹配",
    job: "职位编号",
    keyPoints: "Nora 适合这个职位的关键点",
    noraMatch: "Nora 适合的原因",
    referralAngle: "推荐角度",
    requirements: "职位要求关键词",
    leftCards: "向左移动职位卡片",
    nextDetail: "查看下一个职位详情",
    pdf: "下载简历",
    previousDetail: "查看上一个职位详情",
    priorityLabel: "优先投递职位：",
    techRoles: "技术与产品方向",
    customerServiceRoles: "客户服务方向",
    resumeTitle: "Nora Jin 简历",
    rightCards: "向右移动职位卡片",
    role: "职位",
    subtitle: "点击卡片查看对应职位匹配信息。",
    title: "Nora 希望获得内推的职位",
    url: "链接",
    openRole: "打开 BUPA 职位",
    visaLabel: "签证",
    rolePosition: "职位",
  },
  en: {
    allZip: "Download All as ZIP",
    coverLetter: "Download Cover Letter",
    coverLetterTitle: "Nora Jin Cover Letter",
    fit: "fit",
    job: "Job",
    title: "Roles Nora Hopes to Be Referred For",
    subtitle: "Click a card to view the matching role details.",
    leftCards: "Move role cards left",
    rightCards: "Move role cards right",
    closeDate: "Closes",
    previousDetail: "Show previous role detail",
    nextDetail: "Show next role detail",
    pdf: "Download Resume",
    keyPoints: "Why Nora fits this role",
    noraMatch: "Why Nora fits",
    referralAngle: "Referral angle",
    requirements: "Role requirements",
    priorityLabel: "Top target roles:",
    techRoles: "Tech and product",
    customerServiceRoles: "Customer service",
    resumeTitle: "Nora Jin Resume",
    role: "Role",
    url: "URL",
    openRole: "Open BUPA role",
    visaLabel: "Visa",
    rolePosition: "Role",
  },
} satisfies Record<Language, Record<string, string>>;

const jobZh: Record<string, { title: string; team: string; location: string; contract: string; reason: string; roleRequirements: string[]; fitReasons: string[]; strengths: string[] }> = {
  j1: {
    contract: "永久全职",
    location: "墨尔本",
    reason: "Nora 能把客户旅程转化为可交付的数字产品，同时也能和工程、测试、业务团队顺畅沟通。",
    roleRequirements: [
      "负责数字产品路线图、用户发现、预约路径和优先级 backlog",
      "带动产品、设计、工程、测试和业务团队完成敏捷小队交付",
      "用数据分析、实验和客户洞察提升数字体验与业务结果",
    ],
    fitReasons: [
      "ECARX 经历覆盖产品路线图、Go/No-Go 发布门、Jira 仪表盘和 Volvo/Polestar 跨职能交付",
      "PathwayIQ 与 GlowCheck 展示了用户旅程、前端体验、API 和部署迭代的产品负责能力",
      "HelloRide 提供澳洲市场研究、利益相关方分析、价值主张和产品定位证据",
    ],
    strengths: ["产品路线图", "用户发现与 Backlog", "敏捷小队交付", "数据分析与实验"],
    team: "Byte Squad / Bupa 牙科",
    title: "数字产品经理",
  },
  j2: {
    contract: "永久全职",
    location: "墨尔本",
    reason: "Nora 是带技术背景的产品/应用负责人，能覆盖发布准备、供应商协调和系统集成沟通。",
    roleRequirements: [
      "管理应用生命周期、发布/变更控制、支持、监控和持续改进",
      "协调业务方、IT、供应商/MSP、云 API 和关系型数据平台",
      "保证企业应用可靠、安全、合规，并与业务服务目标一致",
    ],
    fitReasons: [
      "ECARX 经历覆盖发布准备、系统集成、Go/No-Go 上线门、问题分诊和交付治理",
      "Volvo/Polestar 项目证明 Nora 能协调工程、产品、QA 和跨国团队",
      "Python/Linux 自动化与 AWS/API 项目让她具备可信的云端和技术排障表达",
    ],
    strengths: ["应用生命周期", "发布与变更管理", "供应商与业务沟通", "云 API 与数据库"],
    team: "视光与听力应用",
    title: "技术应用负责人 - 视光与听力",
  },
  j3: {
    contract: "一年固定期限",
    location: "墨尔本",
    reason: "Nora 已具备 React/Next.js、云 API、Docker/Kubernetes 和 QA 质量意识，.NET/Azure 是主要学习补齐项。",
    roleRequirements: [
      "使用 React、Next.js、.NET Core API、Azure Functions、Service Bus、SQL Server 和 CI/CD",
      "用 Docker、设计模式、回归测试和敏捷实践交付可维护代码",
      "参与分析、设计、编码、测试、上线和生产支持",
    ],
    fitReasons: [
      "PathwayIQ 直接证明 React/Next.js 产品交付、用户流程、前端架构和部署迭代",
      "GlowCheck 证明 serverless API、AWS Lambda/API Gateway、Athena/S3 数据能力和低延迟后端",
      "云端姿态识别与 QA 经历补充 Docker/Kubernetes、性能测试、回归测试和缺陷分析能力",
    ],
    strengths: ["React 与 Next.js", "Serverless API", "Docker/Kubernetes", "测试思维"],
    team: "数字工程",
    title: "全栈软件工程师",
  },
  j4: {
    contract: "永久全职",
    location: "墨尔本",
    reason: "Nora 是偏产品思维的数据分析候选人，能把用户旅程洞察、数据管道、仪表盘和业务沟通连起来。",
    roleRequirements: [
      "把客户/产品数据转化为用户旅程优化、产品决策和商业影响洞察",
      "使用 SQL 或 Python、Power BI、网页分析和线上/线下数据源",
      "在敏捷环境中向产品、数字和业务方清晰表达分析结论",
    ],
    fitReasons: [
      "GlowCheck 提供 S3、Lambda、Athena、API 和公共健康数据的数据管道证据",
      "PathwayIQ 使用劳动力市场数据集和数据标签支持职业决策旅程",
      "Jira 仪表盘、HelloRide 研究和 FutureLab 产品发现经历支持洞察表达和利益相关方沟通",
    ],
    strengths: ["Python 分析", "用户旅程洞察", "仪表盘表达", "产品决策支持"],
    team: "Blua / 产品洞察",
    title: "高级客户与产品洞察分析师",
  },
  j5: {
    contract: "固定期限",
    location: "墨尔本",
    reason: "Nora 是懂数据质量和数字产品的技术候选人，可以讨论数据层、追踪质量、API 校验和用户旅程分析。",
    roleRequirements: [
      "维护数字数据层、tagging 策略、指标追踪、CRO/个性化支持和用户旅程分析",
      "整合数字与企业数据，评估数据 backlog，并支持 reporting/insights 团队",
      "推动稳定数据采集、证据驱动决策和数字数据最佳实践",
    ],
    fitReasons: [
      "GlowCheck 提供 S3/Lambda/Athena 管道、API 数据校验、serverless 后端和指标思维证据",
      "PathwayIQ 展示结构化数据标签、公共数据集成和面向产品的数据呈现",
      "QA 背景强化了稳定数据采集、验证纪律和回归意识",
    ],
    strengths: ["数据层思维", "Athena/S3 管道", "指标校验", "旅程分析"],
    team: "数字数据",
    title: "数字数据专员",
  },
  jcs1: {
    contract: "永久全职",
    location: "博士山",
    reason: "这是客户服务方向的备选职位，Nora 的普通话、研究能力和沟通能力可以服务博士山本地社区。",
    roleRequirements: [
      "完成客户优先销售、基于需求的产品推荐、会员教育和门店服务",
      "建立社区关系，并向不同背景客户清晰解释健康保险价值",
      "普通话或粤语对博士山客户群是加分项",
    ],
    fitReasons: [
      "普通话能力和博士山社区匹配能帮助 Nora 进行真实有效的客户沟通",
      "HelloRide 市场/用户研究支持需求挖掘、客户分层和价值表达",
      "财务实习的准确性和利益相关方沟通经验支持可靠、细致的服务形象",
    ],
    strengths: ["普通话优势", "需求式推荐", "社区沟通", "客户优先沟通"],
    team: "零售健康保险",
    title: "客户价值专员 - 博士山",
  },
};

function localJob(job: Job, language: Language) {
  const zh = jobZh[job.id];
  return language === "zh" && zh ? { ...job, ...zh } : job;
}

function localVisa(profile: Profile, language: Language) {
  return language === "zh" ? "6 月毕业后可申请 485 毕业生工作签证。" : profile.visa;
}

const highlightTerms = {
  zh: [
    "产品路线图",
    "用户发现",
    "预约路径",
    "Backlog",
    "敏捷",
    "数据分析",
    "应用生命周期",
    "发布",
    "变更",
    "供应商",
    "业务方",
    "云 API",
    "React",
    "Next.js",
    ".NET",
    "Azure",
    "CI/CD",
    "Docker",
    "Kubernetes",
    "回归测试",
    "客户",
    "产品洞察",
    "Python",
    "Power BI",
    "用户旅程",
    "Athena",
    "Lambda",
    "S3",
    "普通话",
    "博士山",
    "需求",
    "社区",
  ],
  en: [
    "roadmap",
    "discovery",
    "booking pathways",
    "prioritised backlog",
    "Agile",
    "squad delivery",
    "analytics",
    "experimentation",
    "application lifecycle",
    "release",
    "change control",
    "vendor",
    "stakeholder",
    "cloud APIs",
    "relational data",
    "React",
    "Next.js",
    ".NET Core",
    "Azure Functions",
    "Service Bus",
    "SQL Server",
    "CI/CD",
    "Docker",
    "Kubernetes",
    "regression",
    "customer",
    "product insights",
    "SQL",
    "Python",
    "Power BI",
    "journey",
    "data layer",
    "tagging",
    "CRO",
    "Athena",
    "Lambda",
    "S3",
    "Mandarin",
    "Box Hill",
    "community",
  ],
} satisfies Record<Language, string[]>;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderHighlightedText(text: string, language: Language) {
  const terms = highlightTerms[language].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, language === "en" ? "gi" : "g");

  return text.split(pattern).map((part, index) => {
    const isMatch = terms.some((term) =>
      language === "en" ? term.toLowerCase() === part.toLowerCase() : term === part,
    );

    return isMatch ? (
      <strong className="font-semibold text-neutral-950" key={`${part}-${index}`}>
        {part}
      </strong>
    ) : (
      part
    );
  });
}

function getMatchCategory(jobId: string, index: number): "technical" | "management" {
  const technicalMap: Record<string, number[]> = {
    j2: [1],
    j3: [0, 1, 2],
    j4: [1],
    j5: [0, 1, 2],
  };

  return technicalMap[jobId]?.includes(index) ? "technical" : "management";
}

function scrollToCapability(category: "technical" | "management") {
  const targetId = category === "technical" ? "technical-capability" : "management-capability";
  document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ReferralRoles({ jobs, language, profile }: ReferralRolesProps) {
  const detailRef = useRef<HTMLDivElement>(null);
  const [selectedJob, setSelectedJob] = useState<Job>(jobs[0]);
  const [carouselDirection, setCarouselDirection] = useState<"left" | "right">("right");
  const [activeMatchIndex, setActiveMatchIndex] = useState<number | null>(null);
  const t = copy[language];
  const recommendedTechJobs = ["j1", "j2", "j3", "j4", "j5"]
    .map((id) => jobs.find((job) => job.id === id))
    .filter((job): job is Job => Boolean(job));
  const recommendedCustomerJobs = ["jcs1"]
    .map((id) => jobs.find((job) => job.id === id))
    .filter((job): job is Job => Boolean(job));
  const selectedJobIndex = Math.max(0, jobs.findIndex((job) => job.id === selectedJob.id));
  const carouselJobs = [...jobs, ...jobs, ...jobs, ...jobs];

  function moveCarousel(direction: "left" | "right") {
    setCarouselDirection(direction);
  }

  function showJobDetail(job: Job, shouldScroll = true) {
    setSelectedJob(job);
    if (shouldScroll) {
      window.setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 0);
    }
  }

  function stepSelectedJob(direction: "previous" | "next") {
    const currentIndex = jobs.findIndex((job) => job.id === selectedJob.id);
    const fallbackIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex =
      direction === "previous"
        ? (fallbackIndex - 1 + jobs.length) % jobs.length
        : (fallbackIndex + 1) % jobs.length;
    showJobDetail(jobs[nextIndex], false);
  }

  function safeFilePart(value: string) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function createRolePdfBlob(job: Job, kind: "resume" | "cover-letter") {
    const local = localJob(job, language);
    const title = kind === "resume" ? t.resumeTitle : t.coverLetterTitle;
    const pdf = [
      "%PDF-1.4",
      "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
      "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
      "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj",
      `4 0 obj << /Length 260 >> stream
BT
/F1 18 Tf
72 720 Td
(${title}) Tj
/F1 11 Tf
0 -32 Td
(${t.role}: ${local.title.replace(/[()]/g, "")}) Tj
0 -20 Td
(${t.job}: ${job.jobNumber} | ${job.fit}% ${t.fit} | ${t.closeDate}: ${job.closeDate}) Tj
0 -20 Td
(${t.url}: ${job.url.replace(/[()]/g, "")}) Tj
0 -28 Td
(${t.keyPoints}: ${local.strengths.join(", ").replace(/[()]/g, "")}) Tj
ET
endstream endobj`,
      "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj",
      "xref",
      "0 6",
      "0000000000 65535 f ",
      "trailer << /Root 1 0 R /Size 6 >>",
      "startxref",
      "0",
      "%%EOF",
    ].join("\n");
    return new Blob([pdf], { type: "application/pdf" });
  }

  function downloadRolePdf(job: Job, kind: "resume" | "cover-letter") {
    const filename = `nora-${safeFilePart(job.title)}-${kind}.pdf`;
    const blob = createRolePdfBlob(job, kind);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  async function downloadAllRolesZip() {
    const zip = new JSZip();

    jobs.forEach((job) => {
      const local = localJob(job, language);
      const roleSlug = safeFilePart(local.title);
      const folder = zip.folder(`${job.jobNumber.replace("#", "")}-${roleSlug}`);
      folder?.file(`nora-${roleSlug}-resume.pdf`, createRolePdfBlob(job, "resume"));
      folder?.file(`nora-${roleSlug}-cover-letter.pdf`, createRolePdfBlob(job, "cover-letter"));
    });

    const blob = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "nora-all-bupa-application-packs.zip";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 md:py-24" id="jobs">
      <svg
        aria-hidden="true"
        className="absolute bottom-0 right-0 text-neutral-200"
        fill="none"
        height="154"
        viewBox="0 0 460 154"
        width="460"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_referral_roles)">
          <path
            d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="40"
          />
        </g>
        <defs>
          <clipPath id="clip0_referral_roles">
            <rect fill="white" height="154" width="460" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-16 flex max-w-5xl flex-col items-center px-6 text-center lg:px-0">
          <div className="mb-6 flex h-16 w-28 items-center justify-center overflow-hidden rounded-xl bg-[#0086C9] shadow-sm">
            <img alt="Bupa" className="h-full w-full object-cover" src={bupaLogo} />
          </div>

          <h1 className="relative mb-4 font-medium text-4xl tracking-tight text-neutral-900 sm:text-5xl">
            {t.title}
            <svg
              aria-hidden="true"
              className="absolute -right-8 -top-2 -z-10 w-24 text-neutral-200"
              fill="currentColor"
              height="86"
              viewBox="0 0 108 86"
              width="108"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="28"
              />
            </svg>
          </h1>
          <p className="max-w-2xl text-neutral-600">{t.subtitle}</p>
        </div>

        <div className="relative w-full">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent md:w-32" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent md:w-32" />

          <button
            aria-label={t.leftCards}
            className="carousel-control carousel-control-left"
            onClick={() => moveCarousel("left")}
            type="button"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            aria-label={t.rightCards}
            className="carousel-control carousel-control-right"
            onClick={() => moveCarousel("right")}
            type="button"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="job-carousel">
            <div className={`job-carousel-track ${carouselDirection === "left" ? "is-reverse" : ""}`}>
              {carouselJobs.map((rawJob, index) => {
                const job = localJob(rawJob, language);

                return (
                <button
                  className="group flex w-64 shrink-0 flex-col text-left no-underline"
                  key={`${job.id}-${index}`}
                  onClick={() => showJobDetail(rawJob)}
                  type="button"
                >
                  <div className="relative h-[23rem] w-full overflow-hidden rounded-2xl bg-neutral-100">
                    <img
                      alt={job.title}
                      className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
                      src={job.image}
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-900">
                      {job.fit}% {t.fit}
                    </div>
                    <div className="absolute bottom-0 w-full rounded-lg bg-neutral-100/90 p-3 backdrop-blur">
                      <h3 className="text-base font-semibold leading-tight text-neutral-900">{job.title}</h3>
                      <p className="mt-1 text-sm text-neutral-600">
                        {job.jobNumber} · {job.contract}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-neutral-500">{t.closeDate} {job.closeDate}</p>
                    </div>
                  </div>
                </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="job-detail-panel mx-auto mt-10 max-w-7xl px-6 lg:px-8" ref={detailRef}>
          <div className="relative">
            <button
              aria-label={t.previousDetail}
              className="detail-carousel-control detail-carousel-control-left"
              onClick={() => stepSelectedJob("previous")}
              type="button"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label={t.nextDetail}
              className="detail-carousel-control detail-carousel-control-right"
              onClick={() => stepSelectedJob("next")}
              type="button"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="role-detail-card grid gap-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-left shadow-sm lg:h-[640px] lg:grid-cols-[0.9fr_1.45fr] xl:h-[600px]">
              <div className="role-detail-media">
                <div className="role-detail-image overflow-hidden rounded-xl bg-neutral-50">
                  <img alt={selectedJob.title} className="max-h-full w-full object-contain" src={selectedJob.image} />
                </div>
                <div className="role-download-panel flex flex-wrap justify-center gap-3">
                  <button className="download-action" onClick={() => downloadRolePdf(selectedJob, "resume")} type="button">
                    <Download className="h-4 w-4" />
                    {t.pdf}
                  </button>
                  <button className="download-action download-action-outline" onClick={() => downloadRolePdf(selectedJob, "cover-letter")} type="button">
                    <Download className="h-4 w-4" />
                    {t.coverLetter}
                  </button>
                  <button className="download-action download-action-outline" onClick={() => void downloadAllRolesZip()} type="button">
                    <Download className="h-4 w-4" />
                    {t.allZip}
                  </button>
                </div>
              </div>
              <div className="role-detail-content">
                {(() => {
                  const selected = localJob(selectedJob, language);

                  return (
                    <>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  {selectedJob.jobNumber} · {selectedJob.fit}% {t.fit} · {t.closeDate} {selectedJob.closeDate}
                </p>
                <h2 className="mb-2 text-2xl font-semibold leading-tight text-neutral-950 md:text-[2rem]">{selected.title}</h2>
                <p className="mb-3 text-sm text-neutral-600 md:text-base">
                  {selected.team} · {selected.location} · {selected.contract}
                </p>
                <a
                  className="mb-4 inline-flex max-w-full items-center gap-2 truncate text-xs font-semibold text-neutral-900 underline underline-offset-4 md:text-sm"
                  href={selectedJob.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" />
                  {t.openRole}
                </a>
                <div className="mb-4 rounded-xl border border-neutral-200 bg-white p-3.5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">{t.referralAngle}</p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-800 md:text-[15px]">
                    {renderHighlightedText(selected.reason, language)}
                  </p>
                </div>
                <div className="mb-4 grid gap-3 lg:grid-cols-2">
                  <div className="role-match-box rounded-xl border border-neutral-200 bg-white p-3.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">{t.requirements}</p>
                    <ul className="mt-2.5 space-y-2">
                      {selected.roleRequirements.map((item, index) => (
                        <li
                          className={`match-row flex gap-2.5 text-[13px] leading-snug text-neutral-700 md:text-sm ${activeMatchIndex === index ? "is-active" : ""}`}
                          key={item}
                          onClick={() => scrollToCapability(getMatchCategory(selectedJob.id, index))}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              scrollToCapability(getMatchCategory(selectedJob.id, index));
                            }
                          }}
                          onMouseEnter={() => setActiveMatchIndex(index)}
                          onMouseLeave={() => setActiveMatchIndex(null)}
                          role="button"
                          tabIndex={0}
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-950" />
                          <span>{renderHighlightedText(item, language)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="role-match-box rounded-xl border border-neutral-200 bg-white p-3.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">{t.noraMatch}</p>
                    <ul className="mt-2.5 space-y-2">
                      {selected.fitReasons.map((item, index) => (
                        <li
                          className={`match-row match-row-blue flex gap-2.5 text-[13px] leading-snug text-neutral-700 md:text-sm ${activeMatchIndex === index ? "is-active" : ""}`}
                          key={item}
                          onClick={() => scrollToCapability(getMatchCategory(selectedJob.id, index))}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              scrollToCapability(getMatchCategory(selectedJob.id, index));
                            }
                          }}
                          onMouseEnter={() => setActiveMatchIndex(index)}
                          onMouseLeave={() => setActiveMatchIndex(null)}
                          role="button"
                          tabIndex={0}
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0086C9]" />
                          <span>{renderHighlightedText(item, language)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">{t.keyPoints}</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.strengths.map((point) => (
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-800 ring-1 ring-neutral-200 md:text-sm" key={point}>
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
                    </>
                  );
                })()}
              </div>
            </div>
            <div className="job-detail-dots" aria-label="Role position">
              {jobs.map((job, index) => {
                const isActive = index === selectedJobIndex;
                const local = localJob(job, language);

                return (
                  <button
                    aria-label={`${t.rolePosition} ${index + 1}: ${local.title}`}
                    aria-current={isActive ? "step" : undefined}
                    className={`job-detail-dot ${isActive ? "is-active" : ""}`}
                    key={job.id}
                    onClick={() => showJobDetail(job, false)}
                    title={`${index + 1}. ${local.title}`}
                    type="button"
                  >
                    <span>{index + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-5xl px-6 text-center lg:px-0">
          <div className="mb-8 grid gap-5 text-neutral-900">
            <h3 className="text-2xl font-semibold">{t.priorityLabel}</h3>
            <div className="priority-role-group">
              <span className="priority-role-label">{t.techRoles}</span>
              <div className="priority-role-buttons">
                {recommendedTechJobs.map((rawJob, index) => {
                  const job = localJob(rawJob, language);

                  return (
                    <button
                      className="priority-role-button"
                      key={job.id}
                      onClick={() => showJobDetail(rawJob)}
                      type="button"
                    >
                      {index + 1}. {job.title}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="priority-role-group">
              <span className="priority-role-label">{t.customerServiceRoles}</span>
              <div className="priority-role-buttons">
                {recommendedCustomerJobs.map((rawJob, index) => {
                  const job = localJob(rawJob, language);

                  return (
                    <button
                      className="priority-role-button"
                      key={job.id}
                      onClick={() => showJobDetail(rawJob)}
                      type="button"
                    >
                      {index + 1}. {job.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <a
              aria-label="Open Nora LinkedIn"
              className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-neutral-900 ring-offset-4"
              href="https://www.linkedin.com/in/norajin-it"
              rel="noreferrer"
              target="_blank"
            >
              <img alt="Nora Jin" className="h-full w-full object-cover" src={noraAvatar} />
            </a>
            <div className="text-center">
              <p className="font-semibold text-neutral-900">Nora Jin</p>
              <div className="mt-2 flex items-center justify-center gap-3 text-sm font-semibold">
                <a
                  className="inline-flex items-center gap-1 text-neutral-700 hover:text-neutral-950"
                  href="https://www.linkedin.com/in/norajin-it"
                  rel="noreferrer"
                  target="_blank"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  className="inline-flex items-center gap-1 text-neutral-700 hover:text-neutral-950"
                  href="https://github.com/njin0009"
                  rel="noreferrer"
                  target="_blank"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
              <div className="mt-4 grid gap-2 text-sm font-semibold text-neutral-700">
                <a className="inline-flex items-center justify-center gap-2 hover:text-neutral-950" href={`mailto:${profile.email}`}>
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </a>
                <p className="m-0 inline-flex items-center justify-center gap-2">
                  <BadgeInfo className="h-4 w-4" />
                  {t.visaLabel}: {localVisa(profile, language)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
