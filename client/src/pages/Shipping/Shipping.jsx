import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../slices/cartSlice";
import FormContainer from "../../components/Common/FormContainer";
import CheckoutStepper from "../../components/Common/CheckoutStepper";

const Shipping = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
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
              onChange={(e) => setAddress(e.target.value)}
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
              onChange={(e) => setCity(e.target.value)}
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
              onChange={(e) => setPostalCode(e.target.value)}
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
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
        <Button
          onClick={submitHandler}
          variant="primary"
          className="mt-5 mx-auto"
        >
          Continue
        </Button>
      </FormContainer>
    </>
  );
};

export default Shipping;
