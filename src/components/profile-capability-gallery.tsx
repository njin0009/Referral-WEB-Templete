import type { CapabilityItem, Profile } from "@/data/site-data";
import type { Language } from "@/App";
import { LocationCard } from "@/components/ui/card-17";
import TeamShowcase from "@/components/ui/team-showcase";

type ProfileCapabilityGalleryProps = {
  language: Language;
  profile: Profile;
  technical: CapabilityItem[];
  management: CapabilityItem[];
};

const copy = {
  zh: {
    techEyebrow: "技术能力",
    techTitle: "技术能力 · 代码项目",
    techDescription: "Nora 能独立搭建产品、编写代码、设计云端数据管道并部署上线。点击卡片按钮可以打开对应项目。",
    managementEyebrow: "管理能力",
    managementTitle: "管理能力 · 国际工作经历",
    managementDescription:
      "基于 LinkedIn 经历和原始页面重新整理：澳洲本地经验、澳洲/马来西亚/英国远程协作、中国-瑞典车载交付，以及早期财务实习体现的严谨性。",
    profileKicker: "个人资料",
    profileTitleSuffix: "的能力地图",
    profileLead: "页面拆成两条主线：技术能力通过代码项目呈现，管理能力通过国际交付与产品经历呈现。",
    view: "查看",
  },
  en: {
    techEyebrow: "Technical Capability",
    techTitle: "Technical Capability · Code Projects",
    techDescription: "Nora can build products, write code, design cloud data pipelines, and deploy live projects. Use the card actions to open each project.",
    managementEyebrow: "Management Capability",
    managementTitle: "Management Capability · International Experience",
    managementDescription:
      "Reframed from LinkedIn and the original HTML: Australian local experience, Australia/Malaysia/UK remote collaboration, China-Sweden automotive delivery, plus early finance experience as evidence of discipline and accuracy.",
    profileKicker: "Profile",
    profileTitleSuffix: "'s Capability Map",
    profileLead: "The original HTML is split into two stronger narratives: technical capability through code projects, and management capability through international delivery experience.",
    view: "View",
  },
} satisfies Record<Language, Record<string, string>>;

const technicalZh: Record<string, { title?: string; category?: string; period?: string; summary: string; status?: string; points?: string[] }> = {
  "cloud-pose": {
    category: "云端 + 人工智能",
    period: "2025",
    points: ["容器化", "云端部署", "计算机视觉"],
    summary: "云端姿态识别项目，展示 Docker、Kubernetes 和云部署能力，可支撑 Nora 申请全栈软件工程岗位的叙事。",
    title: "云端姿态识别",
  },
  glowcheck: {
    category: "无服务器数据平台",
    period: "2026",
    points: ["云函数", "对象存储", "数据查询", "服务端开发"],
    status: "密码 1111",
    summary: "无服务器紫外线防晒建议平台，使用 AWS Lambda、S3、Athena 和 Node.js 构建数据分析管道，响应时间低于 200 毫秒。访问密码：1111。",
    title: "紫外线防护平台",
  },
  pathwayiq: {
    category: "产品管理 + 全栈开发",
    period: "2026 年 4 月至今",
    points: ["产品负责人", "线上项目", "前端开发"],
    status: "开发中",
    summary: "面向生产环境的 Next.js / React 产品项目，覆盖用户路径、前端体验、部署迭代和产品定位，是 Nora 展示代码能力与产品负责能力的核心案例。",
  },
  studycouch: {
    category: "全栈项目",
    period: "2026",
    points: ["全栈开发", "用户流程", "数据模型", "协作场景"],
    status: "开发中",
    summary: "学习与协作场景的全栈项目，展示 Nora 拆解用户流程、信息架构和前后端功能交付的能力。",
  },
};

function localCapability(item: CapabilityItem, language: Language) {
  const zh = technicalZh[item.id];
  if (language === "en" || !zh) {
    return item;
  }

  return {
    ...item,
    category: zh.category ?? item.category,
    period: zh.period ?? item.period,
    points: zh.points ?? item.points,
    status: zh.status ?? item.status,
    summary: zh.summary,
    title: zh.title ?? item.title,
  };
}

function CapabilityGrid({
  eyebrow,
  title,
  description,
  items,
  language,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: CapabilityItem[];
  language: Language;
}) {
  const t = copy[language];

  return (
    <div className="capability-block" id="technical-capability">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{eyebrow}</p>
        <h3 className="text-3xl font-bold tracking-tight text-foreground">{title}</h3>
        <p className="mt-3 max-w-3xl text-muted-foreground">{description}</p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2" style={{ perspective: "1000px" }}>
        {items.map((rawItem) => {
          const item = localCapability(rawItem, language);
          return (
          <LocationCard
            actionLabel={item.status ?? t.view}
            address={`${item.period} · ${item.summary}`}
            city={item.title}
            directionsUrl={item.link ?? "https://github.com/njin0009"}
            imageUrl={item.image}
            key={item.id}
          />
          );
        })}
      </div>
    </div>
  );
}

function ManagementExperience({
  items,
  language,
}: {
  items: CapabilityItem[];
  language: Language;
}) {
  const t = copy[language];

  return (
    <div className="capability-block" id="management-capability">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t.managementEyebrow}
        </p>
        <h3 className="text-3xl font-bold tracking-tight text-foreground">{t.managementTitle}</h3>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          {t.managementDescription}
        </p>
      </div>

      <TeamShowcase language={language} members={items} />
    </div>
  );
}

export default function ProfileCapabilityGallery({
  language,
  profile,
  technical,
  management,
}: ProfileCapabilityGalleryProps) {
  const t = copy[language];

  return (
    <section className="section profile-capability-section" id="profile">
      <div className="mx-auto mb-12 max-w-4xl text-center">
        <div className="section-kicker">{t.profileKicker}</div>
        <h2>{profile.name}{t.profileTitleSuffix}</h2>
        <p className="section-lead mx-auto">
          {t.profileLead}
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-14">
        <CapabilityGrid
          description={t.techDescription}
          eyebrow={t.techEyebrow}
          items={technical}
          language={language}
          title={t.techTitle}
        />
        <ManagementExperience items={management} language={language} />
      </div>
    </section>
  );
}
