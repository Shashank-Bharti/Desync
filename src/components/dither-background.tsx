import { useEffect, useRef } from "react";

// ─── ENABLE / DISABLE ──────────────────────────────────────────────────────────
const ENABLED = true;
// ──────────────────────────────────────────────────────────────────────────────

const SYMBOLS = ["·", "-", "+", "=", "*", "#", "@"];

export interface DitherConfig {
  density: number;
  speed: number;
  symbolWeight: number;
  cellSize: number;
}

export const DEFAULT_CONFIG: DitherConfig = {
  density: 0.7,
  speed: 0.4,
  symbolWeight: 0.18,
  cellSize: 20,
};

interface Props {
  config?: DitherConfig;
}

export function DitherBackground({ config = DEFAULT_CONFIG }: Props) {
  if (!ENABLED) return null;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const animIdRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const configRef = useRef(config);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const smoothMouseRef = useRef({ x: -9999, y: -9999 });

  configRef.current = config;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Size canvas to its parent container, not the whole window
    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      const w = parent ? parent.offsetWidth : window.innerWidth;
      const h = parent ? parent.offsetHeight : window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      sizeRef.current = { w, h };
    }

    resize();

    // Use ResizeObserver so the canvas tracks the container, not the window
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener("resize", resize);

    function noise(col: number, row: number, t: number): number {
      const x = col * 0.09;
      const y = row * 0.09;
      const v =
        Math.sin(x + t * 0.7) * 0.30 +
        Math.sin(y + t * 0.5) * 0.25 +
        Math.sin((x + y) * 0.8 + t * 0.4) * 0.20 +
        Math.sin((x - y) * 1.0 + t * 0.6) * 0.15 +
        Math.sin(x * 2.0 + y * 1.5 + t * 0.9) * 0.10;
      return v * 0.55 + 0.5;
    }

    function smoothstep(edge0: number, edge1: number, x: number): number {
      const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    }

    const SYM_LAST = SYMBOLS.length - 1;
    const HOVER_RADIUS = 120;

    function draw() {
      if (!canvas || !ctx) return;

      const { density, speed, symbolWeight, cellSize } = configRef.current;
      const { w, h } = sizeRef.current;
      const t = timeRef.current;
      const { x: rx, y: ry, active: hoverActive } = mouseRef.current;

      // Lerp smooth mouse toward real mouse (viscous lag)
      const LERP = 0.07;
      if (hoverActive) {
        smoothMouseRef.current.x += (rx - smoothMouseRef.current.x) * LERP;
        smoothMouseRef.current.y += (ry - smoothMouseRef.current.y) * LERP;
      } else {
        smoothMouseRef.current.x += (-9999 - smoothMouseRef.current.x) * LERP;
        smoothMouseRef.current.y += (-9999 - smoothMouseRef.current.y) * LERP;
      }
      const { x: mx, y: my } = smoothMouseRef.current;

      const cols = Math.ceil(w / cellSize) + 1;
      const rows = Math.ceil(h / cellSize) + 1;
      const half = cellSize / 2;

      const threshold = 0.35 - density * 0.33;
      const step = 0.001 + speed * 0.024;
      const fontSize = Math.round(cellSize * 0.65);

      // zinc-900 background
      ctx.fillStyle = "#18181b";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px monospace`;

      for (let row = 0; row < rows; row++) {
        const cy = row * cellSize + half;
        for (let col = 0; col < cols; col++) {
          const cx = col * cellSize + half;

          const b = Math.max(0, Math.min(1, noise(col, row, t)));

          if (b < threshold) continue;

          // Gooey displacement — no colour/weight change
          let drawX = cx;
          let drawY = cy;

          const dvx = mx - cx;
          const dvy = my - cy;
          const dist = Math.sqrt(dvx * dvx + dvy * dvy);

          if (dist < HOVER_RADIUS && dist > 0.5) {
            const t0 = smoothstep(0, HOVER_RADIUS, HOVER_RADIUS - dist);
            const pullShape = t0 * (1 - t0 * 0.8);
            const maxPull = cellSize * 0.55;
            drawX = cx + (dvx / dist) * pullShape * maxPull;
            drawY = cy + (dvy / dist) * pullShape * maxPull;
          }

          const idx = Math.round(
            Math.max(0, Math.min(1, b + symbolWeight)) * SYM_LAST
          );
          const sym = SYMBOLS[idx];

          const g = 65 + Math.floor(b * 170);
          const alpha = (0.35 + b * 0.65).toFixed(2);

          ctx.fillStyle = `rgba(0,${g},8,${alpha})`;
          ctx.fillText(sym, drawX, drawY);
        }
      }

      timeRef.current += step;
      animIdRef.current = requestAnimationFrame(draw);
    }

    draw();

    const onMove = (e: MouseEvent) => {
      const m = mouseRef.current;
      if (!m.active) {
        smoothMouseRef.current.x = e.clientX;
        smoothMouseRef.current.y = e.clientY;
      }
      // Offset mouse relative to canvas position so gooey aligns correctly
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, active: false };
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(animIdRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute opacity-50 inset-0 w-full h-full"
    />
  );
}
