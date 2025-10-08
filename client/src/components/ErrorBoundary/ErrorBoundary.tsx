import React from "react";
import * as Sentry from "@sentry/react";

import { ErrorBoundaryProps, ErrorBoundaryState } from "../../types/components";
import Fallback from "./Fallback.tsx";


class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    Sentry.captureException(error, { extra: { errorInfo } });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Fallback/>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
