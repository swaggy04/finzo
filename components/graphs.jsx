"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

// Animated Progress Bar Component (no goal text)
function ProgressBar({ label, percent, barColor = "bg-green-500" }) {
  const barRef = useRef();

  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: "0%" },
        { width: `${percent}%`, duration: 1.2, ease: "power3.out" }
      );
    }
  }, [percent]);

  return (
    <div className="mb-8 w-full">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold text-gray-300">{label}</span>
        <span
          className={`text-sm font-semibold ${
            barColor.includes("green")
              ? "text-green-400"
              : barColor.includes("blue")
              ? "text-blue-400"
              : barColor.includes("yellow")
              ? "text-yellow-400"
              : "text-gray-400"
          }`}
        >
          {percent}%
        </span>
      </div>
      <div
        className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={`${label} progress`}
      >
        <div
          ref={barRef}
          className={`${barColor} h-2.5 rounded-full transition-all duration-700`}
          style={{ willChange: "width" }}
        />
      </div>
      
    </div>
  );
}

export default function Graphs() {
  const metrics = [
    {
      label: "Savings Goal",
      percent: 75,
      barColor: "bg-green-500",
    },
    {
      label: "Investment Target",
      percent: 40,
      barColor: "bg-blue-500",
    },
    {
      label: "Monthly Expenses Tracked",
      percent: 89,
      barColor: "bg-yellow-500",
    },
  ];

  return (
    <section className="py-24 bg-black flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 w-full min-h-screen px-6 md:px-16 lg:px-24">
      {/* Left Paragraph Section */}
      <div className="flex-1 max-w-full sm:max-w-xl md:max-w-2xl flex flex-col justify-center items-start text-left">
        <h1 className="font-extrabold text-3xl md:text-5xl lg:text-6xl text-white drop-shadow-xl tracking-tight leading-tight">
          Your financial{" "}
          <span className="bg-gradient-to-r from-green-800 to-green-500 dark:from-green-300 dark:to-green-200 bg-clip-text text-transparent">
            overview
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-full">
          Monitoring your financial progress is key to achieving stability and meeting your goals.
          Visualizing savings, investments, and expenses helps build better habits and make informed money
          decisions every month. Stay motivated by tracking your targets and celebrating your progress along
          the way.
        </p>
        <ul className="list-disc pl-6 text-gray-400 text-base sm:text-lg space-y-3 max-w-full">
          <li>Set and follow saving targets</li>
          <li>Identify improvement areas for investments</li>
          <li>Gain clarity on your spending</li>
        </ul>
      </div>

      {/* Right Charts Section */}
      <div className="flex-1 max-w-full sm:max-w-xl md:max-w-2xl border border-[#232329] p-8 md:p-12 rounded-2xl bg-[#0a0a0a] shadow-lg">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 text-center md:text-left">
          Financial Progress Overview
        </h3>
        <div className="space-y-6">
          {metrics.map((item, idx) => (
            <ProgressBar key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}