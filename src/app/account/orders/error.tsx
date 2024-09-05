"use client";

const ErrorPage = ({ error }: { error: Error & { digest?: string } }) => {
  return <div>{error.message}</div>;
};

export default ErrorPage;
