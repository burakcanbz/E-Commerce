import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button, Alert, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../slices/ordersApiSlice";
import { useUpdateMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { convertToUTC } from "../utils/helpers";
import StatusIcon from "../components/StatusIcon";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const [update] = useUpdateMutation();
  console.log(orders);
  const setInitials = () => {
    setName(user.name);
    setEmail(user.email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setInitials();
      toast.error("Password not matched.");
    } else if (password.length === 0 && confirmPassword.length === 0) {
      setInitials();
      toast.error("Enter your password and confirm password then try again.");
    } else {
      const resp = await update({
        name,
        email,
        password,
        confirmPassword,
      }).unwrap();
      if (resp) {
        toast.success("Updated successfully!");
        dispatch(setCredentials(resp));
      } else {
        setInitials();
        toast.error("Update Failed!");
      }
    }
  };

  useEffect(() => {
    setInitials();
  }, [user, user.name, user.email]);

  return isLoading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Row>
        {orders.length > 1 ? (
          <Col md={8}>
            <Alert variant="secondary" className="text-center">
              <h2>ORDERS STATUS</h2>
            </Alert>
            <Table variant="dark" responsive="md" striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center">Payment Method</th>
                  <th className="text-center">Paid Status</th>
                  <th className="text-center">Paid Time</th>
                  <th className="text-center">Total Price</th>
                  <th className="text-center">Order Delivered</th>
                  <th className="text-center">Order Page</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td className="text-center">{item._id}</td>
                      <td className="text-center">{item.paymentMethod}</td>
                      <td className="text-center">
                        {<StatusIcon isActive={item.isPaid} />}
                      </td>
                      <td className="text-center">
                        {convertToUTC(item.paidAt)}
                      </td>
                      <td className="text-center ">{item.totalPrice}</td>
                      <td className="text-center">
                        {<StatusIcon isActive={item.isDelivered} />}
                      </td>
                      <td className="text-center">
                        <Link
                          style={{ textDecoration: "none", color: "white" }}
                          to={`/order/${item._id}`}
                        >
                          <Button variant="warning" size="sm">
                            Details
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        ) : (
          <Col md={8}>
            <Message variant="info">No Orders Here.</Message>
          </Col>
        )}
        <Col md={4}>
          <Alert variant="secondary" className="text-center">
            <h2>USER INFORMATION</h2>
          </Alert>
          <Card
            className="shadow-lg my-3 p-3 rounded d-flex align-items-center justify-content-center bg-light"
            style={{ minHeight: 500 }}
          >
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="my-4">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email" className="my-4">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password" className="my-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="my-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button
                type="submit"
                variant="primary"
                className="my-4"
                disabled={isLoading}
              >
                Update
              </Button>
              {isLoading && <Loading />}
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
