"use client"; // ensure client-side

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

import HeroSection from "@/components/HeroSection";
import DataSection from "@/components/chartdata/dataSection";
import FeaturesSection from "@/components/Feature";
import Footer from "@/components/Footer";
import Graphs from "@/components/graphs";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1, // adjust this value to control smoothness/speed
      effects: true, // enable data-speed, data-lag on elements if needed
      normalizeScroll: true, // improves mobile behavior
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <div
      id="smooth-wrapper"
      style={{
        overflow: "hidden",
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <div
        id="smooth-content"
        style={{
          willChange: "transform",
          minHeight: "100vh",
        }}
      >
        <div className="min-h-screen pb-2">
          <HeroSection />
          <DataSection />
          <Graphs/>
          <FeaturesSection />
          <Footer />
        </div>
      </div>
    </div>
  );
}
