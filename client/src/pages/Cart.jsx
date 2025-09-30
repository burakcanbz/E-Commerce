import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, setCart } from "../slices/cartSlice";
import Message from "../components/Message";

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
    const items = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).cartItems : [];
    dispatch(setCart(items));
  }, [dispatch]);

  return (
    <motion.div
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Row>
        <Col sm={4} md={8}>
          <h1 style={{ marginBottom: "20px" }}>
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
                      style={{ backgroundColor: "rgba(208, 217, 220)" }}
                      key={item._id}
                    >
                      <LinkContainer to={`/product/${item._id}`}>
                        <Row className="d-flex align-items-center">
                          <Col sm={1} md={3}>
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
                              onClick={(e) => e.stopPropagation()}
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
                              <strong className="fs-6">
                                Price: ${item.price}
                              </strong>
                            </Row>
                            <Row className="ms-5 mt-3">
                              <Col sm={1} md={1}>
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
                              </Col>
                            </Row>
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
        <Col sm={2} md={3} className=" d-flex flex-column ms-auto">
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
    </motion.div>
  );
};

export default Cart;
