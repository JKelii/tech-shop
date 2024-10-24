"use client";

export const ErrorBoundary = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-2">
      <p> {error.message} </p>
      <button onClick={reset}> Try again</button>
    </div>
  );
};

export default ErrorBoundary;
