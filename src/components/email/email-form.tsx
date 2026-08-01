"use client";

import RichTextEditor from "./rich-text-editor";
import { useEmailStore } from "@/store/email-store";
import SendTestButton from "./send-test-button";
import SendAllButton from "./send-all-button";

export default function EmailForm() {
  const { subject, setSubject } = useEmailStore();

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">Compose Email</h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Subject</label>

          <input
            type="text"
            placeholder="Enter email subject..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Email Body</label>

          <RichTextEditor />
          <div className="mt-6 flex justify-end gap-3">
            <SendTestButton />
            <SendAllButton />
          </div>
        </div>
      </div>
    </div>
  );
}
