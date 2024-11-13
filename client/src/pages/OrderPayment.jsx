import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/PaymentForm";
import { Row, Col, Container } from "react-bootstrap";
import { usePayOrderMutation, useGetConfigQuery } from "../slices/paymentApiSlice";
import Loading from "../components/Loading";

const OrderPayment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const [payOrder, { isLoading, isSuccess, error }] = usePayOrderMutation();
  const { data } = useGetConfigQuery();

  const pay = async() => {
    const resp = await payOrder().unwrap();
    const { clientSecret } = resp;
    setClientSecret(clientSecret);
  }

  useEffect(() => {
    pay();
  }, []);

  useEffect(() => {
    if (data) {
      setStripePromise(loadStripe(data.publishableKey));
    }
  }, [data]); 

  return (
    <>
      <Container >
        <Row className="my-5">
        { isLoading && <Loading />}
          <Col>
            {clientSecret && stripePromise && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm />
              </Elements>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderPayment;
