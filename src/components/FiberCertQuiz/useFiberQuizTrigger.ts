import { useEffect, useRef, useState } from "react";

const TRIGGER = "tech";
const BUFFER_TIMEOUT = 1500;

const IGNORED_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

export function useFiberQuizTrigger() {
  const [open, setOpen] = useState(false);
  const buffer = useRef("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        IGNORED_TAGS.has(target.tagName) ||
        target.isContentEditable
      )
        return;

      if (timer.current) clearTimeout(timer.current);
      buffer.current += e.key.toLowerCase();
      timer.current = setTimeout(() => {
        buffer.current = "";
      }, BUFFER_TIMEOUT);

      if (buffer.current.endsWith(TRIGGER)) {
        buffer.current = "";
        if (timer.current) clearTimeout(timer.current);
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return { open, setOpen };
}
