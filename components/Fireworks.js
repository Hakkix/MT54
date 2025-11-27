'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function Fireworks({ frequency = 900 }) {
  const canvasRef = useRef(null);
  const confettiRef = useRef(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.className = 'pointer-events-none fixed inset-0 z-20';
    canvasRef.current = canvas;
    document.body.appendChild(canvas);

    confettiRef.current = confetti.create(canvas, { resize: true, useWorker: true });

    const shoot = () => {
      const count = 6 + Math.floor(Math.random() * 4);
      const angleStart = Math.random() * 45 + 55;
      const colors = ['#f472b6', '#a78bfa', '#c084fc', '#67e8f9', '#fff'];
      confettiRef.current?.({
        particleCount: count,
        spread: 75,
        startVelocity: 55,
        angle: angleStart,
        origin: { x: Math.random() * 0.6 + 0.2, y: Math.random() * 0.2 + 0.1 },
        colors,
        ticks: 180,
      });
    };

    shoot();
    const timer = setInterval(shoot, frequency);

    return () => {
      clearInterval(timer);
      confettiRef.current?.reset();
      canvas.remove();
    };
  }, [frequency]);

  return null;
}
