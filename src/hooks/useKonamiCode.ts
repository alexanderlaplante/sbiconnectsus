import { useEffect, useRef, useCallback } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

// Swipe directions mapped to arrow keys
type SwipeDir = "up" | "down" | "left" | "right";
const SWIPE_MAP: Record<SwipeDir, string> = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
};

const SWIPE_THRESHOLD = 30;

export function useKonamiCode(onActivate: () => void) {
  const idx = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const advance = useCallback(
    (key: string) => {
      const expected = KONAMI_SEQUENCE[idx.current];
      if (key.toLowerCase() === expected.toLowerCase()) {
        idx.current += 1;
        if (idx.current === KONAMI_SEQUENCE.length) {
          idx.current = 0;
          onActivate();
        }
      } else {
        // Allow restarting if the key matches the first element
        idx.current = key.toLowerCase() === KONAMI_SEQUENCE[0].toLowerCase() ? 1 : 0;
      }
    },
    [onActivate],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const editable = (e.target as HTMLElement)?.isContentEditable;
      if (tag === "input" || tag === "textarea" || tag === "select" || editable) return;
      advance(e.key);
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchStart.current = { x: t.clientX, y: t.clientY };
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;
      touchStart.current = null;

      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      if (absDx < SWIPE_THRESHOLD && absDy < SWIPE_THRESHOLD) return;

      let dir: SwipeDir;
      if (absDx > absDy) {
        dir = dx > 0 ? "right" : "left";
      } else {
        dir = dy > 0 ? "down" : "up";
      }
      advance(SWIPE_MAP[dir]);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [advance]);
}
