"use client";
import React from "react";
import Image from "next/image";

export default function LeftTextRightImage() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl mx-auto py-16 px-4 gap-8">
      {/* Left: Text */}
      <div className="flex-1 text-left space-y-6">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Welcome to Finzo
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Manage your finances with ease. Track your expenses, set budgets, and achieve your financial goals with our intuitive platform.
        </p>
        <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
      {/* Right: Image */}
      <div className="flex-1 flex justify-center">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
          alt="Finance Illustration"
          width={320}
          height={400}
          className="w-full max-w-xs rounded-xl shadow-lg object-cover"
        />
      </div>
    </div>
  );
} 