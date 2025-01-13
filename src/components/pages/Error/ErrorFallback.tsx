"use client";

import type { FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="rounded-lg bg-gray-800 p-8 text-center shadow-xl">
        <h1 className="mb-4 text-5xl font-bold text-red-500">Oops!</h1>
        <p className="mb-6 text-xl text-gray-300">
          {error.message || "Something went wrong"}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="rounded-md bg-red-500 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
