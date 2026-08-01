import { create } from "zustand";
import type { Recipient } from "@/types/recipient";
import type { EmailHistory } from "@/types/history";

interface EmailStore {
  subject: string;
  body: string;
  recipients: Recipient[];

  // NEW
  history: EmailHistory[];

  setSubject: (value: string) => void;
  setBody: (value: string) => void;
  setRecipients: (value: Recipient[]) => void;

  // NEW
  setHistory: (history: EmailHistory[]) => void;
  addHistory: (item: EmailHistory) => void;

  reset: () => void;
}

export const useEmailStore = create<EmailStore>((set) => ({
  subject: "",

  body: `<p>Dear {{name}},</p><p>Welcome to Creyotech 🚀</p>`,

  recipients: [],

  // NEW STATE
  history: [],

  setSubject: (subject) => set({ subject }),

  setBody: (body) => set({ body }),

  setRecipients: (recipients) => set({ recipients }),

  // 👇 ADD THEM HERE
  setHistory: (history) => set({ history }),

  addHistory: (item) =>
    set((state) => ({
      history: [item, ...state.history],
    })),

  reset: () =>
    set({
      subject: "",
      body: "<p>Dear {{name}},</p><p>Welcome to Creyotech 🚀</p>",
      recipients: [],
    }),
}));