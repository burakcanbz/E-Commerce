import { ReactNode } from "react";

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface FlagPortalProps {
  render: () => ReactNode;
  id: string;
}
