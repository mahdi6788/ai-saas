import { z } from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, { message: "Image prompt is required" }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions = [
  {
    value: "1",
    label: "1 photo"
  },
  {
    value: "2",
    label: "2 photos"
  },
  {
    value: "3",
    label: "3 photos"
  },
  {
    value: "4",
    label: "4 photos"
  },
  {
    value: "5",
    label: "5 photos"
  }
]

export const resolutionOptions = [
  {
    value: "1024x1536",
    label: "1024x1536"
  },
  {
    value: "1536x1024",
    label: "1536x1024"
  },
  {
    value: "1024x1024",
    label: "1024x1024"
  }
]