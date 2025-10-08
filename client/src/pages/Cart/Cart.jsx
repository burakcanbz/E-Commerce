import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaTrash } from "react-icons/fa";

import { addToCart, removeFromCart, setCart } from "../../slices/cartSlice.ts";
import CustomContainer from "../../components/Common/CustomContainer";
import Message from "../../components/Common/Message";
import './main.scss';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, qty } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  useEffect(() => {
    const items = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).cartItems
      : [];
    dispatch(setCart(items));
  }, [dispatch]);

  return (
    <motion.div
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <CustomContainer>
      <Row>
        <Col xs={10} sm={12} md={10} xl={8} className="mx-auto mt-4">
          <h1 className="text-center" style={{ marginBottom: "20px" }}>
            My Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
          </h1>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is empty <Link to="/"> Go Back</Link>
            </Message>
          ) : (
            <Card style={{ cursor: "pointer" }}>
              <ListGroup variant="flush">
                {cartItems.map((item) => {
                  return (
                    <ListGroup.Item
                      style={{
                        backgroundColor: "rgba(208, 217, 220)",
                        margin: 10,
                        borderRadius: 10,
                      }}
                      key={item._id}
                    >
                      <LinkContainer to={`/product/${item._id}`}>
                        <Row className="d-flex align-items-center">
                          <Col xs={11} sm={2} md={3} className="mx-auto">
                            <Link to={`/product/${item._id}`}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Link>
                          </Col>
                          <Col xs={10} sm={3} md={4} className="mx-auto mt-1">
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
                          <Col xs={6} sm={2} md={2} className="mt-2 mx-auto">
                            <Form.Control
                              as="select"
                              value={item.qty}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => {
                                addToCartHandler(item, Number(e.target.value));
                              }}
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option
                                  key={x + 1}
                                  value={x + 1}
                                >
                                  {" "}
                                  {x + 1}{" "}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                          <Col
                            xs={10}
                            sm={3}
                            md={3}
                            className="mt-3 mb-2 mx-auto"
                          >
                            <div className="d-flex flex-row align-items-center justify-content-between">
                              <strong className="fs-6 me-sm-3">
                                Price: ${item.price.toFixed(2)}
                              </strong>
                              <Button
                                type="button"
                                variant="danger"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  removeFromCartHandler(item._id);
                                }}
                                size="sm"
                              >
                                <FaTrash />
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </LinkContainer>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card>
          )}
        </Col>
        <Col xs={8} sm={6} md={5} xl={3} className=" d-flex flex-column mx-auto mt-5 mt-xl-5">
          <Card className="p-2">
            <ListGroup variant="flush">
              <ListGroup.Item className="border-0 mt-2">
                <h2>Cart Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item className="border-0 mt-2">
                <strong className="ms-3">
                  Total Price: $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </strong>
              </ListGroup.Item>
              <ListGroup.Item className="mt-1 mb-2">
                <strong className="ms-3">
                  Shipping Price: $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2) > 100
                    ? 0
                    : 10}
                </strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong className="ms-3">
                  Total: ${" "}
                  {Number(
                    cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)
                  ) +
                    Number(
                      cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2) > 100
                        ? 0
                        : 10
                    )}
                </strong>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <Button
            style={{ backgroundColor: "rgba(236, 105, 43)" }}
            className="mt-3 align-self-center border-0 px-5"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Confirm Cart
          </Button>
        </Col>
      </Row>
      </CustomContainer>
    </motion.div>
  );
};

export default Cart;
