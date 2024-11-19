import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <>
            <div className="checkout-steps step-active">
              <LinkContainer to="/login">
                <Nav.Link className="text-white">Login</Nav.Link>
              </LinkContainer>
            </div>
          </>
        ) : (
          <div className="checkout-steps">
            <Nav.Link className="nav-link-disabled" disabled>Login</Nav.Link>
          </div>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <>
            <div className="checkout-steps step-active">
              <LinkContainer to="/shipping">
                <Nav.Link className="text-white">Address</Nav.Link>
              </LinkContainer>
            </div>
          </>
        ) : (
          <div className="checkout-steps">
            <Nav.Link className="nav-link-disabled" disabled>Address</Nav.Link>
          </div>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <>
            <div className="checkout-steps step-active">
              <LinkContainer to="/payment">
                <Nav.Link className="text-white">
                  Payment &nbsp;Details
                </Nav.Link>
              </LinkContainer>
            </div>
          </>
        ) : (
          <div className="checkout-steps">
            <Nav.Link className="nav-link-disabled" disabled>Payment &nbsp;Details</Nav.Link>
          </div>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <div className="checkout-steps step-active">
            <LinkContainer to="/placeorder">
              <Nav.Link className="text-white">Order Details</Nav.Link>
            </LinkContainer>
          </div>
        ) : (
          <div className="checkout-steps">
            <Nav.Link className="nav-link-disabled" disabled>Order Details</Nav.Link>
          </div>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
