import React, { useEffect, useRef } from "react";

const LEVELS = [
  {
    number: 1,
    title: "VAPE ITSELF",
    description: "Tahukah kalian apa itu vape?",
    side: "left",
  },
  {
    number: 2,
    title: "WHAT'S INSIDE?",
    description: "Tahukah kalian apa saja kandungan di dalam vape?",
    side: "right",
  },
  {
    number: 3,
    title: "ONE PUFF",
    description: "Apa yang terjadi saat menggunakan vape?",
    side: "left",
  },
  {
    number: 4,
    title: "LUNG EFFECT",
    description: "Bagaimana vape memengaruhi paru-paru?",
    side: "right",
  },
  {
    number: 5,
    title: "HEALTH RISK",
    description: "Apakah vape menyebabkan penyakit?",
    side: "left",
  },
  {
    number: 6,
    title: "LONG TERM",
    description: "Dampak jangka panjang vape.",
    side: "right",
  },
  {
    number: 7,
    title: "ADDICTION",
    description: "Apakah vape menyebabkan kecanduan?",
    side: "left",
  },
  {
    number: 8,
    title: "BEYOND HEALTH",
    description: "Dampak fisik, psikologis, ekonomi, dan sosial.",
    side: "right",
  },
  {
    number: 9,
    title: "NICOTINE FREE",
    description: "Bagaimana vape tanpa nikotin?",
    side: "left",
  },
  {
    number: 10,
    title: "VAPE VS CIGARETTE",
    description: "Vape vs rokok.",
    side: "right",
  },
  {
    number: 11,
    title: "MYTH & FACT",
    description: "Mitos dan fakta tentang vape.",
    side: "left",
  },
  {
    number: 12,
    title: "WHO SHOULD AVOID?",
    description: "Siapa yang perlu menghindari vape?",
    side: "right",
  },
];

function LevelNode({ level, onStart }) {
  return (
    <div id={`map-level-${level.number}`} className={`map-level map-level-${level.side}`}>
      <div className="map-level-art">
        <div className="level-glow" />

        <img
          src={
            level.number === 1
              ? "/assets/Goa.png"
              : `/assets/goa-level${level.number}.png`
          }
          alt={`Goa level ${level.number}`}
          className="map-cave"
        />
      </div>

      <div className="map-level-card">
        <div className="map-level-label">
          LEVEL {level.number}
        </div>

        <h2>{level.title}</h2>

        <p>{level.description}</p>

        <button
          type="button"
          onClick={() => onStart?.(level.number)}
          className="start-button"
        >
          START <span>○</span>
        </button>
      </div>
    </div>
  );
}

export default function VapeJourneyLanding({ onStartLevel, scrollToLevel = null }) {
  const exploreJourneyRef = useRef(null);
  useEffect(() => {
    const cancelExploreJourney = () => {
      if (exploreJourneyRef.current) {
        window.clearTimeout(exploreJourneyRef.current);
        exploreJourneyRef.current = null;
      }
    };

    window.addEventListener("wheel", cancelExploreJourney, { passive: true });
    window.addEventListener("touchstart", cancelExploreJourney, { passive: true });
    window.addEventListener("keydown", cancelExploreJourney);

    return () => {
      window.removeEventListener("wheel", cancelExploreJourney);
      window.removeEventListener("touchstart", cancelExploreJourney);
      window.removeEventListener("keydown", cancelExploreJourney);

      if (exploreJourneyRef.current) {
        window.clearTimeout(exploreJourneyRef.current);
        exploreJourneyRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!scrollToLevel) return;

    // Tunggu satu frame supaya seluruh peta sudah ter-render,
    // lalu arahkan viewport tepat ke kartu level (atau section finish)
    // yang dipilih.
    const isFinishTarget = scrollToLevel === "finish";
    const targetId = isFinishTarget ? "map-finish" : `map-level-${scrollToLevel}`;

    const timer = window.setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: isFinishTarget ? "end" : "center",
        });
      }
    }, 80);

    return () => window.clearTimeout(timer);
  }, [scrollToLevel]);

  const handleStart = (level) => {
    if (onStartLevel) {
      onStartLevel(level);
      return;
    }

    console.log(`START LEVEL ${level}`);
  };

  return (
    <main className="vape-map-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #03194a;
        }

        .vape-map-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          color: #fff;
          background:
            radial-gradient(
              ellipse at 50% 10%,
              rgba(32, 102, 196, 0.35) 0%,
              rgba(4, 33, 91, 0.18) 35%,
              transparent 65%
            ),
            linear-gradient(
              180deg,
              #020b29 0%,
              #03245e 32%,
              #063c86 72%,
              #07509b 100%
            );
          font-family: "Space Mono", monospace;
        }

        /* =========================
           BACKGROUND
        ========================= */

        .vape-map-page::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.45;
          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(255,255,255,0.06) 0 2px,
              transparent 3px
            ),
            radial-gradient(
              circle at 80% 45%,
              rgba(255,255,255,0.05) 0 2px,
              transparent 3px
            );
          background-size: 90px 90px, 130px 130px;
        }

        .map-smoke {
          position: absolute;
          pointer-events: none;
          opacity: 1;
          filter: none;
          animation: smokeFloat 8s ease-in-out infinite;
          z-index: 1;
        }

        .map-smoke-left {
          left: -105px;
          top: -100px;
          width: 700px;
        }

        @keyframes smokeFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(20px, -20px, 0);
          }
        }

        /* =========================
           TOP BAR
        ========================= */

        .map-top-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 6px;
          background: linear-gradient(
            90deg,
            #ff3fb0 0%,
            #ff3fb0 24%,
            #5a8bff 24%,
            #5a8bff 100%
          );
          box-shadow: 0 0 18px rgba(255, 63, 176, 0.65);
          z-index: 20;
        }

        .map-header {
          position: relative;
          z-index: 2;
          width: min(1000px, 90%);
          margin: 0 auto;
          padding-top: 80px;
          min-height: 560px;
        }

        .map-header-art {
          position: absolute;
          ObjectFit: content;
          right: -740px;
          top: -200px;
          width: 1700px;
          max-width: none;
          opacity: 0.8;
          pointer-events: none;
          z-index: 1;
        }


        .map-header-art::before {
          content: "";
          position: absolute;
          z-index: -1;
          inset: 12% 5% 4%;
          border-radius: 50%;
          background:
            radial-gradient(circle at 52% 40%, rgba(0, 229, 255, 0.35), transparent 38%),
            radial-gradient(circle at 30% 72%, rgba(255, 63, 176, 0.22), transparent 48%);
          filter: blur(28px);
          animation: heroAura 4.5s ease-in-out infinite;
        }

        .map-header-art img {
          width: 100%;
          max-height: none;
          height: auto;
          object-fit: contain;
          filter:
            drop-shadow(0 0 13px rgba(0, 229, 255, 0.85))
            drop-shadow(0 0 30px rgba(57, 116, 255, 0.65))
            drop-shadow(0 0 38px rgba(255, 63, 176, 0.25));
          animation: heroBreathe 4.5s ease-in-out infinite;
        }

        @keyframes heroAura {
          0%, 100% { opacity: 0.65; transform: scale(0.96); }
          50% { opacity: 1; transform: scale(1.06); }
        }

        @keyframes heroBreathe {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.015); }
        }

        .map-header-content {
          position: relative;
          z-index: 4;
          width: 540px;
          max-width: 56%;
          padding-top: 45px;
        }

        .map-kicker {
          margin: 0 0 18px;
          color: #dce8ff;
          font-family: "Press Start 2P", monospace;
          font-size: 13px;
          line-height: 1.8;
          letter-spacing: 1px;
        }

        .map-title {
          margin: 0;
          font-family: "Press Start 2P", monospace;
          font-size: clamp(35px, 5.7vw, 72px);
          line-height: 1.05;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #f3f5ff;
          text-shadow:
            0 4px 0 #18295a,
            0 0 22px rgba(255,255,255,0.25);
        }

        .map-title span {
          display: block;
          color: #ff3fb0;
          text-shadow:
            0 4px 0 #7e155d,
            0 0 28px rgba(255, 63, 176, 0.55);
        }

        .map-subtitle {
          margin: 12px 0 0;
          max-width: 500px;
          color: #f4f6ff;
          font-family: "Chakra Petch", sans-serif;
          font-size: clamp(22px, 2.5vw, 32px);
          line-height: 1.15;
          font-weight: 900;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          text-shadow: 0 0 18px rgba(255,255,255,0.18);
        }

        .journey-feature-card {
          position: relative;
          display: flex;
          align-items: center;
          width: min(560px, 100%);
          min-height: 105px;
          margin-top: 28px;
          padding: 17px 22px;
          overflow: hidden;
          border: 1px solid rgba(91, 145, 255, 0.75);
          border-left: 4px solid #ff3fb0;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(28, 59, 117, 0.96), rgba(7, 25, 65, 0.96));
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.28), 0 0 25px rgba(52, 116, 255, 0.15), inset 0 0 20px rgba(74, 130, 255, 0.08);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .journey-feature-card::before { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(255, 63, 176, 0.08), transparent 45%); pointer-events: none; }
        .journey-feature-card:hover { transform: translateY(-4px); border-color: #5a8bff; box-shadow: 0 16px 40px rgba(0, 0, 0, 0.34), 0 0 30px rgba(90, 139, 255, 0.28); }
        .journey-feature-number { position: relative; z-index: 2; display: flex; flex-shrink: 0; align-items: center; justify-content: center; width: 64px; height: 64px; border: 2px solid #ff3fb0; border-radius: 50%; background: #071b4b; color: #ff8ad1; font-family: "Press Start 2P", monospace; font-size: 13px; box-shadow: 0 0 18px rgba(255, 63, 176, 0.4), inset 0 0 12px rgba(255, 63, 176, 0.12); }
        .journey-feature-content { position: relative; z-index: 2; margin-left: 20px; }
        .journey-feature-label { display: block; margin-bottom: 5px; color: #00e5ff; font-family: "Press Start 2P", monospace; font-size: 8px; letter-spacing: 1.5px; }
        .journey-feature-content h2 { margin: 0; color: #fff; font-family: "Press Start 2P", monospace; font-size: clamp(18px, 2.2vw, 27px); line-height: 1.2; text-shadow: 0 0 14px rgba(255, 255, 255, 0.2); }
        .journey-feature-content p { margin: 6px 0 0; color: #c8d8fa; font-family: "Chakra Petch", sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.5px; }
        .journey-feature-arrow { position: relative; z-index: 2; margin-left: auto; color: #ff3fb0; font-family: "Press Start 2P", monospace; font-size: 25px; animation: featureArrow 1.8s ease-in-out infinite; }
        @keyframes featureArrow { 0%, 100% { transform: translateX(0); opacity: 0.7; } 50% { transform: translateX(7px); opacity: 1; } }

        .map-description {
          width: 470px;
          max-width: 100%;
          margin: 25px 0;
          color: #d7e4ff;
          font-size: 15px;
          line-height: 1.8;
        }

        .explore-button {
          border: 1px solid #5a8bff;
          border-radius: 5px;
          padding: 13px 28px;
          background: #0c397d;
          color: white;
          font-family: "Chakra Petch", sans-serif;
          font-size: 17px;
          font-weight: 800;
          cursor: pointer;
          box-shadow:
            0 0 16px rgba(90,139,255,0.45),
            inset 0 0 10px rgba(255,63,176,0.15);
          transition: 0.2s ease;
        }

        .explore-button:hover {
          transform: translateY(-3px);
          border-color: #ff3fb0;
          box-shadow:
            0 0 24px rgba(255,63,176,0.45),
            inset 0 0 14px rgba(255,63,176,0.18);
        }

        /* =========================
           MAP
        ========================= */

        .journey-map {
          position: relative;
          z-index: 3;
          width: min(1000px, 94%);
          margin: 0 auto;
          padding-bottom: 180px;
        }

        .map-level {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;

          min-height: 450px;

          margin-bottom: 45px;
        }

        .map-level-left {
          justify-content: flex-start;
        }

        .map-level-right {
          justify-content: flex-end;
        }

        .map-level-art {
          position: absolute;
          top: 0;

          width: 480px;
          height: 400px;

          z-index: 3;
        }

        .map-level-left .map-level-art {
          left: 5px;
        }

        .map-level-right .map-level-art {
          right: 5px;
        }

        .map-level-art::after {
          content: "";

          position: absolute;
          z-index: 1;

          left: 50%;
          bottom: 35px;

          width: 260px;
          height: 200px;

          transform: translateX(-50%);

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(255, 210, 93, 0.95) 0%,
              rgba(255, 139, 28, 0.62) 25%,
              rgba(255, 95, 23, 0.2) 50%,
              transparent 72%
            );

          filter: blur(18px);

          animation: caveLight 2.7s ease-in-out infinite;
        }

        .map-cave {
          position: absolute;
          left: 50%;
          bottom: 0;

          width: 460px;
          height: 350px;

          object-fit: contain;

          transform: translateX(-50%);

          filter:
            drop-shadow(0 0 18px rgba(255, 164, 38, 0.7))
            drop-shadow(0 0 30px rgba(24, 101, 202, 0.9));

          animation: caveFloat 4s ease-in-out infinite;

          z-index: 2;
        }

        .map-level:nth-child(2n) .map-cave {
          animation-delay: -1s;
        }

        .map-level:nth-child(3n) .map-cave {
          animation-delay: -2s;
        }

        @keyframes caveFloat {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }

          50% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        @keyframes caveLight {
          0%, 100% { opacity: 0.72; transform: translateX(-50%) scale(0.94); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
        }

        .level-glow {
          position: absolute;

          left: 50%;
          bottom: 32px;

          width: 330px;
          height: 115px;

          transform: translateX(-50%);

          border-radius: 50%;

          background: rgba(35, 113, 255, 0.38);

          filter: blur(28px);

          z-index: 0;
        }

        /* =========================
           LEVEL CARD
        ========================= */

        .map-level-card {
          position: relative;
          z-index: 5;
          width: 430px;
          min-height: 165px;
          padding: 25px 28px;
          border: 1px solid #416fc2;
          border-radius: 8px;
          background:
            linear-gradient(
              135deg,
              rgba(18, 42, 91, 0.96),
              rgba(7, 25, 65, 0.96)
            );
          box-shadow:
            0 10px 35px rgba(0,0,0,0.28),
            inset 0 0 20px rgba(56,112,206,0.08);
          backdrop-filter: blur(5px);
          transition: 0.25s ease;
        }

        .map-level-left .map-level-card {
          margin-left: 520px;
        }

        .map-level-right .map-level-card {
          margin-right: 520px;
        }

        .map-level-card:hover {
          transform: translateY(-5px);
          border-color: #ff3fb0;
          box-shadow:
            0 12px 35px rgba(0,0,0,0.32),
            0 0 22px rgba(255,63,176,0.16);
        }

        .map-level-label {
          margin-bottom: 8px;
          color: #00e5ff;
          font-family: "Press Start 2P", monospace;
          font-size: 9px;
          letter-spacing: 1px;
        }

        .map-level-card h2 {
          margin: 0 0 9px;
          color: #f3f6ff;
          font-family: "Chakra Petch", sans-serif;
          font-size: 25px;
          font-weight: 800;
          line-height: 1.05;
        }

        .map-level-card p {
          margin: 0 0 15px;
          color: #c3d2f0;
          font-size: 12px;
          line-height: 1.55;
        }

        .start-button {
          border: 1px solid #5a8bff;
          border-radius: 4px;
          padding: 8px 16px;
          background: #0a397e;
          color: white;
          font-family: "Chakra Petch", sans-serif;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(90,139,255,0.28);
          transition: 0.2s ease;
        }

        .start-button span {
          color: #5a8bff;
          margin-left: 5px;
        }

        .start-button:hover {
          transform: translateY(-2px);
          border-color: #ff3fb0;
          box-shadow: 0 0 17px rgba(255,63,176,0.4);
        }

        /* =========================
           STONE PATH
        ========================= */

        .stone-path {
          position: relative;
          isolation: isolate;
          width: 260px;
          height: 290px;
          margin: -70px auto -35px;
          z-index: 2;
          pointer-events: none;
          background-image:
            radial-gradient(ellipse at center, rgba(40, 122, 255, 0.2), transparent 68%),
            url("/assets/jalan.png");
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100% 100%, 82% auto;
          opacity: 1;
          filter: drop-shadow(0 0 10px rgba(37, 121, 255, 0.6)) drop-shadow(0 8px 10px rgba(0,0,0,0.42));
        }

        /* =========================
           PATH LANTERNS
        ========================= */

        .path-lantern {
          position: absolute;
          top: 50%;
          width: 145px;
          height: 145px;
          z-index: 6;
          pointer-events: none;
          transform: translateY(-50%);
          animation: lanternFloat 4.5s ease-in-out infinite;
        }

        .path-lantern-left {
          right: calc(100% + 8px);
        }

        .path-lantern-right {
          left: calc(100% + 8px);
        }

        .path-lantern-image {
          position: relative;
          z-index: 2;
          display: block;
          width: 145px;
          height: 145px;
          object-fit: contain;
          filter:
            drop-shadow(0 0 7px rgba(255, 187, 55, 0.95))
            drop-shadow(0 0 18px rgba(255, 143, 25, 0.82))
            drop-shadow(0 0 32px rgba(255, 101, 15, 0.48));
          animation: lanternLight 2.2s ease-in-out infinite;
        }

        .lantern-glow {
          position: absolute;
          z-index: 1;
          left: 50%;
          top: 51%;
          width: 62px;
          height: 62px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 224, 121, 0.92) 0%,
            rgba(255, 165, 40, 0.62) 30%,
            rgba(255, 105, 20, 0.24) 58%,
            transparent 74%
          );
          filter: blur(8px);
          opacity: 0.9;
          animation: lanternGlow 2.2s ease-in-out infinite;
        }

        .path-lantern-right .lantern-glow,
        .path-lantern-right .path-lantern-image {
          animation-delay: -0.8s;
        }

        @keyframes lanternFloat {
          0%, 100% {
            transform: translateY(-50%) translateY(0);
          }
          50% {
            transform: translateY(-50%) translateY(-4px);
          }
        }

        @keyframes lanternLight {
          0%, 100% {
            filter:
              drop-shadow(0 0 6px rgba(255, 187, 55, 0.9))
              drop-shadow(0 0 16px rgba(255, 143, 25, 0.72))
              drop-shadow(0 0 28px rgba(255, 101, 15, 0.42));
          }
          50% {
            filter:
              drop-shadow(0 0 10px rgba(255, 218, 91, 1))
              drop-shadow(0 0 24px rgba(255, 154, 31, 0.95))
              drop-shadow(0 0 42px rgba(255, 99, 15, 0.58));
          }
        }

        @keyframes lanternGlow {
          0%, 100% {
            opacity: 0.68;
            transform: translate(-50%, -50%) scale(0.9);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.14);
          }
        }

        /* =========================
           SIDE DECORATION
        ========================= */

        .map-vape {
          position: absolute;
          width: 120px;
          object-fit: content;
          opacity: 1;
          filter:
            drop-shadow(0 0 16px rgba(255,63,176,0.55));
          pointer-events: none;
          animation: vapeFloat 5s ease-in-out infinite;
          z-index: 1;
        }

        .map-vape-1 {
          left: 0;
          top: 900px;
        }

        .map-vape-2 {
          right: 10px;
          top: 1650px;
          animation-delay: -2s;
        }

        .map-vape-3 {
          left: 10px;
          top: 2450px;
          animation-delay: -1s;
        }

        .map-vape-4 {
          right: 0;
          top: 3150px;
          animation-delay: -3.5s;
        }

        .map-vape-5 {
          left: 5px;
          top: 3900px;
          animation-delay: -4.5s;
        }

        .map-vape-6 {
          right: 15px;
          top: 4650px;
          animation-delay: -1.5s;
        }

        .map-vape-7 {
          left: 0;
          top: 5400px;
          animation-delay: -5.5s;
        }

        @keyframes vapeFloat {
          0%, 100% {
            transform: translateY(0) rotate(-3deg);
          }

          50% {
            transform: translateY(-14px) rotate(3deg);
          }
        }


        /* =========================
           RANDOM MAP DECORATIONS
        ========================= */

        .map-decoration {
          position: absolute;
          pointer-events: none;
          z-index: 1;
          opacity: 1;
          user-select: none;
        }

        .map-decoration-crystal {
          width: 165px;
          height: auto;
          object-fit: contain;
          opacity: 1;
          animation: crystalFloat 5.5s ease-in-out infinite;
        }

        .map-decoration-crystal.right {
          right: -105px;
          filter:
            drop-shadow(0 0 8px rgba(255, 126, 45, 0.95))
            drop-shadow(0 0 18px rgba(255, 170, 65, 0.85))
            drop-shadow(0 0 30px rgba(167, 100, 255, 0.62));
        }

        .map-decoration-crystal.left {
          left: -105px;
          filter:
            drop-shadow(0 0 8px rgba(255, 92, 205, 0.95))
            drop-shadow(0 0 18px rgba(197, 109, 255, 0.82))
            drop-shadow(0 0 30px rgba(255, 167, 75, 0.58));
        }

        @keyframes crystalFloat {
          0%, 100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }

        .map-decoration-crystal:nth-of-type(1) { animation-delay: -0.8s; }
        .map-decoration-crystal:nth-of-type(2) { animation-delay: -2.1s; }
        .map-decoration-crystal:nth-of-type(3) { animation-delay: -3.4s; }
        .map-decoration-crystal:nth-of-type(4) { animation-delay: -4.7s; }
        .map-decoration-crystal:nth-of-type(5) { animation-delay: -1.6s; }
        .map-decoration-crystal:nth-of-type(6) { animation-delay: -3.9s; }
        .map-decoration-crystal:nth-of-type(7) { animation-delay: -5.2s; }
        .map-decoration-crystal:nth-of-type(8) { animation-delay: -2.8s; }


        /* =========================
           FINISH
        ========================= */

        .map-finish {
          position: relative;
          z-index: 4;
          width: min(4000px, 100%);
          margin: 0 auto;
          padding: 0 20px 78px;
          text-align: center;
          overflow: hidden;
        }

        .finish-line {
          display: none;
        }

        .finish-image {
          position: relative;
          z-index: 0;
          display: block;
          width: min(1020px, 100%);
          height: auto;
          margin: 0 auto;
          object-fit: contain;
          transform: translateY(80px);
          filter: drop-shadow(0 0 22px rgba(90,139,255,0.28));
        }

        .finish-copy {
          position: relative;
          margin: 0 -20px -78px;
          padding: 28px 20px 78px;
          background: #061b4d;
          border-top: 1px solid rgba(120, 170, 255, 0.32);
          box-shadow: 0 -6px 24px rgba(40, 100, 210, 0.12);
        }

        .finish-title {
          margin: 0 auto;
          max-width: 650px;
          font-family: "Press Start 2P", monospace;
          font-size: clamp(18px, 2.7vw, 30px);
          line-height: 1.6;
          color: #ffffff;
          text-shadow: 0 0 18px rgba(90,139,255,0.45);
        }

        .finish-subtitle {
          display: none;
        }

        .finish-top-button {
          display: block;
          margin: 0 auto 20px;
        }
          
        .finish-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 185px;
          min-height: 48px;
          margin-top: 36px;
          padding: 12px 24px;
          border: 1px solid rgba(95,145,255,0.55);
          border-radius: 5px;
          background: rgba(45,72,125,0.72);
          color: #ffffff;
          font-family: "Press Start 2P", monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
          cursor: pointer;
          box-shadow: 0 0 22px rgba(70,120,255,0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .finish-button:hover {
          transform: translateY(-2px);
          background: rgba(55,88,150,0.86);
          box-shadow: 0 0 28px rgba(70,120,255,0.38);
        }

        .finish-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 22px;
          margin-top: 36px;
        }

        .finish-game-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          width: min(660px, 100%);
        }

        .finish-button-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          width: 100%;
        }

        .finish-actions .finish-button {
          margin-top: 0;
          text-decoration: none;
        }

        .finish-game {
          width: min(660px, 100%);
          aspect-ratio: 485 / 402;
          overflow: hidden;
          border: 1px solid rgba(96, 226, 255, 0.55);
          border-radius: 6px;
          background: #000;
          box-shadow: 0 0 24px rgba(0, 229, 255, 0.22);
        }

        .finish-game iframe {
          display: block;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .finish-rules {
          position: relative;
          width: min(620px, 100%);
          padding: 16px 28px 14px;
          overflow: hidden;
          border: 1px solid rgba(0, 229, 255, 0.55);
          border-left: 4px solid #ff3fb0;
          border-radius: 10px;
          background: linear-gradient(145deg, rgba(23, 57, 117, 0.96), rgba(7, 25, 65, 0.98));
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3), 0 0 24px rgba(0, 229, 255, 0.14), inset 0 0 20px rgba(255, 63, 176, 0.08);
          text-align: left;
        }

        .finish-rules::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(255, 63, 176, 0.12), transparent 48%, rgba(0, 229, 255, 0.08));
        }

        .finish-rules-label,
        .finish-rules-list {
          position: relative;
          z-index: 1;
        }

        .finish-rules-label {
          display: block;
          margin-bottom: 12px;
          color: #00e5ff;
          font-family: "Press Start 2P", monospace;
          font-size: 11px;
          letter-spacing: 1px;
          text-shadow: 0 0 12px rgba(0, 229, 255, 0.45);
        }

        .finish-rules-list {
          display: grid;
          gap: 9px;
          margin: 0;
          padding: 0;
          list-style: none;
          color: #d7e4ff;
          font-family: "Chakra Petch", sans-serif;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.2;
        }

        .finish-rules-list li {
          position: relative;
          padding-left: 20px;
        }

        .finish-rules-list li::before {
          content: "◆";
          position: absolute;
          left: 0;
          top: 1px;
          color: #ff3fb0;
          font-size: 11px;
          text-shadow: 0 0 10px rgba(255, 63, 176, 0.7);
        }

        .finish-button-video {
          border-color: rgba(255, 99, 160, 0.6);
          background: rgba(126, 38, 84, 0.72);
          box-shadow: 0 0 22px rgba(255, 63, 176, 0.25);
        }

        .finish-button-video:hover {
          background: rgba(158, 48, 106, 0.86);
          box-shadow: 0 0 28px rgba(255, 63, 176, 0.42);
        }

        .finish-button-game {
          border-color: rgba(96, 226, 255, 0.6);
          background: rgba(20, 94, 126, 0.72);
          box-shadow: 0 0 22px rgba(0, 229, 255, 0.22);
        }

        .finish-button-game:hover {
          background: rgba(26, 121, 161, 0.86);
          box-shadow: 0 0 28px rgba(0, 229, 255, 0.4);
        }

        /* =========================
           SMALL LAPTOP / NARROW WINDOW
           Between phone-size and the point where the
           desktop layout above is already "capped" at a
           fixed 1000px column (roughly 1100px+, which is
           why real 14"/15" laptops render unchanged) —
           this just keeps things from overflowing on
           smaller or unmaximized windows in between.
        ========================= */

        @media (min-width: 601px) and (max-width: 1150px) {
          .map-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 55px;
            padding-bottom: 25px;
            min-height: auto;
          }

          .map-header-content {
            width: 100%;
            max-width: 640px;
            padding-top: 0;
            text-align: center;
          }

          .map-header-art {
            position: relative;
            top: auto;
            left: auto;
            right: auto;
            width: min(480px, 55%);
            max-width: 55%;
            margin: 0 auto 14px;
            transform: none;
          }

          .map-title {
            font-size: clamp(40px, 6vw, 60px);
          }

          .map-subtitle {
            font-size: clamp(22px, 2.7vw, 28px);
            max-width: 100%;
          }

          .map-description {
            margin-left: auto;
            margin-right: auto;
          }

          .map-level-art {
            width: clamp(230px, 42vw, 480px);
            height: clamp(190px, 35vw, 400px);
          }

          .map-cave {
            width: clamp(220px, 40vw, 460px);
            height: clamp(170px, 30vw, 350px);
          }

          .level-glow {
            width: clamp(190px, 29vw, 330px);
          }

          .map-level {
            min-height: clamp(280px, 39vw, 450px);
          }

          .map-level-card {
            width: clamp(240px, 37vw, 430px);
          }

          .map-level-left .map-level-card {
            margin-left: clamp(200px, 45vw, 520px);
          }

          .map-level-right .map-level-card {
            margin-right: clamp(200px, 45vw, 520px);
          }

          .map-level-card h2 {
            font-size: clamp(19px, 2vw, 25px);
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 600px) {
          .landing-map {
            padding-inline: 22px;
          }

          .landing-map .map-level {
            grid-template-columns: 56px 1fr;
            gap: 12px;
          }

          .landing-map .map-level img {
            display: none;
          }

          .landing-map__line {
            left: 48px;
          }
          .map-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: auto;
            padding-top: 36px;
            padding-bottom: 10px;
          }

          .map-header-content {
            width: 100%;
            max-width: 100%;
            padding-top: 0;
            text-align: center;
          }

          .map-header-art {
            position: relative;
            top: auto;
            left: auto;
            right: auto;
            width: min(340px, 78%);
            max-width: 78%;
            margin: 0 auto 6px;
            transform: none;
            z-index: 1;
          }


          .map-title {
            font-size: clamp(28px, 9vw, 40px);
          }

          .map-subtitle {
            font-size: clamp(16px, 4.6vw, 21px);
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
          }

          .map-description {
            font-size: clamp(12px, 3.4vw, 14px);
            margin-left: auto;
            margin-right: auto;
          }

          .explore-button {
            padding: 13px 22px;
            font-size: 15px;
          }

          .journey-map {
            width: 100%;
            padding: 0 20px 100px;
          }

          .journey-map::before {
            left: 31px;
            transform: none;
          }

          .map-level,
          .map-level-left,
          .map-level-right {
            display: block;
            min-height: 390px;
            padding-left: clamp(48px, 16vw, 65px);
            margin-bottom: 30px;
          }

          .map-level-art,
          .map-level-left .map-level-art,
          .map-level-right .map-level-art {
            position: relative;
            left: auto;
            right: auto;
            top: auto;
            width: 100%;
            height: 225px;
          }

          .map-level-left .map-level-art,
          .map-level-right .map-level-art {
            margin-left: 0;
          }

          .map-cave {
            left: 50%;
            width: min(78%, 300px);
            height: auto;
            aspect-ratio: 31 / 23;
          }

          .level-glow {
            left: 50%;
          }

          .map-level-card,
          .map-level-left .map-level-card,
          .map-level-right .map-level-card {
            width: 100%;
            margin: 0;
          }

          .map-level-card h2 {
            font-size: clamp(17px, 5.2vw, 21px);
          }

          .map-level-card p {
            font-size: clamp(11px, 3.1vw, 12.5px);
          }

          .stone-path {
            width: 165px;
            height: 190px;
            margin: -45px auto -15px;
          }

          .path-lantern {
            width: 92px;
            height: 92px;
          }

          .path-lantern-image {
            width: 92px;
            height: 92px;
          }

          .path-lantern-left {
            right: calc(100% - 8px);
          }

          .path-lantern-right {
            left: calc(100% - 8px);
          }

          .map-decoration-smoke {
            width: 170px;
          }

          .map-decoration-crystal {
            width: 105px;
          }

          .map-decoration-smoke.right,
          .map-decoration-smoke.left {
            right: auto;
            left: auto;
          }

          .map-decoration-smoke.right,
          .map-decoration-crystal.right {
            right: -80px;
          }

          .map-decoration-smoke.left,
          .map-decoration-crystal.left {
            left: -80px;
          }

          .map-vape {
            display: none;
          }

          .map-finish {
            min-height: 520px;
            padding-bottom: 50px;
          }

          .finish-image {
            width: 100%;
          }

          .finish-title {
            margin-top: 20px;
            font-size: 16px;
          }

          .finish-button {
            margin-top: 28px;
          }

          .finish-actions {
            gap: 24px;
            margin-top: 28px;
          }

          .finish-game-area {
            width: 100%;
          }

          .finish-button-row {
            gap: 12px;
          }

          .finish-actions .finish-button {
            width: 100%;
            max-width: 280px;
            margin-top: 0;
          }

          .finish-game {
            width: min(100%, calc(100vw - 40px));
          }

          .finish-rules {
            width: min(100%, calc(100vw - 40px));
            padding: 14px 18px 12px;
          }
        }
      `}</style>

      <div className="map-top-line" />

      {/* BACKGROUND SMOKE */}
      <img
        src="/assets/vape dengan efek asap.png"
        alt=""
        className="map-smoke map-smoke-left"
      />

      {/* =========================
          HERO
      ========================= */}

      <header className="map-header">
        <div className="map-header-art">
          <img
            src="/assets/paru-paru-atas.png"
            alt="Ilustrasi paru-paru dan saluran pernapasan"
          />
        </div>

        <div className="map-header-content">
          <p className="map-kicker">
            THE VAPE JOURNEY
          </p>

          <h1 className="map-title">
            ONE PUFF
          </h1>

          <p className="map-subtitle">
            WHAT HAPPENS INSIDE YOUR BODY?
          </p>

          <p className="map-description">
            Jelajahi apa yang terjadi di dalam tubuh
            saat vape digunakan.
          </p>

          <button
            type="button"
            className="explore-button"
            onClick={() => {
              // Stop a previous tour before starting a new one.
              if (exploreJourneyRef.current) {
                window.clearTimeout(exploreJourneyRef.current);
                exploreJourneyRef.current = null;
              }

              const levels = Array.from({ length: 12 }, (_, i) => i + 1);
              let index = 0;

              const scrollToNextLevel = () => {
                const levelNumber = levels[index];
                const target = document.getElementById(`map-level-${levelNumber}`);

                if (!target) {
                  exploreJourneyRef.current = null;
                  return;
                }

                target.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });

                index += 1;

                if (index < levels.length) {
                  // More relaxed pace so the tour is easier on the eyes.
                  exploreJourneyRef.current = window.setTimeout(
                    scrollToNextLevel,
                    800
                  );
                } else {
                  // Level 12 reached: return to Level 1 once, then stop.
                  exploreJourneyRef.current = window.setTimeout(() => {
                    const firstLevel = document.getElementById("map-level-1");

                    if (firstLevel) {
                      firstLevel.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }

                    exploreJourneyRef.current = null;
                  }, 800);
                }
              };

              scrollToNextLevel();
            }}
          >
            EXPLORE JOURNEY →
          </button>
        </div>
      </header>

      {/* =========================
          LEVEL MAP
      ========================= */}

      <section className="journey-map">

        {/* Ambient smoke + crystal decorations.
            Deliberately spaced at irregular heights so they don't appear on every level. */}
        <img
          src="/assets/crystal-kiri.png"
          alt=""
          aria-hidden="true"
          className="map-decoration map-decoration-crystal left"
          style={{ top: "1020px" }}
        />
        <img
          src="/assets/crystal-kanan.png"
          alt=""
          aria-hidden="true"
          className="map-decoration map-decoration-crystal right"
          style={{ top: "660px" }}
        />
        <img
          src="/assets/crystal-kiri.png"
          alt=""
          aria-hidden="true"
          className="map-decoration map-decoration-crystal left"
          style={{ top: "1480px" }}
        />
        <img
          src="/assets/crystal-kanan.png"
          alt=""
          aria-hidden="true"
          className="map-decoration map-decoration-crystal right"
          style={{ top: "2860px" }}
        />
        <img
          src="/assets/crystal-kiri.png"
          alt=""
          aria-hidden="true"
          className="map-decoration map-decoration-crystal left"
          style={{ top: "4300px" }}
        />
        <img
          src="/assets/crystal-kanan.png"
          alt=""
          aria-hidden="true"
          className="map-decoration map-decoration-crystal right"
          style={{ top: "5200px" }}
        />
        <img
          src="/assets/crystal-kanan.png"
          alt=""
          aria-hidden="true"
          className="map-decoration map-decoration-crystal right"
          style={{ top: "2350px" }}
        />
        <img
          src="/assets/crystal-kiri.png"
          alt=""
          aria-hidden="true"
          className="map-decoration map-decoration-crystal left"
          style={{ top: "3220px" }}
        />
        <img
          src="/assets/crystal-kanan.png"
          alt=""
          aria-hidden="true"
          className="map-decoration map-decoration-crystal right"
          style={{ top: "4740px" }}
        />

        {LEVELS.map((level, index) => (
          <React.Fragment key={level.number}>
            <LevelNode
              level={level}
              onStart={handleStart}
            />

            {index < LEVELS.length - 1 && (
              <div className={`stone-path stone-path-${index + 1}`}>
                <div
                  className={`path-lantern path-lantern-${index % 2 === 0 ? "left" : "right"}`}
                >
                  <span className="lantern-glow" />
                  <img
                    src={`/assets/lentera-${index % 2 === 0 ? "kiri" : "kanan"}.png`}
                    alt=""
                    className="path-lantern-image"
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </section>

      {/* =========================
          FINISH
      ========================= */}

      <section id="map-finish" className="map-finish">
        <img
          src="/assets/gambar-anak-landing.png"
          alt="Anak-anak melompat di taman"
          className="finish-image"
        />

        <div className="finish-copy">
          <h2 className="finish-title">
            JAGA PARU-PARU. JAGA OTAK.<br />
            JAGA MASA DEPAN.
          </h2>

          <div className="finish-actions">
            <div className="finish-game-area">
              <aside className="finish-rules" aria-label="Petunjuk permainan">
                <span className="finish-rules-label">INSTRUCTIONS</span>
                <ul className="finish-rules-list">
                  <li>Pilih jawaban yang benar dari pertanyaan yang tersedia.</li>
                  <li>Loncat untuk memilih jawaban benar dengan tombol Spasi (Space Bar).</li>
                  <li>Skor akhir akan ditampilkan setelah kuis selesai.</li>
                  <li>3 nyawa diberikan untuk setiap pemain.</li>
                </ul>
              </aside>

              <div className="finish-game">
                <iframe
                  src="https://scratch.mit.edu/projects/1385364593/embed"
                  title="Vape Journey main game"
                  allowTransparency="true"
                  width="485"
                  height="402"
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="finish-button-row">
              <a
                href="https://youtu.be/273CDxUJdAA?si=Hv-uAf_T9lvYIjKc"
                target="_blank"
                rel="noopener noreferrer"
                className="finish-button finish-button-video"
              >
                TONTON VIDEO
              </a>

              <button
                type="button"
                className="finish-button"
              >
                THANK YOU
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}