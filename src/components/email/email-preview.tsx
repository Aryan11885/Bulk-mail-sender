"use client";

import { useEmailStore } from "@/store/email-store";

export default function EmailPreview() {
  const { subject, body, recipients } = useEmailStore();

  if (recipients.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">
          Email Preview
        </h2>

        <p className="text-gray-500">
          Add recipients to preview your emails.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">
        Email Preview
      </h2>

      <div className="space-y-6">
        {recipients.map((recipient) => (
          <div
            key={recipient.id}
            className="rounded-lg border p-4"
          >
            <p className="text-sm text-gray-500">
              To
            </p>

            <p className="font-medium">
              {recipient.email}
            </p>

            <hr className="my-4" />

            <p className="text-sm text-gray-500">
              Subject
            </p>

            <p className="mb-4 font-semibold">
              {subject || "(No Subject)"}
            </p>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: body.replaceAll(
                  "{{name}}",
                  recipient.name || "Friend"
                ),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}