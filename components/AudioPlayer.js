'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const AudioPlayer = forwardRef(function AudioPlayer(_, ref) {
  const musicRef = useRef(null);
  const sfxRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [needsUserAction, setNeedsUserAction] = useState(false);

  useEffect(() => {
    const music = new Audio('/music/birthday-beat.mp3');
    music.loop = true;
    music.preload = 'auto';
    music.volume = 0.6;

    const sfx = new Audio('/sfx/firework.mp3');
    sfx.preload = 'auto';
    sfx.volume = 0.9;

    music.muted = muted;
    sfx.muted = muted;
    musicRef.current = music;
    sfxRef.current = sfx;

    return () => {
      music.pause();
      sfx.pause();
      musicRef.current = null;
      sfxRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (musicRef.current) musicRef.current.muted = muted;
    if (sfxRef.current) sfxRef.current.muted = muted;
  }, [muted]);

  const tryPlay = async (audio) => {
    if (!audio) return;
    try {
      await audio.play();
      setNeedsUserAction(false);
    } catch (err) {
      console.warn('Audio blocked until user gesture', err);
      setNeedsUserAction(true);
    }
  };

  const startCelebration = async () => {
    if (musicRef.current) musicRef.current.currentTime = 0;
    if (sfxRef.current) sfxRef.current.currentTime = 0;
    await Promise.all([tryPlay(musicRef.current), tryPlay(sfxRef.current)]);
  };

  const playFirework = async () => {
    if (sfxRef.current) {
      sfxRef.current.currentTime = 0;
      await tryPlay(sfxRef.current);
    }
  };

  const toggleMute = () => setMuted((prev) => !prev);

  useImperativeHandle(ref, () => ({ startCelebration, playFirework, toggleMute, muted }));

  return (
    <div className="fixed right-6 top-6 z-50 flex flex-col items-end gap-2">
      {needsUserAction && (
        <button
          onClick={startCelebration}
          className="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-500/40 transition hover:-translate-y-0.5 hover:shadow-pink-400/60"
        >
          Klikkaa käynnistääksesi äänen
        </button>
      )}

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleMute}
        className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white"
        aria-label={muted ? 'Laita äänet päälle' : 'Laita äänet pois'}
      >
        <span className="h-2 w-2 rounded-full bg-gradient-to-r from-pink-400 to-cyan-300 shadow-[0_0_12px_rgba(236,72,153,0.8)]" />
        {muted ? 'Äänet pois päältä' : 'Äänet päällä'}
      </motion.button>
    </div>
  );
});

export default AudioPlayer;
