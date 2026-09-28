import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import TerminalDetail from "../components/TerminalDetail";
import { PEAK_ROWS, PixelPeak } from "../components/Progress";
import { Brand, GhostButton, Mixed, PopButton, brandColor, pad } from "../components/ui";
import { questions } from "../data/questions";

const BOOT = [
  { text: "tuwaiq.init()", tone: "cmd" as const },
  { text: "loading track...", tone: "out" as const },
  { text: "ready", tone: "ok" as const },
];

/** Big Latin wordmark; letters rise out of a mask. */
function Wordmark() {
  const word = (text: string, color: (i: number) => string, delay: number) => (
    <span className="block overflow-hidden pb-[0.04em]">
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ color: color(i) }}
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.9, 0.1, 1], delay: delay + i * 0.035 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
  return (
    <h1
      dir="ltr"
      aria-label="TUWAIQ INIT"
      className="text-right font-mono text-[clamp(3.6rem,18vw,8.25rem)] font-extrabold leading-[0.92] tracking-[-0.07em] lg:text-left"
    >
      {word("TUWAIQ", () => "#ededed", 0)}
      <span className="flex items-end justify-end lg:justify-start">
        {word("INIT", (i) => brandColor(0.25 + i * 0.25), 0.2)}
        <span className="cursor mb-[0.12em] w-[0.42em]! h-[0.14em]! text-tq-cyan" />
      </span>
    </h1>
  );
}

// ---------- Sticker board (desktop): the identity stickers, drag them around ----------

function Sticker({
  x,
  y,
  r,
  i,
  board,
  children,
}: {
  x: number;
  y: number;
  r: number;
  i: number;
  board: React.RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  const [z, setZ] = useState(i + 1);
  return (
    <motion.div
      className="absolute cursor-grab touch-none select-none"
      style={{ left: `${x}%`, top: `${y}%`, zIndex: z }}
      drag
      dragConstraints={board}
      dragElastic={0.15}
      dragTransition={{ power: 0.2, timeConstant: 200 }}
      initial={{ scale: 0, rotate: r }}
      animate={{ scale: 1, rotate: r }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.35 + i * 0.07 }}
      whileHover={{ scale: 1.04, rotate: 0 }}
      whileDrag={{ scale: 1.1, rotate: 0, cursor: "grabbing" }}
      onPointerDown={() => setZ(100 + Date.now() % 1000)}
    >
      <div className="drop-shadow-[4px_5px_0_rgba(0,0,0,0.55)]">{children}</div>
    </motion.div>
  );
}

function ModeToggle() {
  const [on, setOn] = useState(true);
  return (
    <motion.div
      onTap={() => setOn((v) => !v)}
      className="flex items-center gap-3 rounded-full border-2 border-tq-line bg-tq-surface py-2 pe-2 ps-5 font-mono text-sm font-bold"
      dir="ltr"
    >
      Tuwaiq Mode
      <span
        className={`flex h-8 w-16 items-center rounded-full px-1 transition-colors ${on ? "justify-end bg-tq-cyan" : "justify-start bg-tq-line"}`}
      >
        <motion.span layout className="grid size-6 place-items-center rounded-full bg-tq-paper text-[9px] text-tq-bg">
          {on ? "ON" : "OFF"}
        </motion.span>
      </span>
    </motion.div>
  );
}

function StickerBoard() {
  const board = useRef<HTMLDivElement>(null);
  const keys = ["CTRL", "IDEA", "BUILD"];
  return (
    <div ref={board} dir="ltr" className="relative h-[min(560px,64vh)] w-full" aria-hidden="true">
      <Sticker i={0} x={30} y={4} r={-4} board={board}>
        <div className="w-56 rounded-3xl border-2 border-tq-line bg-tq-surface p-5">
          <PixelPeak level={PEAK_ROWS} className="w-full" />
          <p className="mt-3 whitespace-nowrap text-center font-mono text-[10px] tracking-[0.14em] text-tq-muted">SMALL STEPS. BIG BUILDS.</p>
        </div>
      </Sticker>
      <Sticker i={1} x={2} y={8} r={-8} board={board}>
        <div className="w-40 rounded-md bg-tq-orange p-4 font-mono text-[13px] font-extrabold leading-snug text-tq-bg">
          GOOD
          <br />
          CODE_
          <br />
          BRIGHTER
          <br />
          TOMORROWS <span className="font-sans">:)</span>
        </div>
      </Sticker>
      <Sticker i={2} x={72} y={30} r={8} board={board}>
        <div className="font-mono text-[5.5rem] font-extrabold leading-none tracking-[-0.12em]" dir="ltr">
          <span className="text-tq-violet">&lt;</span>
          <span className="text-tq-cyan">/</span>
          <span className="text-tq-violet">&gt;</span>
        </div>
      </Sticker>
      <Sticker i={3} x={4} y={60} r={5} board={board}>
        <div className="flex gap-2.5" dir="ltr">
          {keys.map((k, n) => (
            <span
              key={k}
              className={`key grid h-16 min-w-16 place-items-center px-3 font-mono text-sm font-bold ${n === 2 ? "bg-tq-purple! text-white!" : ""}`}
            >
              {k}
            </span>
          ))}
        </div>
      </Sticker>
      <Sticker i={4} x={24} y={43} r={-2} board={board}>
        <div className="rounded-lg border-2 border-tq-line bg-tq-bg px-3.5 py-2 font-mono text-[12px] text-tq-muted" dir="ltr">
          <span className="text-tq-violet">$</span> git commit -m <span className="text-tq-cyan">"hello, track"</span>
        </div>
      </Sticker>
      <Sticker i={5} x={46} y={82} r={-3} board={board}>
        <ModeToggle />
      </Sticker>
      <p className="absolute bottom-0 left-0 font-mono text-[11px] text-tq-muted/60" dir="ltr">
        // canvas · drag to rearrange
      </p>
    </div>
  );
}

export const isNameValid = (name: string) => name.trim().length >= 2;

/** "Initializing member": the required name, typed into the boot session rather than a form field. */
function MemberPrompt({ value, onChange, onSubmit }: { value: string; onChange: (v: string) => void; onSubmit: () => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const ok = isNameValid(value);

  useEffect(() => {
    // Desktop only: focusing on phones would throw the keyboard over the intro.
    if (!value && window.matchMedia("(hover: hover) and (pointer: fine)").matches) ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      dir="ltr"
      className="border-l-2 border-tq-line ps-4 text-left font-mono text-[13px] leading-7 sm:text-sm"
    >
      <p className="text-tq-muted">
        <span className="text-tq-violet">&gt;</span> initializing member...
      </p>
      <p className="mt-2 font-sans text-[17px] font-bold text-tq-paper">
        <bdi>وش اسمك؟</bdi>
      </p>
      <label className="flex items-center gap-2">
        <span className="shrink-0 text-tq-muted">
          <span className="text-tq-violet">&gt;</span> name:
        </span>
        <span className="text-tq-cyan">[</span>
        <input
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && ok) onSubmit();
          }}
          dir={value ? "auto" : "rtl"}
          maxLength={40}
          autoComplete="given-name"
          enterKeyHint="go"
          aria-label="وش اسمك؟"
          aria-required="true"
          placeholder="اكتب اسمك هنا..."
          className="h-11 w-0 min-w-0 flex-1 border-b-2 border-dashed border-tq-line bg-transparent px-1 font-sans text-base text-tq-paper caret-tq-cyan outline-none transition-colors placeholder:text-tq-muted/55 focus:border-tq-cyan"
        />
        <span className="text-tq-cyan">]</span>
      </label>
      <p className="min-h-7" aria-live="polite">
        {ok && (
          <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="inline-block text-tq-cyan">
            ✓ <span className="text-tq-muted">member:</span> <bdi className="text-tq-paper">{value.trim()}</bdi>
            <span className="text-tq-muted"> · session initialized</span>
          </motion.span>
        )}
      </p>
    </motion.div>
  );
}

export default function IntroScreen({
  name,
  onName,
  resumeStep,
  onStart,
}: {
  name: string;
  onName: (name: string) => void;
  /** Question index of a saved draft, or null. */
  resumeStep: number | null;
  onStart: (resume: boolean) => void;
}) {
  const [skip, setSkip] = useState(false);
  const ready = isNameValid(name);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === "Enter" && ready && t.tagName !== "BUTTON" && t.tagName !== "INPUT") onStart(resumeStep !== null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onStart, resumeStep, ready]);

  return (
    <div
      className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 pb-[max(env(safe-area-inset-bottom),20px)] pt-[max(env(safe-area-inset-top),16px)] sm:px-8"
      onPointerDown={() => setSkip(true)}
    >
      <header className="flex items-center justify-between py-2">
        <Brand />
        <span dir="ltr" className="font-mono text-[11px] text-tq-muted">
          // v1.0 · FALL 2026
        </span>
      </header>

      <div className="grid flex-1 items-center gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:py-4">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 font-mono text-xs text-tq-violet"
          >
            <bdi dir="ltr">// 01 — INIT</bdi>
          </motion.p>
          <Wordmark />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <h2 className="mt-8 text-[2.1rem] font-bold leading-tight sm:text-5xl">خلّنا نعرفك أكثر.</h2>
            <p className="mt-3 max-w-md text-[15.5px] leading-8 text-tq-muted sm:text-[17px]">
              <Mixed
                text="كم سؤال سريع يساعدنا نفهم مستواك، اهتماماتك، وإيش ودك تطلع فيه من Programming Track."
                latinClass="text-tq-paper"
              />
            </p>
          </motion.div>

          <TerminalDetail lines={BOOT} instant={skip} delay={0.5} className="mt-7" />
          <MemberPrompt value={name} onChange={onName} onSubmit={() => onStart(resumeStep !== null)} />
        </div>

        <div className="hidden lg:block">
          <StickerBoard />
        </div>
      </div>

      <motion.footer
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center"
      >
        <PopButton
          primary
          kbd="↵"
          className="h-16 w-full sm:w-72"
          disabled={!ready}
          onClick={() => onStart(resumeStep !== null)}
          icon={<span aria-hidden="true">←</span>}
        >
          {resumeStep !== null ? `كمّل من السؤال ${pad(resumeStep + 1)}` : "ابدأ"}
        </PopButton>
        {resumeStep !== null && <GhostButton disabled={!ready} onClick={() => onStart(false)}>ابدأ من جديد</GhostButton>}
        <p className="text-center font-mono text-[11px] text-tq-muted sm:ms-auto sm:text-start">
          <bdi dir="ltr">{pad(questions.length)} questions · ~3 min</bdi>
        </p>
      </motion.footer>
    </div>
  );
}
