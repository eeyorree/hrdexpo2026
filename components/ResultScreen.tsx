"use client";

export default function ResultScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="w-full max-w-[340px] flex flex-col items-center gap-6">

        {/* 타이틀 — 가장 강조 */}
        <h1 className="text-[26px] font-extrabold text-[#f9f9f9] leading-snug" style={{ wordBreak: "keep-all" }}>
          설문에 참여해주셔서<br />감사합니다!
        </h1>

        {/* 바디 카피 */}
        <p className="text-[15px] text-[#f9f9f9] leading-relaxed" style={{ wordBreak: "keep-all" }}>
          <span className="font-bold">이 화면을 멋쟁이사자처럼<br />부스 스태프에게 보여주세요!</span><br />
          <span className="text-[#FF6000]">다양한 상품이 준비된<br />추첨 이벤트</span>를 진행하실 수 있습니다.
        </p>

        {/* 하단 카피 — bold */}
        <p className="text-[15px] font-bold text-[#FFE066] leading-snug" style={{ wordBreak: "keep-all" }}>
          조직의 지속가능한 AX,<br />멋쟁이사자처럼과 함께라면 가능합니다.
        </p>

        {/* 하단 로고 */}
        <img
          src="/RGB_LIKELION_KR.png"
          alt="멋쟁이사자처럼"
          className="w-44 object-contain mt-4"
        />

        {/* 하단 각주 — 작게, 회색 */}
        <p className="text-[11px] text-[#f9f9f9]/50 leading-relaxed" style={{ wordBreak: "keep-all" }}>
          본 설문은 AI 서비스를 통한 바이브코딩으로 제작되었습니다.
        </p>
      </div>
    </div>
  );
}
