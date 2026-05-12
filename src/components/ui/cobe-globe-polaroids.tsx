import { useCallback, useEffect, useRef } from "react";
import createGlobe from "cobe";

export interface PolaroidMarker {
  id: string;
  itemId: string;
  location: [number, number];
  image: string;
  caption: string;
  meta: string;
  rotate: number;
  type: "internship" | "full-time";
}

interface GlobePolaroidsProps {
  activeId?: string;
  className?: string;
  markers: PolaroidMarker[];
  onMarkerHover?: (id: string) => void;
  onMarkerSelect?: (id: string) => void;
  paused?: boolean;
  speed?: number;
}

export function GlobePolaroids({
  activeId,
  className = "",
  markers,
  onMarkerHover,
  onMarkerSelect,
  paused = false,
  speed = 0.003,
}: GlobePolaroidsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeMarker = markers.find((marker) => marker.itemId === activeId);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    pointerInteracting.current = { x: event.clientX, y: event.clientY };
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grabbing";
    }
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab";
    }
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (event.clientX - pointerInteracting.current.x) / 300,
          theta: (event.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId = 0;
    let phi = 0;

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) {
        return;
      }

      globe = createGlobe(canvas, {
        arcColor: [0.48, 0.64, 0.95],
        arcHeight: 0.25,
        arcs: [],
        arcWidth: 0.5,
        baseColor: [1, 1, 1],
        dark: 0,
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        diffuse: 1.5,
        glowColor: [0.94, 0.93, 0.91],
        height: width,
        mapBrightness: 8,
        mapSamples: 16000,
        markerColor: [0.16, 0.16, 0.16],
        markerElevation: 0.01,
        markers: markers.map((marker) => ({
          color: marker.type === "internship" ? [0.96, 0.72, 0.22] : [0.22, 0.7, 0.38],
          id: marker.id,
          location: marker.location,
          size: activeId === marker.itemId ? 0.055 : 0.038,
        })),
        opacity: 0.8,
        phi: 0,
        theta: 0.22,
        width,
      });

      function animate() {
        if (!isPausedRef.current && !paused) {
          phi += speed;
        }
        globe?.update({
          markers: markers.map((marker) => ({
            color: marker.type === "internship" ? [0.96, 0.72, 0.22] : [0.22, 0.7, 0.38],
            id: marker.id,
            location: marker.location,
            size: activeId === marker.itemId ? 0.055 : 0.038,
          })),
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.22 + thetaOffsetRef.current + dragOffset.current.theta,
        });
        animationId = requestAnimationFrame(animate);
      }

      animate();
      window.setTimeout(() => {
        canvas.style.opacity = "1";
      }, 0);
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const observer = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          observer.disconnect();
          init();
        }
      });
      observer.observe(canvas);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      globe?.destroy();
    };
  }, [activeId, markers, paused, speed]);

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        onPointerDown={handlePointerDown}
        ref={canvasRef}
        style={{
          borderRadius: "50%",
          cursor: "grab",
          height: "100%",
          opacity: 0,
          touchAction: "none",
          transition: "opacity 1.2s ease",
          width: "100%",
        }}
      />
      {markers.map((marker) => {
        const isActive = marker.itemId === activeId;
        const anchorStyle = {
          "--card-accent": marker.type === "internship" ? "#f5c542" : "#42b86b",
          bottom: "anchor(top)",
          filter: `blur(calc((1 - var(--cobe-visible-${marker.id}, 0)) * 8px))`,
          left: "anchor(center)",
          marginBottom: 8,
          opacity: `var(--cobe-visible-${marker.id}, 0)`,
          position: "absolute",
          positionAnchor: `--cobe-${marker.id}`,
          transform: `translateX(-50%) rotate(${marker.rotate}deg) scale(${isActive ? 1.08 : 1})`,
          transition: "opacity 0.3s, filter 0.3s, transform 0.3s",
          zIndex: isActive ? 20 : 10,
        } as React.CSSProperties & Record<string, string | number>;

        return (
          <button
            aria-label={marker.caption}
            className="globe-polaroid"
            key={marker.id}
            onClick={() => onMarkerSelect?.(marker.itemId)}
            onMouseEnter={() => onMarkerHover?.(marker.itemId)}
            style={anchorStyle}
            type="button"
          >
            <img alt={marker.caption} src={marker.image} />
            <span className="globe-polaroid-caption">{marker.caption}</span>
            <span className="globe-polaroid-tooltip">
              <strong>{marker.meta}</strong>
              {marker.caption}
            </span>
          </button>
        );
      })}
      {paused && activeMarker ? (
        <button
          aria-label={activeMarker.caption}
          className="globe-polaroid globe-polaroid-pinned"
          onClick={() => onMarkerSelect?.(activeMarker.itemId)}
          style={{ "--card-accent": activeMarker.type === "internship" ? "#f5c542" : "#42b86b" } as React.CSSProperties & Record<string, string>}
          type="button"
        >
          <img alt={activeMarker.caption} src={activeMarker.image} />
          <span className="globe-polaroid-caption">{activeMarker.caption}</span>
          <span className="globe-polaroid-tooltip">
            <strong>{activeMarker.meta}</strong>
            {activeMarker.caption}
          </span>
        </button>
      ) : null}
    </div>
  );
}
