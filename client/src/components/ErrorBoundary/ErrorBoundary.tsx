import React from "react";

import Fallback from "./Fallback.tsx";

import type{ ErrorBoundaryProps, ErrorBoundaryState } from "../../types/components";

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, { extra: { errorInfo } });
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
