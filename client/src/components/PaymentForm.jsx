import React, { useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const PaymentForm = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment data:", state);
  };

  return (
    <Card
      className="px-4 py-5 rounded-4 shadow mt-2"
      style={{
        maxWidth: "850px",
        backgroundColor: "#f8f9fa",
        border: "1px solid #e0e0e0",
      }}
    >
      <Row className="align-items-center">
        <Col md={6} className="mb-4 mb-md-0">
          <Row>
            <Row className="mb-4">
              <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus !== "cvc"}
              />
            </Row>
            <Row>
              <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused="cvc"
              />
            </Row>
          </Row>
        </Col>
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="ps-0 ps-md-5">
            {[
              {
                id: "cardNumber",
                label: "Card Number",
                name: "number",
                placeholder: "XXXX XXXX XXXX XXXX",
                maxLength: 16,
              },
              {
                id: "cardName",
                label: "Card Holder Name",
                name: "name",
                placeholder: "John Doe",
              },
              {
                id: "cardExpiry",
                label: "Expiry",
                name: "expiry",
                placeholder: "MM/YY",
                maxLength: 5,
              },
              {
                id: "cardCvc",
                label: "CVC",
                name: "cvc",
                placeholder: "CVC",
                maxLength: 3,
              },
            ].map((field) => (
              <Form.Group className="mb-3" controlId={field.id} key={field.id}>
                <Form.Label
                  className="fw-semibold"
                  style={{ color: "#495057" }}
                >
                  {field.label}
                </Form.Label>
                <Form.Control
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={state[field.name]}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  maxLength={field.maxLength || undefined}
                  className="rounded-3 border-1 border-light shadow-sm p-2"
                  style={{ fontSize: "0.95rem", color: "#212529" }}
                />
              </Form.Group>
            ))}
            <div className="text-center mt-4">
              <Button
                type="submit"
                className="w-50 py-2 rounded-3"
                style={{
                  backgroundColor: "#343a40", // elegant dark gray
                  color: "#fff",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = 0.85)}
                onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
              >
                Pay Now
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default PaymentForm;
