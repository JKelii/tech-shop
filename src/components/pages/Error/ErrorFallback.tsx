"use client";

import { FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center p-8 rounded-lg bg-gray-800 shadow-xl">
        <h1 className="text-5xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-xl text-gray-300 mb-6">
          {error.message || "Something went wrong"}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200 font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
