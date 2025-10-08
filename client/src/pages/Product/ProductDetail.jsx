import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  useGetProductReviewsQuery,
  useCreateReviewMutation,
} from "../../slices/reviewsApiSlice";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";
import { addToCart } from "../../slices/cartSlice";
import ProductDetailPresenter from "./ProductDetailPresenter";
import './main.scss';

const ProductDetail = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [qty, setQty] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [
    createReview,
    { isLoading: loadingReviewCreate, error: errorReviewCreate },
  ] = useCreateReviewMutation();
  const { id: productId } = useParams();
  const { data: reviews, isLoading: loadingReviews } =
    useGetProductReviewsQuery(productId);
  const {
    data: product,
    isLoading: productLoading,
    error: productLoadingError,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    const updatedProduct = cartItems.find((item) => item._id === productId);
    setQty((prevQty) => {
      let count = updatedProduct?.qty + prevQty || prevQty;
      if (count <= product.countInStock) {
        dispatch(addToCart({ ...(updatedProduct ?? product), qty: count }));
        navigate("/");
      } else {
        count = prevQty;
        setShowMessage(true);
      }
      return count;
    });
  };

  const handleCommentChange = async (e) => {
    setComment(e.target.value);
  };

  const commentSubmitHandler = async (e) => {
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
    try {
      await createReview({
        productId,
        review: { comment, rating: rating },
      }).unwrap();
      toast.success("Review submitted successfully");
      setComment("");
      setRating(0);
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const props = { product, qty, setQty, addToCartHandler, reviews, loadingReviews, userInfo, rating, setRating, comment, handleCommentChange, commentSubmitHandler, loadingReviewCreate, errorReviewCreate, productLoading, productLoadingError, showMessage };

  return (
    <ProductDetailPresenter {...props} />
  );
};

export default ProductDetail;
