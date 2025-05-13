import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unathorized", { status: 401 });
    const { messages } = await req.json();
    if (!messages)
      return new NextResponse("Message are required", { status: 400 });
    const freeTrial = await checkApiLimit();
    if (!freeTrial)
      return new NextResponse("Free trial has expired", { status: 403 });
    if (!openai.apiKey)
      return new NextResponse("OpenAI API key not confiqured", { status: 500 });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages,
    });
    
    await increaseApiLimit()   /// increase the amount of API usage
    
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.log("Conversation Error: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
