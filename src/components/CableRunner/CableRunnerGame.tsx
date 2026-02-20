import { useEffect, useRef, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ─── Constants ───────────────────────────────────────────────────────
const GAME_W = 320;
const GAME_H = 180;
const GROUND_Y = 150;
const GRAVITY = 0.55;
const JUMP_VEL = -8.5;
const BASE_SPEED = 2.2;
const SPEED_INC = 0.0004;

const PLAYER_W = 14;
const PLAYER_H = 22;

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ─── Types ───────────────────────────────────────────────────────────
interface Obstacle {
  x: number;
  w: number;
  h: number;
  type: "conduit" | "gap" | "emi";
}
interface PowerUp {
  x: number;
  y: number;
  type: "label" | "tone" | "fiber";
  collected: boolean;
}
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

// ─── Component ───────────────────────────────────────────────────────
const CableRunnerGame = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef<"intro" | "playing" | "over">("intro");
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // game state refs (avoid re-renders)
  const game = useRef({
    player: { x: 40, y: GROUND_Y - PLAYER_H, vy: 0, onGround: true },
    obstacles: [] as Obstacle[],
    powerUps: [] as PowerUp[],
    particles: [] as Particle[],
    score: 0,
    distance: 0,
    lives: 3,
    speed: BASE_SPEED,
    invincible: 0,
    toneReveal: 0,
    spawnTimer: 0,
    puSpawnTimer: 0,
    frameCount: 0,
    bgOffset: 0,
  });

  const [, forceRender] = useState(0);

  const resetGame = useCallback(() => {
    const g = game.current;
    g.player = { x: 40, y: GROUND_Y - PLAYER_H, vy: 0, onGround: true };
    g.obstacles = [];
    g.powerUps = [];
    g.particles = [];
    g.score = 0;
    g.distance = 0;
    g.lives = 3;
    g.speed = BASE_SPEED;
    g.invincible = 0;
    g.toneReveal = 0;
    g.spawnTimer = 0;
    g.puSpawnTimer = 0;
    g.frameCount = 0;
    g.bgOffset = 0;
  }, []);

  const jump = useCallback(() => {
    if (stateRef.current === "intro") {
      stateRef.current = "playing";
      resetGame();
      forceRender((n) => n + 1);
      return;
    }
    if (stateRef.current === "over") {
      stateRef.current = "playing";
      resetGame();
      forceRender((n) => n + 1);
      return;
    }
    const p = game.current.player;
    if (p.onGround) {
      p.vy = JUMP_VEL;
      p.onGround = false;
    }
  }, [resetGame]);

  // ── Draw helpers ──
  const drawPixelChar = (ctx: CanvasRenderingContext2D, x: number, y: number, invincible: boolean) => {
    const flash = invincible && game.current.frameCount % 8 < 4;
    // body
    ctx.fillStyle = flash ? "hsl(45,93%,58%)" : "hsl(205,85%,55%)";
    ctx.fillRect(x + 3, y + 6, 8, 10);
    // head
    ctx.fillStyle = flash ? "hsl(45,80%,70%)" : "hsl(210,20%,85%)";
    ctx.fillRect(x + 4, y, 6, 6);
    // legs
    const legOff = game.current.frameCount % 10 < 5 ? 0 : 2;
    ctx.fillStyle = flash ? "hsl(45,70%,50%)" : "hsl(220,25%,30%)";
    ctx.fillRect(x + 3, y + 16, 3, 6);
    ctx.fillRect(x + 8, y + 16 + legOff, 3, 6 - legOff);
    // helmet
    ctx.fillStyle = "hsl(45,93%,58%)";
    ctx.fillRect(x + 3, y - 1, 8, 2);
  };

  const drawBuildings = (ctx: CanvasRenderingContext2D, offset: number) => {
    ctx.fillStyle = "hsla(220,25%,12%,0.8)";
    const bws = [30, 20, 25, 40, 15, 35, 22];
    const bhs = [40, 60, 35, 50, 70, 30, 55];
    let bx = -(offset % 260);
    for (let i = 0; i < 14; i++) {
      const idx = i % bws.length;
      ctx.fillRect(bx, GROUND_Y - bhs[idx], bws[idx], bhs[idx]);
      bx += bws[idx] + 8;
    }
  };

  const spawnParticles = (x: number, y: number, color: string) => {
    for (let i = 0; i < 6; i++) {
      game.current.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 3,
        vy: -Math.random() * 3,
        life: 20 + Math.random() * 10,
      });
    }
  };

  // ── Game Loop ──
  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    setTimeout(() => overlayRef.current?.focus(), 50);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    const loop = () => {
      const g = game.current;
      g.frameCount++;

      // clear
      ctx.fillStyle = "hsl(220,25%,6%)";
      ctx.fillRect(0, 0, GAME_W, GAME_H);

      // grid bg
      ctx.strokeStyle = "hsla(205,85%,55%,0.06)";
      ctx.lineWidth = 0.5;
      for (let gx = -(g.bgOffset % 20); gx < GAME_W; gx += 20) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, GAME_H); ctx.stroke();
      }
      for (let gy = 0; gy < GAME_H; gy += 20) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(GAME_W, gy); ctx.stroke();
      }

      // buildings
      if (!prefersReducedMotion) drawBuildings(ctx, g.bgOffset * 0.3);

      // ground
      ctx.fillStyle = "hsl(216,18%,18%)";
      ctx.fillRect(0, GROUND_Y, GAME_W, GAME_H - GROUND_Y);
      ctx.fillStyle = "hsl(45,93%,58%)";
      ctx.fillRect(0, GROUND_Y, GAME_W, 1);

      if (stateRef.current === "intro") {
        ctx.fillStyle = "hsl(210,20%,92%)";
        ctx.font = "bold 14px monospace";
        ctx.textAlign = "center";
        ctx.fillText("CABLE RUNNER", GAME_W / 2, 50);
        ctx.font = "8px monospace";
        ctx.fillStyle = "hsl(215,15%,55%)";
        ctx.fillText("Space / Tap to Jump", GAME_W / 2, 80);
        ctx.fillText("Avoid obstacles, collect tools", GAME_W / 2, 95);
        ctx.fillStyle = "hsl(45,93%,58%)";
        ctx.font = "bold 10px monospace";
        ctx.fillText("[ TAP TO START ]", GAME_W / 2, 125);
        ctx.textAlign = "left";
        drawPixelChar(ctx, GAME_W / 2 - 7, GROUND_Y - PLAYER_H, false);
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      if (stateRef.current === "over") {
        ctx.fillStyle = "hsl(210,20%,92%)";
        ctx.font = "bold 12px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", GAME_W / 2, 55);
        ctx.font = "8px monospace";
        ctx.fillStyle = "hsl(215,15%,55%)";
        ctx.fillText(`Score: ${g.score}`, GAME_W / 2, 80);
        ctx.fillStyle = "hsl(45,93%,58%)";
        ctx.font = "bold 9px monospace";
        ctx.fillText("[ TAP TO RETRY ]", GAME_W / 2, 110);
        ctx.textAlign = "left";
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // ── Update ──
      g.speed = BASE_SPEED + g.distance * SPEED_INC;
      g.distance += g.speed * 0.1;
      g.score = Math.floor(g.distance);
      g.bgOffset += g.speed;
      if (g.invincible > 0) g.invincible--;
      if (g.toneReveal > 0) g.toneReveal--;

      // player physics
      const p = g.player;
      p.vy += GRAVITY;
      p.y += p.vy;
      if (p.y >= GROUND_Y - PLAYER_H) {
        p.y = GROUND_Y - PLAYER_H;
        p.vy = 0;
        p.onGround = true;
      }

      // spawn obstacles
      g.spawnTimer -= g.speed;
      if (g.spawnTimer <= 0) {
        g.spawnTimer = 80 + Math.random() * 60;
        const types: Obstacle["type"][] = ["conduit", "gap", "emi"];
        const t = types[Math.floor(Math.random() * types.length)];
        const w = t === "emi" ? 30 : t === "gap" ? 20 : 10;
        const h = t === "conduit" ? 14 : t === "gap" ? 6 : 20;
        g.obstacles.push({ x: GAME_W + 10, w, h, type: t });
      }

      // spawn power-ups
      g.puSpawnTimer -= g.speed;
      if (g.puSpawnTimer <= 0) {
        g.puSpawnTimer = 200 + Math.random() * 150;
        const types: PowerUp["type"][] = ["label", "tone", "fiber"];
        const t = types[Math.floor(Math.random() * types.length)];
        g.powerUps.push({ x: GAME_W + 10, y: GROUND_Y - 30 - Math.random() * 30, type: t, collected: false });
      }

      // move & draw obstacles
      g.obstacles = g.obstacles.filter((o) => o.x + o.w > -10);
      for (const o of g.obstacles) {
        o.x -= g.speed;
        if (o.type === "conduit") {
          ctx.fillStyle = g.toneReveal > 0 ? "hsla(45,93%,58%,0.7)" : "hsl(25,90%,40%)";
          ctx.fillRect(o.x, GROUND_Y - o.h, o.w, o.h);
        } else if (o.type === "gap") {
          ctx.fillStyle = g.toneReveal > 0 ? "hsla(45,93%,58%,0.5)" : "hsl(220,25%,3%)";
          ctx.fillRect(o.x, GROUND_Y, o.w, 30);
          // erase ground line
          ctx.fillStyle = "hsl(220,25%,6%)";
          ctx.fillRect(o.x, GROUND_Y - 1, o.w, 2);
        } else {
          // emi zone
          ctx.fillStyle = g.toneReveal > 0 ? "hsla(45,93%,58%,0.3)" : "hsla(0,84%,60%,0.15)";
          ctx.fillRect(o.x, GROUND_Y - o.h, o.w, o.h);
          ctx.strokeStyle = "hsla(0,84%,60%,0.4)";
          ctx.lineWidth = 0.5;
          ctx.strokeRect(o.x, GROUND_Y - o.h, o.w, o.h);
        }

        // collision
        const px = p.x, py = p.y, pw = PLAYER_W, ph = PLAYER_H;
        let hit = false;
        if (o.type === "gap") {
          // player falls in gap if on ground and overlapping
          if (p.onGround && px + pw > o.x + 4 && px < o.x + o.w - 4) hit = true;
        } else {
          const ox = o.x, oy = GROUND_Y - o.h, ow = o.w, oh = o.h;
          if (px + pw > ox && px < ox + ow && py + ph > oy && py < oy + oh) hit = true;
        }

        if (hit && g.invincible <= 0) {
          g.lives--;
          g.invincible = 90;
          spawnParticles(p.x + PLAYER_W / 2, p.y + PLAYER_H / 2, "red");
          if (g.lives <= 0) {
            stateRef.current = "over";
            forceRender((n) => n + 1);
          }
        }
      }

      // move & draw power-ups
      g.powerUps = g.powerUps.filter((pu) => !pu.collected && pu.x > -10);
      for (const pu of g.powerUps) {
        pu.x -= g.speed;
        const bob = Math.sin(g.frameCount * 0.1) * 3;
        const py2 = pu.y + bob;

        if (pu.type === "label") {
          ctx.fillStyle = "hsl(45,93%,58%)";
          ctx.fillRect(pu.x, py2, 8, 6);
          ctx.fillStyle = "hsl(220,25%,6%)";
          ctx.fillRect(pu.x + 1, py2 + 2, 6, 1);
        } else if (pu.type === "tone") {
          ctx.fillStyle = "hsl(160,70%,48%)";
          ctx.fillRect(pu.x, py2, 6, 8);
          ctx.fillStyle = "hsl(160,70%,65%)";
          ctx.fillRect(pu.x + 2, py2, 2, 3);
        } else {
          ctx.fillStyle = "hsl(205,85%,55%)";
          ctx.fillRect(pu.x, py2, 8, 4);
          ctx.fillStyle = "hsl(205,85%,70%)";
          ctx.fillRect(pu.x + 2, py2 + 1, 4, 2);
        }

        // collect
        const px2 = p.x, py3 = p.y;
        if (px2 + PLAYER_W > pu.x && px2 < pu.x + 8 && py3 + PLAYER_H > py2 && py3 < py2 + 8) {
          pu.collected = true;
          spawnParticles(pu.x, py2, "gold");
          if (pu.type === "label") g.score += 250;
          if (pu.type === "tone") g.toneReveal = 180;
          if (pu.type === "fiber") g.invincible = 180;
        }
      }

      // particles
      g.particles = g.particles.filter((pt) => pt.life > 0);
      for (const pt of g.particles) {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vy += 0.15;
        pt.life--;
        ctx.fillStyle = `hsla(45,93%,58%,${pt.life / 30})`;
        ctx.fillRect(pt.x, pt.y, 2, 2);
      }

      // draw player
      drawPixelChar(ctx, p.x, p.y, g.invincible > 0);

      // HUD
      ctx.fillStyle = "hsl(210,20%,92%)";
      ctx.font = "bold 7px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`SCORE ${g.score}`, 4, 10);
      ctx.fillText(`DIST ${Math.floor(g.distance)}m`, 4, 20);
      ctx.textAlign = "right";
      // lives as hearts
      for (let i = 0; i < g.lives; i++) {
        ctx.fillStyle = "hsl(0,84%,60%)";
        ctx.fillRect(GAME_W - 10 - i * 10, 4, 6, 6);
      }
      ctx.textAlign = "left";

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, [open, jump, resetGame]);

  // key handler
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === " " || e.key === "ArrowUp") { e.preventDefault(); jump(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, jump, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Cable Runner Game"
          tabIndex={-1}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(16,17,20,0.92)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="relative w-full max-w-2xl rounded-xl border border-border/50 bg-card shadow-2xl overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
              <span className="text-xs font-mono font-bold text-primary tracking-wider">CABLE RUNNER</span>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors text-lg leading-none px-1"
                aria-label="Close game"
              >
                ✕
              </button>
            </div>

            {/* Canvas */}
            <div
              className="bg-background flex items-center justify-center cursor-pointer"
              onClick={(e) => { e.stopPropagation(); jump(); }}
              onTouchStart={(e) => { e.preventDefault(); jump(); }}
            >
              <canvas
                ref={canvasRef}
                width={GAME_W}
                height={GAME_H}
                className="w-full max-w-2xl pointer-events-none"
                style={{ imageRendering: "pixelated", aspectRatio: `${GAME_W}/${GAME_H}` }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CableRunnerGame;
