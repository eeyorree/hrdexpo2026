import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1500;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateWithRetry(q1: string, q2: string, q3: string) {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const message = await client.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 256,
        system:
          "당신은 AI 시대의 직무를 재정의하는 전문가입니다. 주어진 세 가지 정보를 바탕으로 이 사람만의 새로운 직무명을 한국어로 만들어주세요. 직무명은 시적이고 의미있되, 2줄 이내로 간결하게. 따옴표로 감싸서 반환.",
        messages: [
          {
            role: "user",
            content: `하루 중 가장 많이 하는 일: ${q1}\nAI한테 가장 먼저 맡기고 싶은 것: ${q2}\n내가 제일 잘한다고 생각하는 것: ${q3}`,
          },
        ],
      });

      const rawText =
        message.content[0].type === "text" ? message.content[0].text : "";
      const match = rawText.match(/["「『"]([\s\S]+?)["」』"]/);
      return match ? match[1].trim() : rawText.trim();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      const isRateLimit =
        lastError.message.includes("rate_limit") ||
        lastError.message.includes("overloaded") ||
        lastError.message.includes("529");

      if (isRateLimit && attempt < MAX_RETRIES) {
        // 지수 백오프: 1.5s → 3s → 6s
        await sleep(RETRY_DELAY_MS * Math.pow(2, attempt - 1));
        continue;
      }
      throw lastError;
    }
  }
  throw lastError!;
}

export async function POST(request: NextRequest) {
  try {
    const { q1, q2, q3 } = await request.json();

    if (!q1 || !q2 || !q3) {
      return NextResponse.json(
        { error: "세 가지 답변이 모두 필요합니다." },
        { status: 400 }
      );
    }

    const jobTitle = await generateWithRetry(q1, q2, q3);
    return NextResponse.json({ jobTitle });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Anthropic API error:", errMsg);

    const isRateLimit =
      errMsg.includes("rate_limit") || errMsg.includes("overloaded");

    return NextResponse.json(
      {
        error: isRateLimit
          ? "지금 너무 많은 요청이 몰렸습니다. 잠시 후 다시 시도해주세요."
          : errMsg,
      },
      { status: 500 }
    );
  }
}
