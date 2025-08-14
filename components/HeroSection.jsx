"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const floatingImages = [
  // Top left
  {
    src: "/bank.jpg",
    alt: "Bank",
    className:
      "absolute z-10 top-[15%] left-[8%] w-44 sm:w-56 md:w-72 pointer-events-none select-none",
    tabIndex: -1,
  },
  // Center left
  {
    src: "/shop.jpg",
    alt: "Cash",
    className:
      "absolute z-10 top-[60%] left-[2%] w-36 sm:w-44 md:w-60 -translate-y-1/2 pointer-events-none select-none",
    tabIndex: -1,
  },
  // Bottom left
  {
    src: "/bill.png",
    alt: "Bill",
    className:
      "absolute z-10 bottom-[25%] top-[74%] left-[15%] w-36 sm:w-44 md:w-60 pointer-events-none select-none",
    tabIndex: -1,
  },
  // Top right
  {
    src: "/earth.jpg",
    alt: "Earth",
    className:
      "absolute z-10 top-[10%] right-[8%] w-56 sm:w-64 md:w-72 pointer-events-none select-none",
    tabIndex: -1,
  },
  // Bottom right, secondary
  {
    src: "/bitcoin.jpg",
    alt: "Bitcoin",
    className:
      "absolute z-10 bottom-[12%] right-[22%] w-36 sm:w-44 md:w-60 pointer-events-none select-none",
    tabIndex: -1,
  },
  // Bottom right corner
  {
    src: "/cash2.png",
    alt: "Money",
    className:
      "absolute z-10 bottom-[1%] right-[2%] w-40 sm:w-48 md:w-60 pointer-events-none select-none",
    tabIndex: -1,
  },
];

export default function HeroSection() {
  const imageRefs = useRef([]);

  
  imageRefs.current = [];

  useEffect(() => {
    imageRefs.current.forEach((el) => {
      if (el) {
        gsap.to(el, {
          y: "+=" + (Math.random() * 20 - 10), 
          x: "+=" + (Math.random() * 20 - 10),
          duration: 1 + Math.random() * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random(),
        });
      }
    });
  }, []);

  return (
    <section className="relative flex items-center justify-center min-h-[80vh] bg-black overflow-hidden py-20 px-4">
     
      {floatingImages.map((img, i) => (
        <div
          key={i}
          ref={(el) => (imageRefs.current[i] = el)}
          className={img.className}
          style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.5))" }}
          tabIndex={img.tabIndex} 
          aria-hidden="true" 
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={656}
            height={656}
            className="rounded-2xl"
            priority 
          />
        </div>
      ))}

      {/* Center Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-xl select-text">
          Manage Your Finance.
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-8">
          Unleash new powers with Finzo. Introducing new tools and seamless integrations with
          your favorite apps.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full px-4 sm:px-0">
          <button
            className="bg-white text-black font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
            type="button"
          >
            Get started
          </button>
          <button
            className="bg-[#18181b] text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-800 transition border border-gray-700 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50"
            type="button"
          >
            Documentation
          </button>
        </div>
      </div>
    </section>
  );
}
