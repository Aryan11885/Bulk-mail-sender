import { create } from "zustand";
import type { Recipient } from "@/types/recipient";

interface EmailStore {
  subject: string;
  body: string;
  recipients: Recipient[];

  setSubject: (value: string) => void;
  setBody: (value: string) => void;
  setRecipients: (value: Recipient[]) => void;
}

export const useEmailStore = create<EmailStore>((set) => ({
  subject: "",

  body: `<p>Dear {{name}},</p><p>Welcome to Creyotech 🚀</p>`,

  recipients: [],

  setSubject: (subject) => set({ subject }),

  setBody: (body) => set({ body }),

  setRecipients: (recipients) => set({ recipients }),
}));