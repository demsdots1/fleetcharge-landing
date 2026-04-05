import Hero from "@/components/hero/Hero";
import Problem from "@/components/problem/Problem";
import HowItWorks from "@/components/solution/HowItWorks";
import Features from "@/components/features/Features";
import WhatWereNot from "@/components/positioning/WhatWereNot";
import SocialProof from "@/components/testimonials/SocialProof";
import Pricing from "@/components/pricing/Pricing";
import CTA from "@/components/cta/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <WhatWereNot />
      <SocialProof />
      <Pricing />
      <CTA />
    </>
  );
}
