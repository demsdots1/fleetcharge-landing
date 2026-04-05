"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 md:py-32 bg-navy text-white overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-6xl text-white leading-[1.05] tracking-tight"
        >
          Your CFO is still waiting for a clean answer.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          FleetCharge HQ gives fleet finance teams the reconciliation engine,
          the audit trail, and the CPM report they&apos;ve been building in
          spreadsheets for years.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-5"
        >
          <Link
            href="/demo"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-navy font-semibold rounded-md hover:bg-accent-light transition-colors text-base"
          >
            Request Early Access
          </Link>
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500">
            Currently in early access with select fleet finance teams. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
