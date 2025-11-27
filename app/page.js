'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 star-field" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/40" />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="glass max-w-3xl rounded-3xl p-10"
        >
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-pink-200/80">
            Marjatertun 54-vuotisjuhlat
          </p>
          <h1 className="mb-6 text-4xl font-semibold leading-tight md:text-6xl">
            Lumoa ilta glitzerillä ja raketeilla
          </h1>
          <p className="text-lg text-white/80 md:text-xl">
            Tämä ilta on sinun. Paina nappia ja anna juhlahumun alkaa.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.3 }}
        >
          <Link href="/juhlat" className="group relative inline-flex items-center justify-center">
            <span className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-300 blur-xl opacity-60 group-hover:opacity-90" />
            <span className="relative rounded-full bg-white/10 px-8 py-4 text-lg font-semibold uppercase tracking-wide text-white shadow-lg ring-2 ring-white/30 backdrop-blur transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-pink-500/40">
              Aloita juhliminen painamalla tätä
            </span>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
