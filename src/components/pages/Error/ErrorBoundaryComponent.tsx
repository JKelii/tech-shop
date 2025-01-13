import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "./ErrorFallback";

import type { ReactNode } from "react";

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
