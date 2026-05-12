import { useState } from "react";

import type { CapabilityItem } from "@/data/site-data";
import type { Language } from "@/App";
import { GlobePolaroids, type PolaroidMarker } from "@/components/ui/cobe-globe-polaroids";
import { cn } from "@/lib/utils";
import TimelineRail, { type TimelineItem } from "@/components/ui/timeline-rail";

interface TeamShowcaseProps {
  language: Language;
  members: CapabilityItem[];
}

const copy = {
  zh: {
    detailFallback: "项目与经历资料",
    fullTime: "正式工作",
    internship: "实习",
    details: "详细经历",
  },
  en: {
    detailFallback: "Project and experience evidence",
    fullTime: "Full-time",
    internship: "Internship",
    details: "Detailed Experience",
  },
} satisfies Record<Language, Record<string, string>>;

export default function TeamShowcase({ language, members }: TeamShowcaseProps) {
  const [activeId, setActiveId] = useState(members[0]?.id ?? "");
  const [isGlobeLocked, setIsGlobeLocked] = useState(false);
  const t = copy[language];

  if (members.length === 0) {
    return null;
  }

  const activeMember = members.find((member) => member.id === activeId) ?? members[0];
  const activeIndex = members.findIndex((member) => member.id === activeMember.id);
  const markerLocations: Record<string, Array<{ caption: string; coordinates: [number, number] }>> = {
    dongfeng: [{ caption: "China", coordinates: [30.5928, 114.3055] }],
    ecarx: [
      { caption: "China", coordinates: [30.5928, 114.3055] },
      { caption: "Sweden", coordinates: [57.7089, 11.9746] },
    ],
    futurelab: [
      { caption: "Melbourne", coordinates: [-37.8136, 144.9631] },
      { caption: "Malaysia", coordinates: [3.139, 101.6869] },
      { caption: "United Kingdom", coordinates: [52.2823, -1.5849] },
    ],
    helloride: [{ caption: "Melbourne", coordinates: [-37.8136, 144.9631] }],
    isoftstone: [
      { caption: "China", coordinates: [30.5928, 114.3055] },
      { caption: "Sweden", coordinates: [57.7089, 11.9746] },
    ],
  };
  const markers: PolaroidMarker[] = members.flatMap((member, memberIndex) => {
    const locations = markerLocations[member.id] ?? (member.coordinates ? [{ caption: member.location ?? member.group ?? member.title, coordinates: member.coordinates }] : []);

    return locations.map((location, locationIndex) => ({
      caption: `${location.caption} · ${member.title.split(" - ")[0]}`,
      id: `${member.id}-${location.caption.toLowerCase().replace(/\s+/g, "-")}`,
      image: member.image,
      itemId: member.id,
      location: location.coordinates,
      meta: `${member.period} · ${location.caption}`,
      rotate: [-6, 5, -3, 4, -4, 3, -5][(memberIndex + locationIndex) % 7],
      type: member.workType ?? "internship",
    }));
  });
  const timelineItems: TimelineItem[] = members.map((member, index) => {
    const isInternship = (member.workType ?? "internship") === "internship";
    return {
      active: index <= activeIndex,
      caption: member.period.split(" - ")[0].replace(" ", "\n"),
      dotActiveClass: isInternship ? "bg-[#f5c542]" : "bg-[#42b86b]",
      dotClass: isInternship ? "bg-[#f5c542]/55" : "bg-[#42b86b]/55",
      label: member.title.split(" - ")[0],
      onClick: () => {
        setActiveId(member.id);
        setIsGlobeLocked(true);
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
                setActiveId(id);
              }
            }}
            onMarkerSelect={(id) => {
              setActiveId(id);
              setIsGlobeLocked(true);
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

        <div className="flex min-h-[520px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted p-4 shadow-sm">
          <img alt={activeMember.title} className="h-full max-h-[640px] w-full object-contain" src={activeMember.image} />
        </div>
      </div>

      <article className="rounded-2xl border border-border bg-background p-6 shadow-sm">
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
