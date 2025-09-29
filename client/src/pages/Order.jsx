import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import { convertToUTC } from "../utils/helpers";

const Order = () => {
  const { id: orderId } = useParams();

  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error("Order component error.");
  }

  const handleCancelOrder = () => {
    try{
      throw new Error("Order cancellation error.");
    }
    catch(err){
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
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="order-details">
              <h2 className="mb-4">Shipping Details</h2>
              <p>
                {" "}
                <strong>Order id: </strong>
                {order._id}{" "}
              </p>
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
                <Message variant="danger">Not Delivered</Message>
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
                <Message variant="danger">Not Paid yet.</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
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
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
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
