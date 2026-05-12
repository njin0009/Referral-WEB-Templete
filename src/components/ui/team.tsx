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
    leftCards: "向左移动职位卡片",
    nextDetail: "查看下一个职位详情",
    pdf: "下载简历",
    previousDetail: "查看上一个职位详情",
    priorityLabel: "优先投递职位：",
    resumeTitle: "Nora Jin 简历",
    rightCards: "向右移动职位卡片",
    role: "职位",
    subtitle: "点击卡片查看对应职位匹配信息。",
    title: "Nora 希望获得内推的职位",
    url: "链接",
    visaLabel: "签证",
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
    priorityLabel: "Top target roles:",
    resumeTitle: "Nora Jin Resume",
    role: "Role",
    url: "URL",
    visaLabel: "Visa",
  },
} satisfies Record<Language, Record<string, string>>;

const jobZh: Record<string, { title: string; team: string; location: string; contract: string; reason: string; strengths: string[] }> = {
  j1: {
    contract: "永久全职",
    location: "墨尔本",
    reason: "这是所有职位中匹配度最高的一个。Byte Squad 需要待办事项管理、敏捷团队协作和面向消费者/企业消费者的交付能力，这与 Nora 在 ECARX 的产品管理经历以及 PathwayIQ 产品负责经验高度契合。",
    strengths: ["直接产品管理经验", "待办事项管理", "敏捷团队协作", "项目管理与人工智能能力"],
    team: "Byte Squad / Bupa 牙科",
    title: "数字产品经理",
  },
  j2: {
    contract: "永久全职",
    location: "墨尔本",
    reason: "应用生命周期管理、供应商协调和 Azure API 工作都属于 Nora 的技术产品管理优势。她在 Volvo/Polestar 项目和中国工程团队协作中的经验可以迁移到这个岗位。",
    strengths: ["应用生命周期", "供应商协调", "上线决策", "技术产品管理"],
    team: "视光与听力应用",
    title: "技术应用负责人 - 视光与听力",
  },
  j3: {
    contract: "一年固定期限",
    location: "墨尔本",
    reason: "Nora 可以直接展示 Next.js、React、Docker 和 Kubernetes 经验。主要差距是 .NET Core，但她的 AWS Lambda 经验可以作为理解 Azure Functions 架构的桥梁。",
    strengths: ["前端框架", "界面开发", "容器与编排", "云函数"],
    team: "数字工程",
    title: "全栈软件工程师",
  },
  j4: {
    contract: "永久全职",
    location: "墨尔本",
    reason: "这个职位与数字产品经理同属 Blua 方向。它需要高级 SQL、Power BI、Adobe Analytics 和五年以上分析经验，因此更适合作为辅助投递，而不是主投职位。",
    strengths: ["数据分析", "数据管道", "产品洞察", "辅助投递"],
    team: "Blua / 产品洞察",
    title: "高级客户与产品洞察分析师",
  },
  j5: {
    contract: "固定期限",
    location: "墨尔本",
    reason: "如果职位重点偏 Adobe Analytics 或 Tealium，需要谨慎；如果重点是数据管道或数据工程，Nora 的 Athena、S3 和公共数据集成经验就是有力证据。",
    strengths: ["数据查询", "数据管道", "数据集成", "先核对职位描述"],
    team: "数字数据",
    title: "数字数据专员",
  },
  jcs1: {
    contract: "永久全职",
    location: "博士山",
    reason: "这是面向门店的健康保险销售与客户留存岗位，更适合作为备选。Nora 流利的普通话在博士山华人社区会是真实优势。",
    strengths: ["备选职位", "普通话流利", "客户价值", "博士山"],
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

export default function ReferralRoles({ jobs, language, profile }: ReferralRolesProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [selectedJob, setSelectedJob] = useState<Job>(jobs[0]);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const t = copy[language];
  const topJobs = jobs
    .filter((job) => job.priority)
    .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99))
    .slice(0, 4);

  function moveCarousel(direction: "left" | "right") {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    setIsManuallyPaused(true);
    rail.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
    window.setTimeout(() => setIsManuallyPaused(false), 3000);
  }

  function showJobDetail(job: Job) {
    setSelectedJob(job);
    window.setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  }

  function stepSelectedJob(direction: "previous" | "next") {
    const currentIndex = jobs.findIndex((job) => job.id === selectedJob.id);
    const fallbackIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex =
      direction === "previous"
        ? (fallbackIndex - 1 + jobs.length) % jobs.length
        : (fallbackIndex + 1) % jobs.length;
    showJobDetail(jobs[nextIndex]);
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

  async function downloadRoleZip(job: Job) {
    const zip = new JSZip();
    const roleSlug = safeFilePart(job.title);
    zip.file(`nora-${roleSlug}-resume.pdf`, createRolePdfBlob(job, "resume"));
    zip.file(`nora-${roleSlug}-cover-letter.pdf`, createRolePdfBlob(job, "cover-letter"));

    const blob = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `nora-${roleSlug}-application-pack.zip`;
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

          <div className="job-carousel" ref={railRef}>
            <div className={`job-carousel-track ${isManuallyPaused ? "is-paused" : ""}`}>
              {[...jobs, ...jobs].map((rawJob, index) => {
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

        <div className="job-detail-panel mx-auto mt-12 max-w-5xl px-6 lg:px-0" ref={detailRef}>
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
            <div className="grid gap-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-left shadow-sm md:grid-cols-[0.9fr_1.1fr]">
              <div className="overflow-hidden rounded-xl bg-neutral-200">
                <img alt={selectedJob.title} className="h-full min-h-72 w-full object-cover" src={selectedJob.image} />
              </div>
              <div>
                {(() => {
                  const selected = localJob(selectedJob, language);

                  return (
                    <>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                  {selectedJob.jobNumber} · {selectedJob.fit}% {t.fit} · {t.closeDate} {selectedJob.closeDate}
                </p>
                <h2 className="mb-3 text-3xl font-semibold leading-tight text-neutral-950">{selected.title}</h2>
                <p className="mb-4 text-neutral-600">
                  {selected.team} · {selected.location} · {selected.contract}
                </p>
                <a
                  className="mb-6 inline-flex max-w-full items-center gap-2 break-all text-sm font-semibold text-neutral-900 underline underline-offset-4"
                  href={selectedJob.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" />
                  {selectedJob.url}
                </a>
                <p className="mb-5 leading-relaxed text-neutral-700">{selected.reason}</p>
                <div className="mb-6">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">{t.keyPoints}</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.strengths.map((point) => (
                      <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-neutral-800 ring-1 ring-neutral-200" key={point}>
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="download-action" onClick={() => downloadRolePdf(selectedJob, "resume")} type="button">
                    <Download className="h-4 w-4" />
                    {t.pdf}
                  </button>
                  <button className="download-action download-action-outline" onClick={() => downloadRolePdf(selectedJob, "cover-letter")} type="button">
                    <Download className="h-4 w-4" />
                    {t.coverLetter}
                  </button>
                  <button className="download-action download-action-outline" onClick={() => void downloadRoleZip(selectedJob)} type="button">
                    <Download className="h-4 w-4" />
                    {t.allZip}
                  </button>
                </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-3xl px-6 text-center lg:px-0">
          <div className="priority-role-row mb-8 text-lg font-medium leading-relaxed text-neutral-900 md:text-xl">
            <span className="priority-role-label">{t.priorityLabel}</span>
            {topJobs.map((rawJob, index) => {
              const job = localJob(rawJob, language);

              return (
              <button
                className="priority-role-button"
                key={job.id}
                onClick={() => showJobDetail(rawJob)}
                type="button"
              >
                {index + 1}.{" "}
                {job.title}
              </button>
              );
            })}
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
