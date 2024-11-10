import { PaymentElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { setPaidAmount } from "../slices/orderSlice";
import { usePaySelectedOrderMutation, useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function PaymentForm() {

  const { id: orderId } = useParams();
  const stripe = useStripe();
  const elements = useElements();

  const { orders } = useSelector(state => state.order);
  const paidAmount = useSelector((state) => state.order.orders[0]?.paidAmount);

  const [ paySelectedOrder ] = usePaySelectedOrderMutation();
  const { data: order, refetch } = useGetOrderDetailsQuery(orderId);

  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    // demonstrating payment succeed.
    e.preventDefault();
    console.log("paid amount => ", paidAmount)
    console.log(orders[0].totalPrice)
    dispatch(setPaidAmount({paidAmount: orders[0].totalPrice, orderId}))
  };

  useEffect(() => {
    console.log('in effect ? ')
    if(paidAmount && paidAmount === orders[0].totalPrice){
      paySelectedOrder({ amount: orders[0].totalPrice, orderId })
      .then(_ => {
        toast.success('Payment succeed')
        refetch(); 
      })
      .catch(error => {
        toast.error('Payment failed', error)
      });
    }
  }, [paidAmount, orders[0].totalPrice, paySelectedOrder, refetch])

  

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button className='my-2' disabled={isProcessing || !stripe || !elements} id="submit" type="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </Button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}