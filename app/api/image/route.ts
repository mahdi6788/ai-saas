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

    // const resp = await fetch('https://api.deepai.org/api/text2img', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'api-key': process.env.DEEPAI_API_KEY as string
    //     },
    //     body: JSON.stringify({
    //         text: prompt as string,
    //     })
    // });
    
    // Check if response is OK
    if (!result) {
      console.error("API Error: No result returned from OpenAI API");
      return new Response("Failed to fetch image from API", { status: 500 });
    }

    console.log("RESULT:", result);

    if (!result || !Array.isArray(result.data) || result.data.length === 0) {
      return new Response("No image data returned", { status: 404 });
    }

    if (!isPro) {
      await increaseApiLimit(); /// increase the amount of API usages
    }

    // Process and return result
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
