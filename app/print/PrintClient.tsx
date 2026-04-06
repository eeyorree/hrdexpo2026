"use client";

interface Response {
  timestamp: string;
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  answer: string;
}

interface PrintClientProps {
  responses: Response[];
}

export default function PrintClient({ responses }: PrintClientProps) {
  return (
    <>
      <style>{`
        @page {
          size: A4 portrait;
          margin: 10mm;
        }

        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          .page-break { page-break-after: always; }
          .card-grid { gap: 0; }
          .card {
            border: 1px solid #999 !important;
            break-inside: avoid;
          }
        }

        @media screen {
          body { background: #f0f0f0; }
        }
      `}</style>

      {/* 컨트롤 바 */}
      <div className="no-print fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
        <div>
          <span className="font-bold text-[#1C1C1C] text-[15px]">응답자 카드 목록</span>
          <span className="ml-3 text-[13px] text-gray-500">총 {responses.length}명</span>
        </div>
        <button
          onClick={() => window.print()}
          className="px-5 py-2 rounded-xl font-bold text-[14px] text-white transition-all duration-150 active:scale-95 active:brightness-90"
          style={{ backgroundColor: "#FF6000" }}
        >
          PDF로 저장
        </button>
      </div>

      {/* 카드 페이지들 */}
      <div className="no-print pt-16" />

      {Array.from({ length: Math.ceil(responses.length / 10) }).map((_, pageIdx) => {
        const pageItems = responses.slice(pageIdx * 10, pageIdx * 10 + 10);

        return (
          <div
            key={pageIdx}
            className={pageIdx < Math.ceil(responses.length / 10) - 1 ? "page-break" : ""}
            style={{
              width: "210mm",
              minHeight: "277mm",
              margin: "0 auto 20px",
              padding: "10mm",
              background: "white",
              boxSizing: "border-box",
            }}
          >
            <div
              className="card-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "5mm",
              }}
            >
              {pageItems.map((r, i) => (
                <div
                  key={i}
                  className="card"
                  style={{
                    width: "90mm",
                    height: "55mm",
                    border: "1px solid #ccc",
                    borderRadius: "3mm",
                    padding: "5mm 6mm",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "2.5mm",
                    fontFamily: "Pretendard, sans-serif",
                  }}
                >
                  <div style={{ fontSize: "13pt", fontWeight: 700, color: "#1C1C1C", lineHeight: 1.2 }}>
                    {r.name}
                  </div>
                  <div style={{ fontSize: "9pt", color: "#555", lineHeight: 1.3 }}>
                    {r.company}
                    {r.position ? ` · ${r.position}` : ""}
                  </div>
                  <div style={{ marginTop: "1mm", fontSize: "8.5pt", color: "#333", lineHeight: 1.5 }}>
                    <div>{r.phone}</div>
                    <div>{r.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {responses.length === 0 && (
        <div
          style={{
            width: "210mm",
            margin: "80px auto",
            textAlign: "center",
            color: "#999",
            fontSize: "14px",
          }}
        >
          아직 응답 데이터가 없습니다.
        </div>
      )}
    </>
  );
}
