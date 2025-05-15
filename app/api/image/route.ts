import { checkApiLimitCount, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    const { prompt, amount = 1, resolution = "1024x1024" } = await req.json();
    if (!prompt)
      return new NextResponse("Prompt are required", { status: 400 });
    if (!amount)
      return new NextResponse("Amount are required", { status: 400 });
    if (!resolution)
      return new NextResponse("Resolution are required", { status: 400 });
    const freeCount = await checkApiLimitCount();
    const isPro = await checkSubscription();
    if (!freeCount && !isPro)
      return new NextResponse("Free trial has expired", { status: 403 });
    if (!openai.apiKey)
      return new NextResponse("OpenAI API key not configured", { status: 500 });

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: resolution,
      n: parseInt(amount),
    });

    if (!result.data || result.data.length === 0) {
      return new NextResponse("No data returned from OpenAI", { status: 500 });
    }

    if (!isPro) {
      await increaseApiLimit(); /// increase the amount of API usages
    }
    return NextResponse.json(result.data);
  } catch (error) {
    console.log("Image Error: ", error);
    // get detailed server logs in Vercel
    if (error instanceof OpenAI.APIError) {
      console.error("Status:", error.status);
      console.error("Details:", error.error);
    }
    return new NextResponse("Internal error", { status: 500 });
  }
}
