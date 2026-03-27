"use client";

import { useState } from "react";

const OPTIONS = [
  "엄청나게 체감 중이에요",
  "변화가 보이기 시작해요",
  "아직은 잘 모르겠어요",
];

interface FormData {
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
}

interface QuestionScreenProps {
  formData: FormData | null;
  onSubmit: () => void;
}

function getTodayLabel() {
  const d = new Date();
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export default function QuestionScreen({ formData, onSubmit }: QuestionScreenProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const today = getTodayLabel();

  async function handleSubmit() {
    if (!selected || submitting) return;
    setSubmitting(true);
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, answer: selected }),
      });
    } catch (e) {
      console.error("제출 오류:", e);
    } finally {
      setSubmitting(false);
      onSubmit();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 text-center">
      <div className="w-full max-w-[340px] flex flex-col items-center">
        <h1
          className="text-[20px] font-bold text-[#f9f9f9] leading-snug mb-8"
          style={{ wordBreak: "keep-all" }}
        >
          {today} 오늘,<br />
          <span className="text-[#FF6000]">AI가 내 일을</span> 바꾸고 있나요?
        </h1>

        <div className="flex flex-col gap-3 w-full mb-8">
          {OPTIONS.map((opt) => {
            const isSelected = selected === opt;
            return (
              <button
                key={opt}
                onClick={() => setSelected(opt)}
                className="w-full py-4 px-5 rounded-2xl text-[15px] font-semibold transition-all duration-150 active:scale-95"
                style={{
                  backgroundColor: isSelected ? "#FFE066" : "#242424",
                  color: isSelected ? "#1C1C1C" : "#f9f9f9",
                  border: isSelected ? "2px solid #FFE066" : "2px solid rgba(249,249,249,0.15)",
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selected || submitting}
          className="w-full py-4 rounded-2xl font-bold text-[17px] transition-all duration-150 active:scale-95 active:brightness-90"
          style={{
            backgroundColor: selected ? "#FF6000" : "rgba(249,249,249,0.12)",
            color: selected ? "#ffffff" : "rgba(249,249,249,0.35)",
          }}
        >
          {submitting ? "제출 중..." : "응답 제출하기"}
        </button>
      </div>
    </div>
  );
}
