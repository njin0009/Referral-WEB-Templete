import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LocationCardProps {
  city: string;
  address: string;
  imageUrl: string;
  directionsUrl: string;
  actionLabel?: string;
  onSelect?: () => void;
  isHighlighted?: boolean;
  className?: string;
}

export const LocationCard = ({
  city,
  address,
  imageUrl,
  directionsUrl,
  actionLabel = "Open",
  onSelect,
  isHighlighted = false,
  className,
}: LocationCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={cn(
        "relative h-80 w-full rounded-xl bg-cover bg-center shadow-lg transition-shadow duration-300 hover:shadow-2xl",
        isHighlighted && "evidence-highlight",
        className,
      )}
      onClick={onSelect}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={(event) => {
        if (!onSelect) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <div
        className="absolute inset-4 grid h-[calc(100%-2rem)] w-[calc(100%-2rem)] place-content-end rounded-xl bg-cover bg-center shadow-lg"
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

        <div
          className="flex w-full items-end justify-between gap-4 p-6 text-white"
          style={{ transform: "translateZ(50px)" }}
        >
          <div>
            <h3 className="text-2xl font-bold leading-tight">{city}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/85">{address}</p>
          </div>
          {onSelect ? (
            <Button
              aria-label={actionLabel}
              className="shrink-0"
              onClick={(event) => {
                event.stopPropagation();
                onSelect();
              }}
              type="button"
              variant="secondary"
            >
              {actionLabel}
            </Button>
          ) : (
          <a href={directionsUrl} rel="noopener noreferrer" target="_blank">
            <Button aria-label={actionLabel} className="shrink-0" variant="secondary">
              {actionLabel}
            </Button>
          </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
