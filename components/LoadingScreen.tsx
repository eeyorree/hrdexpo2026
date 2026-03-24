"use client";

import { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "답변을 분석하고 있습니다",
  "AI 시대의 언어로 번역 중입니다",
  "당신만의 직무명을 빚고 있습니다",
];

export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(msgInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 animate-fade-in">
      {/* 배경 pulse 효과 */}
      <div className="relative mb-12">
        {/* 외부 링 */}
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            backgroundColor: "rgba(124,58,237,0.15)",
            transform: "scale(1.4)",
          }}
        />
        {/* 중간 링 */}
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            backgroundColor: "rgba(124,58,237,0.2)",
            transform: "scale(1.2)",
          }}
        />
        {/* 중심 아이콘 */}
        <div
          className="relative w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #7C3AED, #9F67FF)",
            boxShadow: "0 0 40px rgba(124,58,237,0.5)",
          }}
        >
          <svg
            className="animate-spin"
            style={{ animationDuration: "3s" }}
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="3"
            />
            <path
              d="M20 4 A16 16 0 0 1 36 20"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="20" cy="20" r="4" fill="white" />
          </svg>
        </div>
      </div>

      {/* 텍스트 */}
      <div className="text-center">
        <h2 className="text-[18px] font-bold text-white mb-3">
          AI가 당신의 새로운 직무명을
          <br />
          만들고 있습니다{dots}
        </h2>

        <p
          key={messageIndex}
          className="text-[13px] text-gray-500 animate-fade-in"
        >
          {LOADING_MESSAGES[messageIndex]}
        </p>
      </div>

      {/* 하단 타이핑 바 */}
      <div className="absolute bottom-20 left-6 right-6">
        <div className="h-0.5 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #7C3AED, #9F67FF, #7C3AED)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
              width: "60%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
