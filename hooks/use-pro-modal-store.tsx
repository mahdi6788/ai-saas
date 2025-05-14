import { create } from "zustand";

interface useProModalStoreType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProModalStore = create<useProModalStoreType>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
