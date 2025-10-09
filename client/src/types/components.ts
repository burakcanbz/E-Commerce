import { ReactNode } from "react";
import { CartItem, UserInfo, Product, Review } from "./redux";

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

export interface CartPropsType {
  cartItems: CartItem[];
  addToCartHandler: (product: Product, qty: number) => void;
  removeFromCartHandler: (id: string) => void;
  checkoutHandler: () => void;
}

export type ProductCardPropsType =
  | { product: Product; searchedProduct?: never }
  | { searchedProduct: Product; product?: never };

export interface HomePropsType {
  isDesktop: boolean;
  categories: string[];
  searchedProducts: Product[] | undefined;
}

export interface RatingPropsType {
  value: number | null;
  text?: string;
  onChange?: (newValue: number) => void;
}

export interface ProductDetailPropsType {
    product?: Product;
    qty: number;
    setQty: React.Dispatch<React.SetStateAction<number>>;
    addToCartHandler: () => void;
    reviews?: { reviews: Review[] };
    loadingReviews: boolean;
    userInfo: UserInfo | null;
    rating: number;
    setRating: React.Dispatch<React.SetStateAction<number>>;
    comment: string;
    handleCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    commentSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
    loadingReviewCreate: boolean;
    errorReviewCreate: any;
    productLoading: boolean;
    productLoadingError: any;
    showMessage: boolean;
  }
