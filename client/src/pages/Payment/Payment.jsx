import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../slices/cartSlice";
import FormContainer from "../../components/Common/FormContainer";
import CheckoutStepper from "../../components/Common/CheckoutStepper";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const { shippingAddress } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  const validateAddress = (data) => {
    const errors = {};

    if (!shippingAddress.address || shippingAddress.address.trim() === "") {
      errors.address = "Address is required.";
    }
    if (!shippingAddress.city || shippingAddress.city.trim() === "") {
      errors.city = "City is required.";
    }
    if (
      !shippingAddress.postalCode ||
      shippingAddress.postalCode.trim() === ""
    ) {
      errors.postalCode = "Postal Code is required.";
    }
    if (!shippingAddress.country || shippingAddress.country.trim() === "") {
      errors.country = "Country is required.";
    }

    return errors;
  };

  useEffect(() => {
    const errors = validateAddress(shippingAddress);
    if (Object.keys(errors).length > 0) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  return (
    <FormContainer>
      <CheckoutStepper activeStep={1} />
      <Form
        id="checkout"
        onSubmit={submitHandler}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <Form.Group className="mt-4">
          <Form.Label as="legend">Select Payment Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="mt-5"
              label="Credit Card"
              id="CreditCard"
              name="paymentMethod"
              value="Credit Card"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-4">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Payment;
