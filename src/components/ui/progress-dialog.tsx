"use client";

interface Result {
  name: string;
  email: string;
  status: "success" | "failed";
}

interface ProgressDialogProps {
  open: boolean;
  completed: boolean;
  progress: number;
  total: number;
  currentEmail: string;
  results: Result[];
  onClose: () => void;
}

export default function ProgressDialog({
  open,
  completed,
  progress,
  total,
  currentEmail,
  results,
  onClose,
}: ProgressDialogProps) {
  if (!open) return null;

  const percentage =
    total === 0 ? 0 : Math.round((progress / total) * 100);

  const sent = results.filter((r) => r.status === "success").length;
  const failed = results.filter((r) => r.status === "failed").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="max-h-[85vh] w-[650px] overflow-auto rounded-2xl bg-white p-6 shadow-2xl">

        {!completed ? (
          <>
            <h2 className="mb-6 text-2xl font-bold">
              📤 Sending Emails...
            </h2>

            <div className="mb-4 h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>{progress} / {total}</span>
              <span>{percentage}%</span>
            </div>

            <div className="mt-6 rounded-lg border bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Currently Sending
              </p>

              <p className="mt-1 font-semibold break-all">
                {currentEmail || "Preparing..."}
              </p>
            </div>

            <p className="mt-6 text-center text-sm text-gray-400">
              Please don't close this window while emails are being sent.
            </p>
          </>
        ) : (
          <>
            <h2 className="mb-6 text-2xl font-bold text-green-600">
              🎉 Bulk Email Completed
            </h2>

            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-gray-100 p-4 text-center">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-3xl font-bold">{total}</p>
              </div>

              <div className="rounded-xl bg-green-100 p-4 text-center">
                <p className="text-sm text-green-700">Sent</p>
                <p className="text-3xl font-bold text-green-700">
                  {sent}
                </p>
              </div>

              <div className="rounded-xl bg-red-100 p-4 text-center">
                <p className="text-sm text-red-700">Failed</p>
                <p className="text-3xl font-bold text-red-700">
                  {failed}
                </p>
              </div>
            </div>

            <div className="max-h-[320px] space-y-3 overflow-y-auto">
              {results.map((result) => (
                <div
                  key={result.email}
                  className="flex items-center justify-between rounded-xl border p-4"
                >
                  <div>
                    <p className="font-semibold">
                      {result.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {result.email}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-4 py-1 text-sm font-medium ${
                      result.status === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {result.status === "success"
                      ? "✅ Sent"
                      : "❌ Failed"}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-lg bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}