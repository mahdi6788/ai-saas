"use client";
import { useProModalStore } from "@/hooks/use-pro-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { tools } from "@/lib/tools";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";

export const ProModal = () => {
  const { isOpen, onClose } = useProModalStore();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log("Stripe_Client_error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center gap-y4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Genius
              <Badge variant="premium" className="uppercase text-sm py-1 ">
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription
            asChild
            className="text-center pt-2 space-y-2 text-zinc-900 font-medium"
          >
            <div className="space-y-2">
              {tools.map((tool) => (
                <Card key={tool.label} className=" p-3 border-black/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-4">
                      <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                        <tool.icon className={cn("w-6 h-6", tool.color)} />
                      </div>
                      <div className="font-semibold text-sm ">{tool.label}</div>
                    </div>
                    <Check className="text-primary w-5 h-5" />
                  </div>
                </Card>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={onSubscribe}
            variant="premium"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
