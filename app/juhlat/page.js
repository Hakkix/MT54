'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import AudioPlayer from '../../components/AudioPlayer';
import Fireworks from '../../components/Fireworks';

export default function CelebrationPage() {
  const [showBalloons, setShowBalloons] = useState(false);
  const [showRain, setShowRain] = useState(false);
  const audioRef = useRef(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowBalloons(true), 5000),
      setTimeout(() => setShowRain(true), 10000),
    ];

    audioRef.current?.startCelebration();

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const balloons = useMemo(
    () => [
      '#f472b6',
      '#a78bfa',
      '#67e8f9',
      '#c084fc',
      '#fb7185',
      '#f97316',
      '#22d3ee',
      '#a3e635',
    ],
    []
  );

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-16 pt-12 sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.09),transparent_30%),linear-gradient(135deg,#0f172a_0%,#0b1021_45%,#111827_100%)]" aria-hidden />
      <div className="absolute inset-0 star-field opacity-40" aria-hidden />

      <Fireworks frequency={850} />
      {showRain && windowSize.width > 0 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={450}
          gravity={0.18}
          recycle
          initialVelocityY={5}
          wind={0.01}
        />
      )}

      <AudioPlayer ref={audioRef} />

      <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="glass w-full max-w-4xl rounded-3xl px-8 py-10 md:px-14 md:py-14"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-pink-100/70">Juhlitaan tyylillä</p>
          <h1 className="gradient-text mb-4 text-4xl font-bold leading-tight md:text-6xl">
            Hyvää syntymäpäivää Marjaterttu
          </h1>
          <p className="text-lg text-white/80 md:text-xl">
            Nyt on aika räjäyttää taivas väreillä, rytmeillä ja ilolla. Tämä ilta on sinulle omistettu – anna musiikin, rakettien
            ja ilmapallojen kertoa tarinaa rakkaudesta.
          </p>

          <div className="mt-10 flex flex-col items-center gap-2 text-lg text-pink-100/90">
            <span className="text-base uppercase tracking-[0.25em] text-pink-200/70">Rakkaudella</span>
            <span className="text-2xl font-semibold text-white">T. Tomi</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="glass w-full max-w-5xl rounded-3xl px-6 py-8 md:px-10"
        >
          <div className="grid gap-6 md:grid-cols-3">
            <InfoCard
              title="Heti (0s)"
              description="Taivas syttyy raketeilla ja biitti käynnistyy. Kipinöitä kaikkialle!"
              accent="from-pink-400 to-purple-400"
            />
            <InfoCard
              title="5 sekuntia"
              description="Ilmapallot nousevat ilmaan kuin lupaukset uusista seikkailuista."
              accent="from-purple-400 to-cyan-300"
            />
            <InfoCard
              title="10 sekuntia"
              description="Konfettisade kruunaa hetken ja täyttää ilman onnen väreillä."
              accent="from-cyan-300 to-pink-400"
            />
          </div>
        </motion.div>
      </section>

      {showBalloons && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center">
          <div className="relative h-[60vh] w-full max-w-5xl">
            {balloons.map((color, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: [-20, -380 - Math.random() * 120], opacity: [0.6, 1, 0] }}
                transition={{ duration: 8 + Math.random() * 3, delay: idx * 0.35, repeat: Infinity, repeatDelay: 1 }}
                className="absolute bottom-0 flex flex-col items-center"
                style={{ left: `${10 + idx * 10}%` }}
              >
                <div
                  className="h-20 w-16 rounded-full shadow-lg shadow-black/40"
                  style={{ background: `radial-gradient(circle at 30% 30%, #ffffff99, ${color})` }}
                />
                <div className="h-10 w-[3px] bg-white/30" />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function InfoCard({ title, description, accent }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/5 p-5 text-left shadow-xl ring-1 ring-white/10">
      <div className={`absolute inset-0 opacity-30 blur-3xl bg-gradient-to-br ${accent}`} aria-hidden />
      <div className="relative space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-100/80">Ajastus</p>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/75">{description}</p>
      </div>
    </div>
  );
}
