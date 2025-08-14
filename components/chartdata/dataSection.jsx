"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DataSection = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (imageRef.current && textRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current.parentElement, // parent container
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.from(imageRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      }).from(
        textRef.current,
        {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.7" // start this animation 0.7 secs before previous ends for overlap
      );
    }
  }, []);

  return (
     <div className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-8 md:gap-12 w-full min-h-[60vh] py-16 px-4 md:px-8 mt-9 lg:px-16 bg-black">
      {/* Chart Section */}
      <div className="flex-1 flex justify-center p-4 md:p-6" ref={imageRef}>
        <Image
          src="/pie.png"
          alt="Finance Illustration"
          className="shadow-2xl object-cover rounded-2xl p-3 border border-[#232329]"
          width={430}
          height={600}
          priority
        />
      </div>
      {/* Text Section */}
      <div
        className="flex-1 flex flex-col justify-center items-center md:items-start space-y-4 px-4 py-8 text-center md:text-left"
        ref={textRef}
      >
        <h1 className="font-extrabold text-3xl md:text-5xl lg:text-6xl text-white drop-shadow-xl tracking-tight leading-tight">
          Track Your{" "}
          <span className="bg-gradient-to-r from-green-800 to-green-500 dark:from-green-300 dark:to-green-200 bg-clip-text text-transparent">
            Finance
          </span>
        </h1>
        <p className="text-gray-200 text-lg md:text-xl rounded-2xl shadow-lg max-w-3xl w-full leading-relaxed p-6 md:p-8">
          Managing finance is essential to ensure financial stability and achieve goals. It helps in budgeting, saving, and making informed decisions. Good financial management reduces stress and prepares you for unexpected expenses. It promotes disciplined spending and long-term growth, leading to financial security and independence.
        </p>
      </div>
    </div>
  );
};

export default DataSection;






