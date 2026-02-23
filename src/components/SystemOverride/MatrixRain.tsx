import { useEffect, useRef, memo } from "react";

const CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const FONT_SIZE = 14;
const COLOR = "#00ff66";

const MatrixRain = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let cols: number;
    let drops: number[];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / FONT_SIZE);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };

    resize();
    window.addEventListener("resize", resize);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      ctx.fillStyle = "rgba(11, 15, 20, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = COLOR;
      ctx.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < cols; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        ctx.globalAlpha = 0.4 + Math.random() * 0.4;
        ctx.fillText(char, x, y);
        ctx.globalAlpha = 1;

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += prefersReduced ? 0.3 : 1;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.3 }}
      aria-hidden="true"
    />
  );
});

MatrixRain.displayName = "MatrixRain";
export default MatrixRain;
