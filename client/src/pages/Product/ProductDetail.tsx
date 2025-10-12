import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  useGetProductReviewsQuery,
  useCreateReviewMutation,
} from "../../slices/reviewsApiSlice";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";
import { addToCart } from "../../slices/cartSlice.ts";

import ProductDetailPresenter from "./ProductDetailPresenter";
import "./main.scss";

import type { JSX } from "react";
import type { ProductDetailPropsType } from "../../types/components.ts";
import type { AppDispatch } from "../../store/store.ts";
import type { CartItem, Product, Review, RootState } from "../../types/redux.ts";

const ProductDetail = (): JSX.Element => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [qty, setQty] = useState<number>(1);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const [
    createReview,
    { isLoading: loadingReviewCreate, error: errorReviewCreate },
  ] = useCreateReviewMutation();
  const { id: productId } = useParams();
  const {
    data: reviews,
    isLoading: loadingReviews,
  }: { data?: { reviews: Review[] }; isLoading: boolean } =
    useGetProductReviewsQuery(productId!, {
      skip: !productId
    }); // run this if productId is defined
  const {
    data: product,
    isLoading: productLoading,
    error: productLoadingError,
  }: {
    data?: Product;
    isLoading: boolean;
    error?: any;
  } = useGetProductDetailsQuery(productId! , {
    skip: !productId
  }); // run this if productId is defined

  const addToCartHandler = (): void => {
    const updatedProduct: CartItem | undefined = cartItems.find(
      (item: CartItem) => item._id === productId
    );
    setQty((prevQty) => {
      if (updatedProduct) {
        let count = updatedProduct?.qty + prevQty || prevQty;
        if (product && count <= product.countInStock) {
          dispatch(addToCart({ ...(updatedProduct ?? product), qty: count }));
          navigate("/");
        } else {
          count = prevQty;
          setShowMessage(true);
        }
        return count;
      }
      else{
        if (product) {
          dispatch(addToCart({ ...(product), qty: prevQty }));
          navigate("/");
        }
      }
      return prevQty;
    });
  };

  const handleCommentChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(e.target.value);
  };

  const commentSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim() === "") {
      alert("Please enter a comment");
      return;
    }
    if (!userInfo) {
      toast.warning("Please log in to submit a review");
      navigate("/login?redirect=/product/" + productId);
      return;
    }
    if (!productId) {
      toast.error("Product not found");
      return;
    }

    try {
      await createReview({
        productId: productId,
        review: { comment, rating: rating },
      }).unwrap();
      toast.success("Review submitted successfully");
      setComment("");
      setRating(0);
    } catch (err) {
      toast.error("Failed to submit review. Please fill all fields.");
      console.error("Failed to submit review:", err);
    }
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const props: ProductDetailPropsType = {
    product,
    qty,
    setQty,
    addToCartHandler,
    reviews,
    loadingReviews,
    userInfo,
    rating,
    setRating,
    comment,
    handleCommentChange,
    commentSubmitHandler,
    loadingReviewCreate,
    errorReviewCreate,
    productLoading,
    productLoadingError,
    showMessage,
  };

  return <ProductDetailPresenter {...props} />;
};

export default ProductDetail;
