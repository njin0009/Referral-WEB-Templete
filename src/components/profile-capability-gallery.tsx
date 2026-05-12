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
    techEyebrow: "Technical Capability",
    techTitle: "技术能力 · Code 项目",
    techDescription: "展示 Nora 能实际搭产品、写代码、做云端数据管道和部署项目。点击卡片按钮可进入对应项目。",
    managementEyebrow: "Management Capability",
    managementTitle: "管理能力 · 国际工作经历",
    managementDescription:
      "按 LinkedIn 经历和原始 HTML 重新整理：澳洲本地经验、澳洲/马来西亚/英国远程协作、中国-瑞典车载项目经验，并补充早期财务实习作为职业纪律证明。",
    profileKicker: "Profile",
    profileTitleSuffix: "的能力拆解",
    profileLead: "按原始 HTML 重新拆成两条主线：技术能力突出 code 项目，管理能力突出国际交付与产品经验。",
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
  },
} satisfies Record<Language, Record<string, string>>;

function CapabilityGrid({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: CapabilityItem[];
}) {
  return (
    <div className="capability-block">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{eyebrow}</p>
        <h3 className="text-3xl font-bold tracking-tight text-foreground">{title}</h3>
        <p className="mt-3 max-w-3xl text-muted-foreground">{description}</p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2" style={{ perspective: "1000px" }}>
        {items.map((item) => (
          <LocationCard
            actionLabel={item.status ?? "View"}
            address={`${item.period} · ${item.summary}`}
            city={item.title}
            directionsUrl={item.link ?? "https://github.com/njin0009"}
            imageUrl={item.image}
            key={item.id}
          />
        ))}
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
    <div className="capability-block">
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
        <h2>{language === "zh" ? `${profile.name} ${t.profileTitleSuffix}` : `${profile.name}${t.profileTitleSuffix}`}</h2>
        <p className="section-lead mx-auto">
          {t.profileLead}
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-14">
        <CapabilityGrid
          description={t.techDescription}
          eyebrow={t.techEyebrow}
          items={technical}
          title={t.techTitle}
        />
        <ManagementExperience items={management} language={language} />
      </div>
    </section>
  );
}
