"use client";

interface IntroScreenProps {
  onStart: () => void;
}

function getTodayLabel() {
  const d = new Date();
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const today = getTodayLabel();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="flex flex-col items-center w-full max-w-[340px]">
        <h1
          className="text-[22px] font-bold leading-snug text-[#1C1C1C] mb-3"
          style={{ wordBreak: "keep-all" }}
        >
          {today} 오늘,
          <br />
          <span className="text-[#FF6000]">AI가 내 일을</span> 바꾸고 있나요?
        </h1>

        <p className="text-[14px] font-medium text-[#1C1C1C]/60 mb-10">
          멋쟁이사자처럼 기업교육 X HRD Expo 2026
        </p>

        <img
          src="/RGB_LIKELION_KR.png"
          alt="멋쟁이사자처럼"
          className="w-32 object-contain mb-10"
        />

        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl text-white font-bold text-[17px] transition-all duration-150 active:scale-95 active:brightness-90"
          style={{ backgroundColor: "#FF6000" }}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
