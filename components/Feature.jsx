"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
  {
    name: "Service name 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora voluptatem corporis officiis hic asperiores iusto quibusdam.",
  },
  {
    name: "Service name 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora voluptatem corporis officiis hic asperiores iusto quibusdam.",
  },
  {
    name: "Service name 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora voluptatem corporis officiis hic asperiores iusto quibusdam.",
  },
  {
    name: "Service name 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora voluptatem corporis officiis hic asperiores iusto quibusdam.",
  },
  {
    name: "Service name 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora voluptatem corporis officiis hic asperiores iusto quibusdam.",
  },
  {
    name: "Service name 6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora voluptatem corporis officiis hic asperiores iusto quibusdam.",
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesSection() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;

    if (cards.length === 0) return;

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 50 },
        {
          duration: 1,
          autoAlpha: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, []);

  // Clear ref array on each render
  cardsRef.current = [];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
        <div className="flex flex-col space-y-16">
          <div className="flex flex-col justify-center text-center mx-auto md:max-w-3xl space-y-5">
            <span className="mx-auto w-max pl-5 relative before:absolute before:w-4 before:h-0.5 before:rounded-md before:left-0 before:top-1/2 before:bg-blue-700 dark:before:bg-sky-600 text-blue-600 dark:text-blue-500">
              Features
            </span>
            <h1 className="text-3xl font-semibold text-blue-950 dark:text-gray-200 md:text-4xl xl:text-5xl leading-tight">
              Keep your business on growing
            </h1>
            <p className="text-gray-700 dark:text-gray-300 max-w-lg mx-auto">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae
              odio consequatur aliquam ratione quod iusto aspernaturaz
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-y-16 sm:gap-x-12">
            {features.map((feature, i) => (
              <div
                key={i}
                ref={(el) => cardsRef.current.push(el)}
                className="flex flex-col items-center text-center space-y-4 border border-[#232329] p-8 m-2 rounded-3xl opacity-0"
              >
                <span className="p-2 rounded-md bg-blue-50 text-blue-700 dark:bg-gray-900 dark:text-blue-500 flex w-max">
                  {/* feature icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 3a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2zm0 4.5h16l-.811 7.71a2 2 0 01-1.99 1.79H4.802a2 2 0 01-1.99-1.79L2 7.5zM10 9a.75.75 0 01.75.75v2.546l.943-1.048a.75.75 0 111.114 1.004l-2.25 2.5a.75.75 0 01-1.114 0l-2.25-2.5a.75.75 0 111.114-1.004l.943 1.048V9.75A.75.75 0 0110 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <h2 className="text-gray-800 dark:text-gray-100 text-xl font-semibold">
                  {feature.name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mx-auto max-w-md">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
