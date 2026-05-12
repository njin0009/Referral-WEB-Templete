import * as React from "react";

import { cn } from "@/lib/utils";

type AnchorOrButton =
  | ({
      href: string;
      onClick?: never;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({
      href?: undefined;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>);

export type TimelineItem = {
  active?: boolean;
  caption?: string;
  dotActiveClass?: string;
  dotClass?: string;
  label?: string;
} & AnchorOrButton;

export type TimelineRailProps = {
  captionClassName?: string;
  className?: string;
  dotActiveClass?: string;
  dotClass?: string;
  emphasizeActiveTrail?: boolean;
  gapClassName?: string;
  itemClassName?: string;
  labelAngle?: number;
  labelClassName?: string;
  lineColorClass?: string;
  lineThickness?: number;
  railClassName?: string;
  renderCaption?: (item: TimelineItem, index: number) => React.ReactNode;
  renderLabel?: (item: TimelineItem, index: number) => React.ReactNode;
  size?: "sm" | "md";
  items: TimelineItem[];
};

export default function TimelineRail({
  items,
  size = "md",
  emphasizeActiveTrail = true,
  labelAngle = 45,
  gapClassName = "gap-14",
  lineColorClass = "bg-zinc-300 dark:bg-zinc-700",
  lineThickness = 6,
  dotClass = "bg-zinc-400 dark:bg-zinc-600",
  dotActiveClass = "bg-zinc-900 dark:bg-zinc-100",
  className,
  railClassName,
  itemClassName,
  labelClassName,
  captionClassName,
  renderLabel,
  renderCaption,
}: TimelineRailProps) {
  const lastActive = React.useMemo(() => {
    let index = -1;
    items.forEach((item, itemIndex) => {
      if (item.active) {
        index = itemIndex;
      }
    });
    return index;
  }, [items]);

  const dotSize = size === "sm" ? 14 : 18;
  const topOffset = size === "sm" ? -22 : -26;
  const captionOffset = size === "sm" ? 18 : 22;

  return (
    <section aria-label="timeline" className={cn("relative w-full", className)}>
      <div
        aria-hidden
        className={cn("absolute left-0 right-0", railClassName)}
        style={{
          height: lineThickness,
          top: 0,
          transform: `translateY(${captionOffset * -1}px)`,
        }}
      >
        <div className={cn("h-full rounded-full", lineColorClass)} />
        {emphasizeActiveTrail && lastActive >= 0 ? (
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-zinc-900"
            style={{
              width: `${items.length > 1 ? (lastActive / (items.length - 1)) * 100 : 0}%`,
            }}
          />
        ) : null}
      </div>

      <ol className={cn("relative flex items-center", gapClassName)} role="list" style={{ marginTop: captionOffset, paddingTop: Math.max(captionOffset, 16) }}>
        {items.map((item, index) => {
          const isActive = Boolean(item.active);
          const itemDotClass = isActive ? item.dotActiveClass ?? dotActiveClass : item.dotClass ?? dotClass;

          return (
            <li className={cn("relative flex flex-col items-center", itemClassName)} key={`${item.caption}-${index}`}>
              {item.label ? (
                <span
                  aria-hidden
                  className={cn("absolute -top-3 -translate-y-full select-none text-[11px] text-zinc-500", labelClassName)}
                  style={{
                    transform: `translateY(${topOffset}px) rotate(${-Math.abs(labelAngle)}deg)`,
                    transformOrigin: "bottom center",
                  }}
                >
                  {renderLabel ? renderLabel(item, index) : item.label}
                </span>
              ) : null}

              {item.href ? (
                <a
                  aria-current={isActive ? "step" : undefined}
                  aria-label={item.label ?? item.caption ?? `Step ${index + 1}`}
                  className={cn(
                    "relative rounded-full ring-2 ring-black/5 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
                    itemDotClass,
                  )}
                  href={item.href}
                  style={{ height: dotSize, width: dotSize }}
                  title={item.label ?? item.caption}
                />
              ) : (
                <button
                  aria-current={isActive ? "step" : undefined}
                  aria-label={item.label ?? item.caption ?? `Step ${index + 1}`}
                  className={cn(
                    "relative rounded-full ring-2 ring-black/5 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
                    itemDotClass,
                  )}
                  onClick={item.onClick}
                  style={{ height: dotSize, width: dotSize }}
                  title={item.label ?? item.caption}
                  type="button"
                />
              )}

              {item.caption ? (
                <span
                  aria-hidden
                  className={cn("absolute select-none whitespace-nowrap text-xs text-zinc-600", captionClassName)}
                  style={{ transform: `translateY(${captionOffset}px)` }}
                >
                  {renderCaption ? renderCaption(item, index) : item.caption}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
