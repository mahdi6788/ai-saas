import {
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";

export const tools = [
  {
    icon: MessageSquare,
    label: "Conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    icon: ImageIcon,
    label: "Image Generation",
    href: "/image",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    icon: VideoIcon,
    label: "Video Generation",
    href: "/video",
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
  {
    icon: Music,
    label: "Music Generation",
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Code,
    label: "Code Generation",
    href: "/code",
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
];