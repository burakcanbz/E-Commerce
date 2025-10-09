import { useEffect, useState, JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { RootState, shippingAddress } from "../../types/redux.ts";
import { savePaymentMethod } from "../../slices/cartSlice.ts";
import { AppDispatch } from "../../store/store.ts";
import FormContainer from "../../components/Common/FormContainer";
import CheckoutStepper from "../../components/Common/CheckoutStepper";
import './main.scss';

const Payment = (): JSX.Element => {
  const [paymentMethod, setPaymentMethod] = useState<string>("Credit Card");
  const { shippingAddress } = useSelector((state: RootState) => state.cart);
  console.log("Shipping Address in Payment Page:", shippingAddress);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  const validateAddress = (data?: shippingAddress | null): {} => {
    const errors: Record<string, string> = {};
    if (!data?.address || data.address.trim() === "") {
      errors.address = "Address is required.";
    }
    if (!data?.city || data.city.trim() === "") {
      errors.city = "City is required.";
    }
    if (
      !data?.postalCode ||
      data.postalCode.trim() === ""
    ) {
      errors.postalCode = "Postal Code is required.";
    }
    if (!data?.country || data.country.trim() === "") {
      errors.country = "Country is required.";
    }

    return errors;
  };

  useEffect(() => {
    const errors = validateAddress(shippingAddress ?? null);
    console.log(errors);
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentMethod(e.target.value)}
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