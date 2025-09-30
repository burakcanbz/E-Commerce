import React from "react";
import * as Sentry from "@sentry/react";
import Fallback from "../Fallback";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, { extra: errorInfo });
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
