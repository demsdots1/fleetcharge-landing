"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const supporting = [
  {
    quote: "My EV audit trail is not an audit trail. It's a scrapbook.",
    attribution: "Fleet Controller, $1.4M annual EV charging spend",
  },
  {
    quote:
      "When my CFO asks 'are the EVs actually saving money?' — I have a number. But I have to caveat it. He wants a clean number. I can't give him one.",
    attribution: "Fleet Controller, last-mile delivery fleet",
  },
  {
    quote:
      "Diesel: WEX statement, QuickBooks, done. EV: four portal exports, a Geotab CSV, and a 47-tab spreadsheet. That's the gap.",
    attribution: "Fleet Controller, mixed ICE + EV fleet",
  },
];

export default function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 bg-white" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4">
            Voice of the customer
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-navy leading-[1.1]">
            What fleet controllers say.
          </h2>
        </motion.div>

        {/* Hero pull quote */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mb-20 pl-8 border-l-2 border-accent"
        >
          <svg
            className="absolute -top-2 -left-3 text-accent/20"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="currentColor"
            aria-hidden
          >
            <path d="M10 22h6v10H6V22c0-6 4-10 10-10v4c-3 0-6 2-6 6zm18 0h6v10H24V22c0-6 4-10 10-10v4c-3 0-6 2-6 6z" />
          </svg>
          <blockquote className="font-display text-2xl md:text-4xl text-navy leading-[1.2]">
            &ldquo;The total willingness to pay — if someone solved all of this
            coherently — is{" "}
            <span className="font-mono tabular-nums font-medium text-accent-dark">
              north of $12,000 per month
            </span>
            . I&apos;d pay that. My CFO would approve that. The business case
            writes itself.&rdquo;
          </blockquote>
          <figcaption className="mt-6 font-mono text-xs uppercase tracking-wider text-slate-500">
            — Fleet Controller, 235-vehicle mixed fleet
          </figcaption>
        </motion.figure>

        {/* Supporting quotes */}
        <div className="grid md:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
          {supporting.map((q, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="bg-white p-8 flex flex-col justify-between"
            >
              <blockquote className="text-base text-navy leading-relaxed mb-6">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="font-mono text-[11px] uppercase tracking-wider text-slate-500 pt-4 border-t border-slate-100">
                — {q.attribution}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
