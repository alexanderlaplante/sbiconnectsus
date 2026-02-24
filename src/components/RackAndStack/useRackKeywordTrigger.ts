import { useEffect, useRef } from "react";

const TRIGGER = "rack";

export function useRackKeywordTrigger(onTrigger: () => void) {
  const buffer = useRef("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const editable = (e.target as HTMLElement)?.isContentEditable;
      if (tag === "input" || tag === "textarea" || tag === "select" || editable) return;
      if (e.key.length !== 1) return;

      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-TRIGGER.length);
      if (buffer.current === TRIGGER) {
        buffer.current = "";
        onTrigger();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onTrigger]);
}
