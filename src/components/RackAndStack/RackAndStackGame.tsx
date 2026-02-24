import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ── constants ── */
const GAME_DURATION = 30;
const RACK_W = 80;
const RACK_H = 20;
const SERVER_W = 60;
const SERVER_H = 16;
const CABLE_W = 30;
const CABLE_H = 30;
const SPAWN_INTERVAL = 700;
const FALL_SPEED = 3;
const MOVE_SPEED = 6;
const BG = "#0b0f14";
const GRID_COLOR = "rgba(56,152,236,0.06)";
const NEON_GREEN = "#22c55e";
const NEON_BLUE = "#3898ec";
const CABLE_RED = "#ef4444";
const TEXT_COLOR = "#e2e8f0";

type FallingItem = {
  x: number;
  y: number;
  type: "server" | "cable";
  speed: number;
};

type GameState = "ready" | "playing" | "ended";

/* ── pixel font style ── */
const PIXEL_FONT = "'Courier New', monospace";

/* ── leaderboard helpers ── */
const LB_KEY = "sbi_rack_highscores";
function getHighScores(): number[] {
  try {
    const raw = localStorage.getItem(LB_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveHighScore(score: number) {
  const scores = [...getHighScores(), score].sort((a, b) => b - a).slice(0, 3);
  localStorage.setItem(LB_KEY, JSON.stringify(scores));
  return scores;
}

/* ── component ── */
export default function RackAndStackGame({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>("ready");
  const [finalScore, setFinalScore] = useState(0);
  const [highScores, setHighScores] = useState<number[]>([]);
  const gameRef = useRef<{
    rackX: number;
    score: number;
    combo: number;
    timeLeft: number;
    items: FallingItem[];
    keys: Set<string>;
    lastSpawn: number;
    animId: number;
    lastTime: number;
    timerInterval: number;
    canvasW: number;
    canvasH: number;
  } | null>(null);

  const startGame = useCallback(() => {
    setGameState("playing");
    setFinalScore(0);
  }, []);

  /* ── lock scroll ── */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* ── escape key ── */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  /* ── reset on open ── */
  useEffect(() => {
    if (open) {
      setGameState("ready");
      setFinalScore(0);
      setHighScores(getHighScores());
    }
  }, [open]);

  /* ── game loop ── */
  useEffect(() => {
    if (!open || gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (gameRef.current) {
        gameRef.current.canvasW = w;
        gameRef.current.canvasH = h;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const w = window.innerWidth;
    const h = window.innerHeight;

    const state = {
      rackX: w / 2 - RACK_W / 2,
      score: 0,
      combo: 0,
      timeLeft: GAME_DURATION,
      items: [] as FallingItem[],
      keys: new Set<string>(),
      lastSpawn: 0,
      animId: 0,
      lastTime: performance.now(),
      timerInterval: 0,
      canvasW: w,
      canvasH: h,
    };
    gameRef.current = state;

    /* key input */
    const onKeyDown = (e: KeyboardEvent) => {
      state.keys.add(e.key);
      if (["ArrowLeft", "ArrowRight"].includes(e.key)) e.preventDefault();
    };
    const onKeyUp = (e: KeyboardEvent) => state.keys.delete(e.key);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    /* touch input */
    let touchX: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchX = e.touches[0].clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchX === null) return;
      const newX = e.touches[0].clientX;
      const delta = newX - touchX;
      state.rackX = Math.max(0, Math.min(state.canvasW - RACK_W, state.rackX + delta));
      touchX = newX;
      e.preventDefault();
    };
    const onTouchEnd = () => { touchX = null; };
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    /* timer */
    state.timerInterval = window.setInterval(() => {
      state.timeLeft -= 1;
      if (state.timeLeft <= 0) {
        endGame();
      }
    }, 1000);

    function endGame() {
      cancelAnimationFrame(state.animId);
      clearInterval(state.timerInterval);
      const scores = saveHighScore(state.score);
      setFinalScore(state.score);
      setHighScores(scores);
      setGameState("ended");
    }

    /* draw helpers */
    function drawPixelRect(x: number, y: number, w: number, h: number, color: string) {
      ctx!.fillStyle = color;
      ctx!.fillRect(Math.round(x), Math.round(y), w, h);
    }

    function drawGrid() {
      ctx!.strokeStyle = GRID_COLOR;
      ctx!.lineWidth = 1;
      const cw = state.canvasW;
      const ch = state.canvasH;
      for (let x = 0; x < cw; x += 40) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, ch);
        ctx!.stroke();
      }
      for (let y = 0; y < ch; y += 40) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(cw, y);
        ctx!.stroke();
      }
    }

    function drawCable(x: number, y: number) {
      ctx!.strokeStyle = CABLE_RED;
      ctx!.lineWidth = 2;
      // tangled cable bundle – zigzag lines
      ctx!.beginPath();
      ctx!.moveTo(x, y);
      ctx!.lineTo(x + 10, y + 8);
      ctx!.lineTo(x, y + 16);
      ctx!.lineTo(x + 15, y + 10);
      ctx!.lineTo(x + 5, y + 24);
      ctx!.lineTo(x + 20, y + 14);
      ctx!.lineTo(x + 30, y + 28);
      ctx!.stroke();
      // highlight
      ctx!.strokeStyle = "rgba(239,68,68,0.4)";
      ctx!.beginPath();
      ctx!.moveTo(x + 5, y + 2);
      ctx!.lineTo(x + 15, y + 12);
      ctx!.lineTo(x + 8, y + 20);
      ctx!.lineTo(x + 25, y + 18);
      ctx!.stroke();
    }

    function drawServer(x: number, y: number) {
      // body
      drawPixelRect(x, y, SERVER_W, SERVER_H, "rgba(56,152,236,0.15)");
      ctx!.strokeStyle = NEON_BLUE;
      ctx!.lineWidth = 1;
      ctx!.strokeRect(x, y, SERVER_W, SERVER_H);
      // faceplate
      drawPixelRect(x + 4, y + 3, SERVER_W - 8, SERVER_H - 6, "rgba(56,152,236,0.08)");
      // LEDs
      drawPixelRect(x + SERVER_W - 14, y + 5, 3, 3, NEON_GREEN);
      drawPixelRect(x + SERVER_W - 8, y + 5, 3, 3, NEON_BLUE);
    }

    function drawRack(x: number, bottomY: number) {
      const rh = 30;
      // rails
      ctx!.strokeStyle = "rgba(56,152,236,0.4)";
      ctx!.lineWidth = 2;
      ctx!.strokeRect(x, bottomY - rh, RACK_W, rh);
      // inner rails
      ctx!.strokeStyle = "rgba(56,152,236,0.2)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(x + 8, bottomY - rh);
      ctx!.lineTo(x + 8, bottomY);
      ctx!.moveTo(x + RACK_W - 8, bottomY - rh);
      ctx!.lineTo(x + RACK_W - 8, bottomY);
      ctx!.stroke();
      // label
      ctx!.fillStyle = "rgba(56,152,236,0.5)";
      ctx!.font = `bold 8px ${PIXEL_FONT}`;
      ctx!.textAlign = "center";
      ctx!.fillText("▼ RACK ▼", x + RACK_W / 2, bottomY - 10);
    }

    function drawHUD() {
      const cw = state.canvasW;
      ctx!.font = `bold 16px ${PIXEL_FONT}`;
      ctx!.textAlign = "left";
      ctx!.fillStyle = NEON_GREEN;
      ctx!.fillText(`SCORE: ${state.score}`, 20, 36);
      if (state.combo >= 3) {
        ctx!.fillStyle = NEON_BLUE;
        ctx!.fillText(`x${state.combo} COMBO!`, 20, 56);
      }
      ctx!.textAlign = "right";
      ctx!.fillStyle = state.timeLeft <= 10 ? CABLE_RED : TEXT_COLOR;
      ctx!.fillText(`TIME: ${state.timeLeft}s`, cw - 20, 36);
      // title
      ctx!.textAlign = "center";
      ctx!.fillStyle = "rgba(255,255,255,0.3)";
      ctx!.font = `bold 11px ${PIXEL_FONT}`;
      ctx!.fillText("RACK & STACK: SPEED RUN", cw / 2, 24);
    }

    /* main loop */
    function loop(ts: number) {
      const dt = Math.min((ts - state.lastTime) / 16.67, 3); // normalize to ~60fps
      state.lastTime = ts;

      const cw = state.canvasW;
      const ch = state.canvasH;
      const rackY = ch - 60;

      // clear
      ctx!.fillStyle = BG;
      ctx!.fillRect(0, 0, cw, ch);
      drawGrid();

      // movement
      if (state.keys.has("ArrowLeft") || state.keys.has("a")) {
        state.rackX = Math.max(0, state.rackX - MOVE_SPEED * dt);
      }
      if (state.keys.has("ArrowRight") || state.keys.has("d")) {
        state.rackX = Math.min(cw - RACK_W, state.rackX + MOVE_SPEED * dt);
      }

      // spawn
      state.lastSpawn += dt * 16.67;
      if (state.lastSpawn > SPAWN_INTERVAL) {
        state.lastSpawn = 0;
        const isServer = Math.random() > 0.25;
        const itemW = isServer ? SERVER_W : CABLE_W;
        state.items.push({
          x: Math.random() * (cw - itemW),
          y: -30,
          type: isServer ? "server" : "cable",
          speed: FALL_SPEED + Math.random() * 1.5,
        });
      }

      // update & draw items
      const nextItems: FallingItem[] = [];
      for (const item of state.items) {
        item.y += item.speed * dt;

        // collision with rack
        const itemW = item.type === "server" ? SERVER_W : CABLE_W;
        const itemH = item.type === "server" ? SERVER_H : CABLE_H;
        const hitX = item.x + itemW > state.rackX && item.x < state.rackX + RACK_W;
        const hitY = item.y + itemH >= rackY - 30 && item.y + itemH <= rackY;

        if (hitX && hitY) {
          if (item.type === "server") {
            state.combo += 1;
            const multiplier = state.combo >= 3 ? 2 : 1;
            state.score += 10 * multiplier;
          } else {
            state.score -= 15;
            state.combo = 0;
          }
          continue; // consumed
        }

        // missed (fell off screen)
        if (item.y > ch + 10) {
          if (item.type === "server") {
            state.score -= 5;
            state.combo = 0;
          }
          continue;
        }

        // draw
        if (item.type === "server") {
          drawServer(item.x, item.y);
        } else {
          drawCable(item.x, item.y);
        }
        nextItems.push(item);
      }
      state.items = nextItems;

      // draw rack & HUD
      drawRack(state.rackX, rackY);
      drawHUD();

      state.animId = requestAnimationFrame(loop);
    }

    state.animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(state.animId);
      clearInterval(state.timerInterval);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      gameRef.current = null;
    };
  }, [open, gameState]);

  if (!open) return null;

  const getEndMessage = () => {
    if (finalScore >= 150) return { title: "You're Cleared for Deployment.", sub: "SBI Tactical Operator Status: Approved." };
    if (finalScore >= 60) return { title: "Mission Complete.", sub: "Solid execution." };
    return { title: "Call SBI Before You Pull That Cable.", sub: "We'll handle deployment from here." };
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ background: BG }}
        >
          {/* Ready screen */}
          {gameState === "ready" && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-6"
              style={{ fontFamily: PIXEL_FONT }}
            >
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl sm:text-2xl font-bold tracking-widest uppercase text-center"
                style={{ color: NEON_GREEN, textShadow: `0 0 12px rgba(34,197,94,0.4)` }}
              >
                Rack & Stack: Speed Run
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center space-y-2 text-sm"
                style={{ color: TEXT_COLOR }}
              >
                <p>Catch servers. Avoid cables. Beat the clock.</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Arrow keys / WASD to move • 30 seconds
                </p>
              </motion.div>
              {highScores.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xs text-center space-y-1"
                  style={{ color: "rgba(56,152,236,0.6)" }}
                >
                  <p className="uppercase tracking-wider">Top Scores</p>
                  {highScores.map((s, i) => (
                    <p key={i}>{i + 1}. {s}</p>
                  ))}
                </motion.div>
              )}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={startGame}
                className="px-8 py-3 rounded border text-sm font-bold uppercase tracking-widest transition-all hover:brightness-125"
                style={{
                  borderColor: NEON_GREEN,
                  color: NEON_GREEN,
                  background: "rgba(34,197,94,0.08)",
                  textShadow: `0 0 8px rgba(34,197,94,0.3)`,
                }}
              >
                Deploy
              </motion.button>
              <button
                onClick={onClose}
                className="text-xs uppercase tracking-wider transition-colors"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                [ESC] Abort Mission
              </button>
            </div>
          )}

          {/* Game canvas */}
          {gameState === "playing" && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ touchAction: "none" }}
            />
          )}

          {/* End screen */}
          {gameState === "ended" && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-6"
              style={{ fontFamily: PIXEL_FONT }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-3"
              >
                <h2
                  className="text-xl sm:text-2xl font-bold tracking-wider uppercase"
                  style={{ color: NEON_GREEN, textShadow: `0 0 12px rgba(34,197,94,0.4)` }}
                >
                  {getEndMessage().title}
                </h2>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {getEndMessage().sub}
                </p>
                <p className="text-3xl font-bold mt-4" style={{ color: NEON_BLUE }}>
                  {finalScore} pts
                </p>
              </motion.div>
              {highScores.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs text-center space-y-1"
                  style={{ color: "rgba(56,152,236,0.5)" }}
                >
                  <p className="uppercase tracking-wider">Leaderboard</p>
                  {highScores.map((s, i) => (
                    <p key={i} style={{ color: s === finalScore ? NEON_GREEN : undefined }}>
                      {i + 1}. {s}
                    </p>
                  ))}
                </motion.div>
              )}
              <div className="flex gap-4 mt-2">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={startGame}
                  className="px-6 py-2 rounded border text-xs font-bold uppercase tracking-widest transition-all hover:brightness-125"
                  style={{
                    borderColor: NEON_BLUE,
                    color: NEON_BLUE,
                    background: "rgba(56,152,236,0.08)",
                  }}
                >
                  Redeploy
                </motion.button>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={onClose}
                  className="px-6 py-2 rounded border text-xs font-bold uppercase tracking-widest transition-all hover:brightness-125"
                  style={{
                    borderColor: "rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.5)",
                    background: "transparent",
                  }}
                >
                  Return to Operations
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
