import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt, amount = 1, resolution = "512x512" } = await req.json();
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unathorized", { status: 401 });
    if (!prompt)
      return new NextResponse("Prompt are required", { status: 400 });
    if (!amount)
      return new NextResponse("Amount are required", { status: 400 });
    if (!resolution)
      return new NextResponse("Resolution are required", { status: 400 });
    if (!openai.apiKey)
      return new NextResponse("OpenAI API key not confiqured", { status: 500 });

    const result = await openai.images.generate({
      model: "gpt-4o-mini",
      prompt,
      size:resolution,
      n:parseInt(amount, 10)
    });
    return NextResponse.json(result.data);
  } catch (error) {
    console.log("Image Error: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
