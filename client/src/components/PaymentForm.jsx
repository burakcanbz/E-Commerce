import { PaymentElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { setPaidAmount, clearOrder } from "../slices/orderSlice";
import {
  usePaySelectedOrderMutation,
  useGetOrderDetailsQuery,
} from "../slices/ordersApiSlice";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PaymentForm() {
  const { id: orderId } = useParams();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [paid, setPaid] = useState(false);
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = useSelector(
    (state) =>
      state.order.orders.find((item) => item._id === orderId)?.totalPrice
  );
  const paidAmount = useSelector(
    (state) =>
      state.order.orders.find((item) => item._id === orderId)?.paidAmount
  );

  const [paySelectedOrder] = usePaySelectedOrderMutation();
  const { data: order, refetch } = useGetOrderDetailsQuery(orderId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      await dispatch(setPaidAmount({ paidAmount: totalPrice, orderId }));
      await dispatch(clearOrder());
    } catch (error) {
      toast.error("Failed to set paid amount.");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (paidAmount && paidAmount === totalPrice) {
      paySelectedOrder({ amount: totalPrice, orderId })
        .then((resp) => {
          if (resp?.data?.updatedOrder?.isPaid) {
            setPaid(true);
            toast.success("Payment succeeded");
            refetch();
            setTimeout(() => {
              navigate('/');
            }, 3000)
          } else {
            throw new Error("Payment not marked as paid");
          }
        })
        .catch((error) => {
          toast.error(`Payment failed: ${error.message}`);
        });
    }
  }, [paidAmount, totalPrice, paySelectedOrder, refetch]);

  return ( !order.isPaid && 
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button
        className="my-2"
        disabled={isProcessing || !stripe || !elements || paid}
        id="submit"
        type="submit"
      >
        <span id="button-text">
          {isProcessing ? "Processing ..." : "Pay now"}
        </span>
      </Button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
