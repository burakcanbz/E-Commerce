import { useState, useEffect, JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { saveShippingAddress } from "../../slices/cartSlice.ts";
import { AppDispatch } from "../../store/store.ts";
import { RootState } from "../../types/redux.ts";

import FormContainer from "../../components/Common/FormContainer";
import CheckoutStepper from "../../components/Common/CheckoutStepper";
import './main.scss';

const Shipping = (): JSX.Element => {
  const { shippingAddress } = useSelector((state: RootState) => state.cart);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const [address, setAddress] = useState<string>(shippingAddress?.address || "");
  const [city, setCity] = useState<string>(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState<string>(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState<string>(shippingAddress?.country || "");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);

  return (
    <>
      <FormContainer>
        <CheckoutStepper activeStep={0} />
        <h1 className="text-center"> Address </h1>
        <Form
          onSubmit={submitHandler}
          id="checkout"
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <Form.Group controlId="address" className="my-2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              className="placeholder-secondary"
              placeholder="Enter address"
              style={{
                borderRadius: 8,
                padding: "10px 12px",
                borderColor: "#68a7e6ff",
              }}
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city" className="my-2">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              className="placeholder-secondary"
              placeholder="Enter city"
              style={{
                borderRadius: 8,
                padding: "10px 12px",
                borderColor: "#68a7e6ff",
              }}
              value={city}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="postalCode" className="my-2">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              className="placeholder-secondary"
              placeholder="Enter Postal Code"
              style={{
                borderRadius: 8,
                padding: "10px 12px",
                borderColor: "#68a7e6ff",
              }}
              value={postalCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="country" className="my-2">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              className="placeholder-secondary"
              placeholder="Enter Country"
              style={{
                borderRadius: 8,
                padding: "10px 12px",
                borderColor: "#68a7e6ff",
              }}
              value={country}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-5 mx-auto">
          Continue
        </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Shipping;