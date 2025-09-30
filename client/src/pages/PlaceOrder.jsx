import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { setOrder } from "../slices/orderSlice";
import Message from "../components/Message";
import Loading from "../components/Loading";
import CheckoutStepper from "../components/CheckoutStepper";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (
      !cart.shippingAddress ||
      Object.keys(cart.shippingAddress).length === 0
    ) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress, cart.paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const resp = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      navigate(`/order/${resp._id}`);
      dispatch(setOrder(resp));
      dispatch(clearCartItems());
    } catch (err) {
      const errorMessage = error?.message || JSON.stringify(error); // Extract message or stringify the error
      toast.error(errorMessage); // Pass the string to toast.error
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <div
              className="p-4 rounded-4 mt-5"
              style={{
                maxWidth: 600,
                background: "#f1f5f9",
                width: "100%",
                margin: "auto",
              }}
            >
              <CheckoutStepper activeStep={2} />
            </div>
          </Col>
        </Row>
      </Container>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address} {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loading />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
