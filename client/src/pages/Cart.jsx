import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { LinkContainer } from "react-router-bootstrap";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Row>
      <Col sm={4} md={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty <Link to="/"> Go Back</Link>
          </Message>
        ) : (
          <Card>
            <ListGroup variant="flush">
              {cartItems.map((item) => {
                return (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col sm={1} md={2}>
                        <Link to={`/product/${item._id}`}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Link>
                      </Col>
                      <Col sm={2} md={4}>
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "bold",
                          }}
                          to={`/product/${item._id}`}
                        >
                          {" "}
                          {item.name}{" "}
                        </Link>
                      </Col>
                      <Col sm={1} md={2}>
                        <Form.Control
                          className="text-center"
                          as="select"
                          value={item.qty}
                          onChange={(e) => {
                            addToCartHandler(item, Number(e.target.value));
                          }}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {" "}
                              {x + 1}{" "}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col sm={1} md={3} className="mt-1 ms-auto">
                        <Row>
                          <strong className="fs-6">Price: ${item.price}</strong>
                        </Row>
                        <Row className="ms-5 mt-3">
                          <Col sm={1} md={1} >
                            <Button
                              type="button"
                              variant="danger"
                              onClick={(e) => removeFromCartHandler(item._id)}
                              size="sm"
                            >
                              <FaTrash />
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card>
        )}
      </Col>
      <Col sm={2} md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              <strong>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
