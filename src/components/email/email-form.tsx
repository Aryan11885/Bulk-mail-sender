"use client";

import RichTextEditor from "./rich-text-editor";

export default function EmailForm() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">
        Compose Email
      </h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Subject
          </label>

          <input
            type="text"
            placeholder="Enter email subject..."
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Body
          </label>

          <RichTextEditor />
        </div>
      </div>
    </div>
  );
}