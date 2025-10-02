import React from "react";
import { Card, Form } from "react-bootstrap";

const BuyerInformation = () => {
  return (
    <Card className="p-5" style={{ maxWidth: 350, height: "650px", margin: "0 auto" }}>
      <Form>
        <h3>User Information</h3>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter your address" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Enter your city" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your postal code"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" placeholder="Enter your country" required />
        </Form.Group>
      </Form>
    </Card>
  );
};

export default BuyerInformation;
