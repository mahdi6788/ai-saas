import { checkApiLimitCount, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unathorized", { status: 401 });
    const { prompt } = await req.json();
    if (!prompt) return new NextResponse("Prompt is required", { status: 400 });
    const checkCount = await checkApiLimitCount();
    if (!checkCount)
      return new NextResponse("Free trial has expired", { status: 403 });

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          alpha: 0.5,
          prompt_a: prompt,
          prompt_b: "90's rap",
          denoising: 0.75,
          seed_image_id: "vibes",
          num_inference_steps: 50,
        },
      }
    );
    await increaseApiLimit(); /// increase the amount of API usage
    return NextResponse.json(response);
  } catch (error) {
    console.log("Music Error: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
