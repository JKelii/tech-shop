"use client";

export const ErrorBoundary = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <p> {error.message} </p>
      <button onClick={reset}> Try again</button>
    </div>
  );
};

export default ErrorBoundary;
