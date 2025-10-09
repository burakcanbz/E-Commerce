import { ReactNode } from "react";
import { CartItem, UserInfo } from "./redux";

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

export interface HeaderPropsType {
    pathName: string;
    isDesktop: boolean;
    showCanvas: boolean;
    handleShowOffcanvas: () => void;
    handleCloseOffcanvas: () => void;
    logoutHandler: () => void;
    cartItems: CartItem[];
    userInfo: UserInfo | null;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchItem: string;
    removeFromCartHandler: (e: React.MouseEvent<HTMLElement>, id: string) => void;
  };