"use client";

import { useState } from "react";

interface FormData {
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  marketing: "yes" | "no" | null;
}

interface FormScreenProps {
  onNext: (data: FormData) => void;
}

export default function FormScreen({ onNext }: FormScreenProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    company: "",
    position: "",
    email: "",
    phone: "",
    marketing: null,
  });
  const [showModal, setShowModal] = useState(false);

  function handleChange(field: keyof Omit<FormData, "marketing">, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleMarketing(value: "yes" | "no") {
    if (value === "no") {
      setForm((prev) => ({ ...prev, marketing: "no" }));
      setShowModal(true);
    } else {
      setForm((prev) => ({ ...prev, marketing: "yes" }));
    }
  }

  const phoneValid = /^010\d{8}$/.test(form.phone);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const isValid =
    form.name.trim() &&
    form.company.trim() &&
    form.position.trim() &&
    emailValid &&
    phoneValid &&
    form.marketing === "yes";

  function handleNext() {
    if (!isValid) return;
    onNext(form);
  }

  const inputClass =
    "w-full px-3 py-2.5 rounded-xl border border-[#1C1C1C]/20 bg-white text-[#1C1C1C] text-[15px] outline-none focus:border-[#FF6000] transition-colors placeholder:text-[#1C1C1C]/30";

  return (
    <div className="flex flex-col min-h-screen px-5 py-5">
      <p className="text-[15px] font-semibold text-[#1C1C1C] mb-4 leading-snug" style={{ wordBreak: "keep-all" }}>
        설문에 앞서,<br />응답하시는 분의 정보를 알려주세요.
      </p>

      <div className="flex flex-col gap-2 mb-3">
        <input
          className={inputClass}
          placeholder="이름"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <input
          className={inputClass}
          placeholder="회사명"
          value={form.company}
          onChange={(e) => handleChange("company", e.target.value)}
        />
        <input
          className={inputClass}
          placeholder="직책"
          value={form.position}
          onChange={(e) => handleChange("position", e.target.value)}
        />
        <div>
          <input
            className={inputClass}
            placeholder="이메일"
            type="email"
            inputMode="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {form.email && !emailValid && (
            <p className="text-[12px] text-[#FF6000] mt-1 ml-1">올바른 이메일 형식으로 입력해주세요. (예: example@domain.com)</p>
          )}
        </div>
        <div>
          <input
            className={inputClass}
            placeholder="전화번호 (예: 01012345678)"
            type="tel"
            inputMode="numeric"
            maxLength={11}
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, ""))}
          />
          {form.phone && !phoneValid && (
            <p className="text-[12px] text-[#FF6000] mt-1 ml-1">010으로 시작하는 11자리 숫자를 입력해주세요. (예: 01012345678)</p>
          )}
        </div>
      </div>

      {/* 마케팅 동의 박스 */}
      <div className="rounded-2xl border border-[#1C1C1C]/15 bg-white p-3.5 mb-4 text-[12px] text-[#1C1C1C]/70 leading-relaxed">
        <p className="font-bold text-[#1C1C1C] text-[13px] mb-1.5">[선택] 마케팅 목적의 개인정보 수집 및 활용 동의</p>
        <p className="mb-1">
          <span className="font-semibold text-[#1C1C1C]/80">목적:</span> 멋쟁이사자처럼 기업교육의 제품 소식, 이벤트/프로모션 정보 안내, 맞춤형 서비스 제공
        </p>
        <p className="mb-1">
          <span className="font-semibold text-[#1C1C1C]/80">항목:</span> 휴대전화번호, 이메일, 이름, 회사 정보
        </p>
        <p className="mb-3">
          <span className="font-semibold text-[#1C1C1C]/80">보유기간:</span> 마케팅 동의 철회 시까지
        </p>
        <p className="text-[11px] text-[#1C1C1C]/50 mb-2">
          귀하는 동의를 거부할 수 있으나, 거부 시 설문 진행이 제한됩니다.
        </p>
        <p className="font-semibold text-[#1C1C1C] text-[13px] mb-2">동의하시겠습니까?</p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="marketing"
              value="yes"
              checked={form.marketing === "yes"}
              onChange={() => handleMarketing("yes")}
              className="accent-[#FF6000] w-4 h-4"
            />
            <span className="text-[14px] font-medium text-[#1C1C1C]">예</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="marketing"
              value="no"
              checked={form.marketing === "no"}
              onChange={() => handleMarketing("no")}
              className="accent-[#FF6000] w-4 h-4"
            />
            <span className="text-[14px] font-medium text-[#1C1C1C]">아니오</span>
          </label>
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!isValid}
        className="w-full py-4 rounded-2xl font-bold text-[17px] transition-all duration-150 active:scale-95 active:brightness-90"
        style={{
          backgroundColor: isValid ? "#FF6000" : "#1C1C1C1A",
          color: isValid ? "#ffffff" : "#1C1C1C60",
        }}
      >
        다음
      </button>

      {/* 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl px-6 py-6 w-full max-w-[320px] text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[15px] font-semibold text-[#1C1C1C] leading-snug mb-5" style={{ wordBreak: "keep-all" }}>
              마케팅 수신에 동의하지 않으시는 경우,<br />설문을 진행할 수 없습니다.
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                setForm((prev) => ({ ...prev, marketing: null }));
              }}
              className="w-full py-3 rounded-xl font-bold text-[15px] text-white transition-all duration-150 active:scale-95 active:brightness-90"
              style={{ backgroundColor: "#FF6000" }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
