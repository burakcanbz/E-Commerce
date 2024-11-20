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
import UserInformation from "../components/UserInformation";

const Profile = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrdersQuery(undefined, {
    select: (data) => data.orders,
  });

  return isLoading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Row>
        {orders.length >= 1 ? (
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
        <UserInformation />
        <Form>
        {/* <div key='dark' className="mb-3"> */}

          <Form.Check // prettier-ignore
            type="checkbox"
            id="dark"
            label="dark mode"
          />
          {/* </div> */}
        </Form>
      </Row>
    </>
  );
};

export default Profile;
