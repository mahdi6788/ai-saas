import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unathorized", { status: 401 });
    if (!messages)
      return new NextResponse("Message are required", { status: 400 });
    if (!openai.apiKey)
      return new NextResponse("OpenAI API key not confiqured", { status: 500 });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages,
    });
    return NextResponse.json(completion.choices[0].message);
    // completion.then((result) => NextResponse.json(result.choices[0].message));
  } catch (error) {
    console.log("Conversation Error: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
