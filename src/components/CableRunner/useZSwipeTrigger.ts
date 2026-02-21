import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  t: number;
}

/**
 * Detects a Z-pattern swipe on mobile/touch devices.
 * Z = swipe right → swipe diagonal-down-left → swipe right
 * Each stroke must cover a minimum distance and complete within a time window.
 */
export function useZSwipeTrigger(onTrigger: () => void) {
  const points = useRef<Point[]>([]);
  const strokesRef = useRef<Array<{ dx: number; dy: number }>>([]);
  const tracking = useRef(false);

  useEffect(() => {
    const MIN_DIST = 40; // min px per stroke
    const MAX_TIME = 2000; // ms for entire Z gesture
    let gestureStart = 0;

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      points.current = [{ x: touch.clientX, y: touch.clientY, t: Date.now() }];
      tracking.current = true;
      gestureStart = Date.now();
      strokesRef.current = [];
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!tracking.current) return;
      const touch = e.touches[0];
      points.current.push({ x: touch.clientX, y: touch.clientY, t: Date.now() });
    };

    const onTouchEnd = () => {
      if (!tracking.current) return;
      tracking.current = false;

      const pts = points.current;
      if (pts.length < 2) return;

      const dx = pts[pts.length - 1].x - pts[0].x;
      const dy = pts[pts.length - 1].y - pts[0].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MIN_DIST) return;

      strokesRef.current.push({ dx, dy });

      const strokes = strokesRef.current;

      // Check for Z pattern: 3 strokes within time window
      if (strokes.length >= 3 && Date.now() - gestureStart < MAX_TIME) {
        const s1 = strokes[strokes.length - 3]; // right
        const s2 = strokes[strokes.length - 2]; // diagonal down-left
        const s3 = strokes[strokes.length - 1]; // right

        const isRight = (s: { dx: number; dy: number }) =>
          s.dx > MIN_DIST && Math.abs(s.dy) < Math.abs(s.dx) * 0.7;

        const isDiagDownLeft = (s: { dx: number; dy: number }) =>
          s.dx < -MIN_DIST * 0.5 && s.dy > MIN_DIST * 0.5;

        if (isRight(s1) && isDiagDownLeft(s2) && isRight(s3)) {
          strokesRef.current = [];
          onTrigger();
        }
      }

      // Reset if too much time passed
      if (Date.now() - gestureStart > MAX_TIME) {
        strokesRef.current = [];
        gestureStart = Date.now();
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onTrigger]);
}
