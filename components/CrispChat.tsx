"use client";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export function CrispChat() {
  useEffect(() => {
    Crisp.configure("f08df3bb-2e34-4ac2-b099-0d1f047c7e3b");
  }, []);
  return null;
}
