import { checkApiLimitCount, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unathorized", { status: 401 });
    if (!prompt) return new NextResponse("Prompt is required", { status: 400 });
    const freeCount = await checkApiLimitCount();
    const isPro = await checkSubscription();
    if (!freeCount && !isPro)
      return new NextResponse("Free trial has expired", { status: 403 });

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          fps: 24,
          model: "xl",
          width: 1024,
          height: 576,
          prompt: prompt,
          batch_size: 1,
          num_frames: 24,
          init_weight: 0.5,
          guidance_scale: 17.5,
          negative_prompt:
            "very blue, dust, noisy, washed out, ugly, distorted, broken",
          remove_watermark: false,
          num_inference_steps: 50,
        },
      }
    );
    if (!isPro) {
      await increaseApiLimit(); /// increase the amount of API usages
    }

    return NextResponse.json(response);
  } catch (error) {
    console.log("Video Error: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
