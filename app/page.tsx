"use client";

import { useState } from "react";
import IntroScreen from "@/components/IntroScreen";
import FormScreen from "@/components/FormScreen";
import QuestionScreen from "@/components/QuestionScreen";
import ResultScreen from "@/components/ResultScreen";

type Screen = "intro" | "form" | "question" | "done";

interface FormData {
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  marketing: "yes" | "no" | null;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [formData, setFormData] = useState<FormData | null>(null);

  return (
    <main className="min-h-screen bg-[#F2EDE6]">
      <div className="w-full max-w-[390px] mx-auto min-h-screen">
        {screen === "intro" && (
          <IntroScreen onStart={() => setScreen("form")} />
        )}
        {screen === "form" && (
          <FormScreen onNext={(data) => { setFormData(data); setScreen("question"); }} />
        )}
        {screen === "question" && (
          <QuestionScreen formData={formData} onSubmit={() => setScreen("done")} />
        )}
        {screen === "done" && <ResultScreen />}
      </div>
    </main>
  );
}
