import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { CapabilityItem } from "@/data/site-data";
import type { Language } from "@/App";
import { GlobePolaroids, type PolaroidMarker } from "@/components/ui/cobe-globe-polaroids";
import { cn } from "@/lib/utils";
import TimelineRail, { type TimelineItem } from "@/components/ui/timeline-rail";

interface TeamShowcaseProps {
  focusId?: string | null;
  language: Language;
  members: CapabilityItem[];
}

const copy = {
  zh: {
    detailFallback: "项目与经历证明",
    details: "详细经历",
    fullTime: "正式工作",
    internship: "实习",
  },
  en: {
    detailFallback: "Project and experience evidence",
    fullTime: "Full-time",
    internship: "Internship",
    details: "Detailed Experience",
  },
} satisfies Record<Language, Record<string, string>>;

const managementZh: Record<string, {
  title: string;
  group: string;
  period: string;
  location: string;
  summary: string;
  detailTitle: string;
  details: string[];
  points: string[];
}> = {
  dongfeng: {
    detailTitle: "东风汽车实习证明",
    details: [
      "2021 年 8 月至 2021 年 10 月 · 3 个月 · 中国 · 现场办公",
      "支持东风汽车财务部日常运营。",
      "负责账务核对与对账，确保财务数据准确。",
      "整理并归档 100 多份财务文件，提升资料可追溯性。",
      "在实习中体现了协作意识、细致度和稳定的职业纪律。",
      "能力：账务核对、文档管理、财务准确性、归档规范。",
    ],
    group: "中国本地基础经验",
    location: "中国 / 现场办公",
    period: "2021 年 8 月至 2021 年 10 月",
    points: ["财务准确性", "对账", "归档", "文档管理"],
    summary: "东风汽车乘用车公司实习经历。Nora 支持财务部日常运营、账务核对、对账和 100 多份财务文档归档，体现早期职业纪律和准确性。",
    title: "会计助理实习生 - 东风汽车",
  },
  ecarx: {
    detailTitle: "高级产品开发工程师 | 系统集成与交付 | ECARX",
    details: [
      "2023 年 6 月至 2024 年 6 月 · 1 年 1 个月 · 中国 · 现场办公",
      "参与 ECARX 面向 Volvo 和 Polestar 的车载信息娱乐系统端到端交付。",
      "管理系统集成、发布准备和跨境团队的利益相关方协调。",
      "支持问题解决、技术流程对齐和工程团队之间的交付排期。",
      "通过 Python 自动化提升效率，并通过系统级验证保障产品质量。",
      "能力：技术产品管理、利益相关方管理、系统集成、交付治理。",
    ],
    group: "中国-瑞典车载交付经验",
    location: "中国 / 现场办公",
    period: "2023 年 6 月至 2024 年 6 月",
    points: ["技术产品管理", "发布准备", "利益相关方管理", "自动化脚本"],
    summary: "ECARX 全职产品经理经历。Nora 参与 Volvo / Polestar 车载信息娱乐系统端到端交付，管理系统集成、发布准备和跨境利益相关方协调。",
    title: "产品经理 - ECARX",
  },
  futurelab: {
    detailTitle: "TeaMWork 虚拟实习证书 - FutureLab",
    details: [
      "2025 年 6 月至 2025 年 7 月 · 2 个月 · 墨尔本 · 远程",
      "在跨职能国际团队中协作设计并交付全栈解决方案。",
      "参与产品构思和功能优先级排序，确保项目目标落地。",
      "提升产品思维、快速原型、利益相关方沟通和敏捷协作能力。",
      "完成 FutureLab 与 Monash University、University of Warwick 合作的 TeaMWork 虚拟实习项目。",
      "能力：数字产品开发、敏捷方法、团队协作、利益相关方沟通。",
    ],
    group: "澳洲 / 马来西亚 / 英国远程协作",
    location: "墨尔本 / 远程",
    period: "2025 年 6 月至 2025 年 7 月",
    points: ["国际团队协作", "产品构思", "快速原型", "敏捷交付"],
    summary: "FutureLab.my 实习经历，来自 Monash x Warwick TeaMWork 虚拟实习项目。Nora 跨澳洲、马来西亚和英国协作，参与全栈方案设计、产品构思、功能优先级和利益相关方沟通。",
    title: "产品与技术实习生 - FutureLab",
  },
  helloride: {
    detailTitle: "NexStar 卓越奖获得者 | 墨尔本市",
    details: [
      "2025 年 11 月至 2025 年 12 月 · 2 个月 · 混合办公",
      "进行市场和利益相关方分析，识别用户细分和价值主张。",
      "制定产品定位和建议，并因项目影响力获得 NexStar 卓越奖。",
      "梳理数字导师平台的用户旅程和成功指标，优化产品优先级。",
      "引入结构化规划模型，提升交付清晰度和利益相关方对齐效率。",
      "能力：技术产品管理、产品策略、利益相关方沟通、产品定位。",
    ],
    group: "澳洲本地经验",
    location: "墨尔本 / 混合办公",
    period: "2025 年 11 月至 2025 年 12 月",
    points: ["市场分析", "利益相关方对齐", "产品定位", "NexStar 奖项"],
    summary: "HelloRide 混合办公实习经历。Nora 围绕澳洲本地市场进行市场与利益相关方分析、用户细分、价值主张、产品定位和成功指标设计，并获得墨尔本市 NexStar 卓越奖。",
    title: "产品营销经理实习生 - HelloRide",
  },
  isoftstone: {
    detailTitle: "离职证明 | 软通动力",
    details: [
      "2022 年 5 月至 2023 年 5 月 · 1 年 1 个月 · 中国 · 现场办公",
      "为企业软件和汽车系统设计并执行系统级和集成测试用例，覆盖率接近 100%。",
      "使用 CANoe 和 Simulation Box 验证 CAN/LIN 通信协议合规性。",
      "在 Linux 环境开发 Python 自动化脚本，提高多模块回归测试效率。",
      "支持 Volvo 和 Polestar 项目，并与中国-瑞典跨境团队对齐集成问题和交付时间。",
      "能力：系统级验证、协议验证、Python 自动化、发布质量。",
    ],
    group: "中国-瑞典车载交付经验",
    location: "中国 / 现场办公",
    period: "2022 年 5 月至 2023 年 5 月",
    points: ["系统测试", "车载通信协议", "测试工具", "自动化脚本"],
    summary: "软通动力全职测试工程师经历。Nora 为 Volvo / Polestar 车载信息娱乐平台提供系统级与集成测试、CAN/LIN 验证和 Python 自动化回归支持。",
    title: "软件测试工程师 - Volvo V216",
  },
};

function localMember(member: CapabilityItem, language: Language) {
  const zh = managementZh[member.id];
  return language === "zh" && zh ? { ...member, ...zh } : member;
}

export default function TeamShowcase({ focusId, language, members }: TeamShowcaseProps) {
  const [activeId, setActiveId] = useState(members[0]?.id ?? "");
  const [isGlobeLocked, setIsGlobeLocked] = useState(false);
  const [isEvidenceTranslated, setIsEvidenceTranslated] = useState(false);
  const unlockTimerRef = useRef<number | null>(null);
  const t = copy[language];

  if (members.length === 0) {
    return null;
  }

  const activeRawMember = members.find((member) => member.id === activeId) ?? members[0];
  const activeMember = localMember(activeRawMember, language);
  const timelineMembers = [...members].reverse();
  const activeIndex = timelineMembers.findIndex((member) => member.id === activeRawMember.id);
  const evidenceTranslation = activeRawMember.evidenceTranslation;

  useEffect(() => {
    return () => {
      if (unlockTimerRef.current) {
        window.clearTimeout(unlockTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!focusId || !members.some((member) => member.id === focusId)) {
      return;
    }

    setActiveId(focusId);
    setIsEvidenceTranslated(false);
    setIsGlobeLocked(true);
  }, [focusId, members]);

  function selectMember(id: string, lockGlobe = true) {
    setActiveId(id);
    setIsEvidenceTranslated(false);

    if (!lockGlobe) {
      return;
    }

    setIsGlobeLocked(true);
    if (unlockTimerRef.current) {
      window.clearTimeout(unlockTimerRef.current);
    }
    unlockTimerRef.current = window.setTimeout(() => {
      setIsGlobeLocked(false);
      unlockTimerRef.current = null;
    }, 50000);
  }

  function stepMember(direction: "previous" | "next") {
    const currentIndex = activeIndex === -1 ? 0 : activeIndex;
    const nextIndex =
      direction === "previous"
        ? (currentIndex - 1 + timelineMembers.length) % timelineMembers.length
        : (currentIndex + 1) % timelineMembers.length;
    selectMember(timelineMembers[nextIndex].id);
  }

  const place = {
    china: language === "zh" ? "中国" : "China",
    malaysia: language === "zh" ? "马来西亚" : "Malaysia",
    melbourne: language === "zh" ? "墨尔本" : "Melbourne",
    sweden: language === "zh" ? "瑞典" : "Sweden",
    uk: language === "zh" ? "英国" : "United Kingdom",
  };
  const markerLocations: Record<string, Array<{ caption: string; coordinates: [number, number] }>> = {
    dongfeng: [{ caption: place.china, coordinates: [30.5928, 114.3055] }],
    ecarx: [
      { caption: place.china, coordinates: [30.5928, 114.3055] },
      { caption: place.sweden, coordinates: [57.7089, 11.9746] },
    ],
    futurelab: [
      { caption: place.melbourne, coordinates: [-37.8136, 144.9631] },
      { caption: place.malaysia, coordinates: [3.139, 101.6869] },
      { caption: place.uk, coordinates: [52.2823, -1.5849] },
    ],
    helloride: [{ caption: place.melbourne, coordinates: [-37.8136, 144.9631] }],
    isoftstone: [
      { caption: place.china, coordinates: [30.5928, 114.3055] },
      { caption: place.sweden, coordinates: [57.7089, 11.9746] },
    ],
  };
  const markers: PolaroidMarker[] = members.flatMap((rawMember, memberIndex) => {
    const member = localMember(rawMember, language);
    const locations = markerLocations[member.id] ?? (member.coordinates ? [{ caption: member.location ?? member.group ?? member.title, coordinates: member.coordinates }] : []);

    return locations.map((location, locationIndex) => ({
      caption: `${location.caption} · ${member.title.split(" - ")[0]}`,
      id: `${member.id}-${location.caption.toLowerCase().replace(/\s+/g, "-")}`,
      image: rawMember.image,
      itemId: rawMember.id,
      location: location.coordinates,
      meta: `${member.period} · ${location.caption}`,
      rotate: [-6, 5, -3, 4, -4, 3, -5][(memberIndex + locationIndex) % 7],
      type: member.workType ?? "internship",
    }));
  });
  const timelineItems: TimelineItem[] = timelineMembers.map((rawMember, index) => {
    const member = localMember(rawMember, language);
    const isInternship = (member.workType ?? "internship") === "internship";
    return {
      active: index <= activeIndex,
      caption: member.period.split(" - ")[0].replace(" ", "\n"),
      dotActiveClass: isInternship ? "bg-[#f5c542]" : "bg-[#42b86b]",
      dotClass: isInternship ? "bg-[#f5c542]/55" : "bg-[#42b86b]/55",
      label: member.title.split(" - ")[0],
      onClick: () => {
        selectMember(rawMember.id);
      },
    };
  });

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 py-4 font-sans">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <GlobePolaroids
            activeId={activeId}
            className="mx-auto max-w-[560px]"
            markers={markers}
            onMarkerHover={(id) => {
              if (!isGlobeLocked) {
                selectMember(id, false);
              }
            }}
            onMarkerSelect={(id) => {
              selectMember(id);
            }}
            paused={isGlobeLocked}
            speed={0.0025}
          />
          <div className="mt-10 overflow-x-auto pb-12 pt-7">
            <div className="min-w-[640px] px-6">
              <TimelineRail
                captionClassName="text-[11px] font-bold leading-tight"
                dotActiveClass="bg-zinc-900"
                gapClassName="justify-between gap-8"
                items={timelineItems}
                labelAngle={48}
                labelClassName="max-w-[120px] truncate font-bold"
                lineColorClass="bg-zinc-200"
                lineThickness={5}
                size="md"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs font-bold text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#f5c542]" />
              {t.internship}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#42b86b]" />
              {t.fullTime}
            </span>
          </div>
        </div>

        <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted p-4 shadow-sm">
          {evidenceTranslation ? (
            <button
              className="absolute right-4 top-4 z-20 rounded-full border border-neutral-900 bg-white/95 px-4 py-2 text-sm font-bold text-neutral-950 shadow-lg transition hover:bg-neutral-950 hover:text-white"
              onClick={() => setIsEvidenceTranslated((current) => !current)}
              type="button"
            >
              {isEvidenceTranslated
                ? language === "zh"
                  ? "查看原图"
                  : "Show original"
                : language === "zh"
                  ? "一键翻译为英文"
                  : "Translate image to English"}
            </button>
          ) : null}
          <button
            aria-label="Show previous evidence"
            className="absolute left-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-900 bg-white/90 text-neutral-950 shadow-lg transition hover:bg-neutral-950 hover:text-white"
            onClick={() => stepMember("previous")}
            type="button"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {isEvidenceTranslated && evidenceTranslation ? (
            <div className="max-h-[640px] w-full overflow-y-auto rounded-xl bg-white p-8 text-left shadow-inner">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-500">English translation</p>
              <h4 className="text-2xl font-bold leading-tight text-neutral-950">{evidenceTranslation.title}</h4>
              <div className="mt-6 space-y-4">
                {evidenceTranslation.body.map((line) => (
                  <p className="border-l-4 border-neutral-900 pl-4 text-sm leading-relaxed text-neutral-700" key={line}>
                    {line}
                  </p>
                ))}
              </div>
              {evidenceTranslation.note ? (
                <p className="mt-6 rounded-lg bg-neutral-100 p-4 text-xs font-semibold leading-relaxed text-neutral-600">
                  {evidenceTranslation.note}
                </p>
              ) : null}
            </div>
          ) : (
            <img alt={activeMember.title} className="h-full max-h-[640px] w-full object-contain" src={activeRawMember.image} />
          )}
          <button
            aria-label="Show next evidence"
            className="absolute right-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-900 bg-white/90 text-neutral-950 shadow-lg transition hover:bg-neutral-950 hover:text-white"
            onClick={() => stepMember("next")}
            type="button"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <article
        className={cn(
          "rounded-2xl border border-border bg-background p-6 shadow-sm",
          focusId === activeRawMember.id && "evidence-highlight",
        )}
      >
        <div className="p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {activeMember.group} · {activeMember.period}
            {activeMember.location ? ` · ${activeMember.location}` : ""}
          </p>
          <h4 className="mt-2 text-2xl font-bold leading-tight text-foreground">{activeMember.title}</h4>
          <p className="mt-2 text-sm font-semibold text-muted-foreground">{activeMember.detailTitle ?? t.detailFallback}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{activeMember.summary}</p>

          <div className="mt-6">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">{t.details}</p>
            <ol className="relative space-y-4 border-l border-border pl-5">
              {(activeMember.details ?? []).map((detail) => (
                <li className="relative text-sm leading-relaxed text-foreground" key={detail}>
                  <span
                    className={cn(
                      "absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-background",
                      (activeMember.workType ?? "internship") === "internship" ? "bg-[#f5c542]" : "bg-[#42b86b]",
                    )}
                  />
                  {detail}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {activeMember.points.map((point) => (
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-foreground" key={point}>
                {point}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
