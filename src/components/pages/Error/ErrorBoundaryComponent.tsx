import React, { ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";

type ErrorBoundaryComponentType = {
  children: ReactNode;
};

export const ErrorBoundaryComponent = ({
  children,
}: ErrorBoundaryComponentType) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};
