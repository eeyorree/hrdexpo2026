import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "멋쟁이사자처럼 기업교육 X HRD Expo 2026",
  description: "HRD Expo 2026 현장 설문 — 멋쟁이사자처럼 기업교육",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-[#F2EDE6] min-h-screen">
        {children}
      </body>
    </html>
  );
}
