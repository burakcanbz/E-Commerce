import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  useCancelOrderMutation,
  useGetOrderDetailsQuery,
} from "../slices/ordersApiSlice";
import { convertToUTC } from "../utils/helpers";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const Order = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    setHasError(false);
    throw new Error("Order component error.");
  }

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(orderId).unwrap();
      toast.success("Order cancelled");
      navigate("/profile");
    } catch (err) {
      setHasError(true);
    }
  };

  return isLoading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <motion.div
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Row>
        <Col xs={10} md={8} className="mx-auto mb-4">
          <ListGroup variant="flush">
            <ListGroup.Item className="order-details">
              <h2 className="mb-4">Shipping Details</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Address: </strong> {order.shippingAddress.address} ,{" "}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not delivered yet.</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> Credit Card
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid at {convertToUTC(order.paidAt)}
                </Message>
              ) : (
                <Message variant="danger">Not paid yet.</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  style={{
                    border:
                      window.innerWidth >= 768 ? "1px solid #dee2e6" : "none",
                  }}
                >
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={4} className="my-2 my-md-auto">
                      <Link to={`/product/${item.product}`}>
                        <strong>{item.name}</strong>
                      </Link>
                    </Col>
                    <Col md={4} className="my-0 my-md-auto mb-1 mb-md-0">
                      {item.qty} x ${item.price} ={" "}
                      <strong>${(item.qty * item.price).toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
            <ListGroup.Item className="text-end">
              <Button
                className="btn btn-danger mt-3 mb-2"
                onClick={handleCancelOrder}
              >
                Cancel Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={10} md={3} lg={4} className="mx-auto">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-light">
                <div className="text-center fs-3 fw-semibold">Order Summary</div>
              </ListGroup.Item>
              <ListGroup.Item className="p-2">
                <Row className="gap-2 text-center mx-auto">
                  <Row>
                    <Col>
                      <strong>Items:</strong>
                    </Col>
                    <Col>
                      <strong>${order.itemsPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <strong>Shipping:</strong>
                    </Col>
                    <Col>
                      <strong>${order.shippingPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <strong>Tax:</strong>
                    </Col>
                    <Col>
                      <strong>${order.taxPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <strong>Total:</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <Row>{/* <OrderPayment /> */}</Row>
        </Col>
      </Row>
    </motion.div>
  );
};

export default Order;
