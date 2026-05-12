import * as React from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = React.HTMLAttributes<HTMLDivElement> & {
  pauseOnHover?: boolean;
};

export function Marquee({ children, className, pauseOnHover = false, ...props }: MarqueeProps) {
  return (
    <div className={cn("marquee-root", pauseOnHover && "marquee-pause-on-hover", className)} {...props}>
      <div className="marquee-track">
        {children}
        {children}
      </div>
    </div>
  );
}
