import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const LETTERS = "FRONTLINE".split("");

interface LoadingScreenProps {
  visible: boolean;
}

export default function LoadingScreen({ visible }: LoadingScreenProps) {
  const [lettersVisible, setLettersVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setLettersVisible(true), 400);
      return () => clearTimeout(t);
    }
    setLettersVisible(false);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "oklch(0.06 0.008 240)" }}
          data-ocid="loading.modal"
        >
          {/* Ambient glow blobs */}
          <div
            className="absolute rounded-full opacity-20 pointer-events-none"
            style={{
              width: 600,
              height: 600,
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(212,160,23,0.3) 0%, transparent 70%)",
            }}
          />

          {/* Pulsing rings */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 160 + i * 60,
                height: 160 + i * 60,
                top: "50%",
                left: "50%",
                border: `1px solid rgba(212,160,23,${0.15 - i * 0.04})`,
                animation: `ringExpand ${2 + i * 0.6}s ease-out ${i * 0.4}s infinite`,
              }}
            />
          ))}

          {/* Cricket Ball */}
          <div
            className="relative mb-10"
            style={{ animation: "cricketSpin 1.4s linear infinite" }}
          >
            {/* Ball glow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow:
                  "0 0 30px rgba(180,30,30,0.6), 0 0 70px rgba(180,30,30,0.25)",
              }}
            />
            {/* Ball body */}
            <div
              className="relative rounded-full"
              style={{
                width: 110,
                height: 110,
                background:
                  "radial-gradient(circle at 35% 32%, #e04545 0%, #b01a1a 45%, #7a0e0e 80%, #4a0808 100%)",
                boxShadow:
                  "inset 0 -10px 24px rgba(0,0,0,0.6), inset 0 4px 12px rgba(255,100,100,0.15)",
              }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full"
                style={{ overflow: "visible" }}
              >
                <path
                  d="M 8 50 Q 25 38 50 50 Q 75 62 92 50"
                  fill="none"
                  stroke="#f5e6c8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {[20, 28, 36, 44, 52, 60, 68, 76].map((x, idx) => (
                  <g key={x}>
                    <line
                      x1={x}
                      y1={43 + (idx % 2) * 1}
                      x2={x + 2}
                      y2={46 + (idx % 2) * 1}
                      stroke="#f5e6c8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1={x}
                      y1={57 - (idx % 2) * 1}
                      x2={x + 2}
                      y2={54 - (idx % 2) * 1}
                      stroke="#f5e6c8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                ))}
              </svg>
              {/* Shine */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 30,
                  height: 20,
                  top: 14,
                  left: 20,
                  background:
                    "radial-gradient(ellipse, rgba(255,255,255,0.4) 0%, transparent 80%)",
                  transform: "rotate(-30deg)",
                }}
              />
            </div>
            {/* Shadow */}
            <div
              className="absolute -bottom-3 left-1/2 rounded-full"
              style={{
                width: 90,
                height: 16,
                transform: "translateX(-50%)",
                background:
                  "radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)",
                animation: "shadowPulse 1.4s linear infinite",
              }}
            />
          </div>

          {/* Letter-by-letter reveal */}
          <div className="flex items-center gap-0.5 mb-2">
            {LETTERS.map((letter) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0, y: 16 }}
                animate={
                  lettersVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                }
                transition={{
                  delay: LETTERS.indexOf(letter) * 0.06,
                  duration: 0.4,
                  ease: [0.2, 0, 0.2, 1],
                }}
                className="font-display font-black text-4xl sm:text-5xl"
                style={{ color: "#D4A017", letterSpacing: "-0.02em" }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={lettersVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-white/50 text-xs font-semibold tracking-[0.35em] uppercase mb-8"
          >
            Sports Academy
          </motion.p>

          {/* Loading dots */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: "#D4A017",
                  animation: `dotBounce 1s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
