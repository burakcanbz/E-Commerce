import { useNavigate } from "react-router-dom";
import { Table, Row, Col, Button, Alert } from "react-bootstrap";
import { useGetOrdersQuery } from "../slices/ordersApiSlice";
import { convertToUTC } from "../utils/helpers";
import { motion } from "framer-motion";
import Loading from "../components/Loading";
import Message from "../components/Message";
import StatusIcon from "../components/StatusIcon";
import UserInformation from "../components/UserInformation";
import { useEffect } from "react";
import CustomContainer from "../components/CustomContainer";

const Profile = () => {
  const navigate = useNavigate();
  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useGetOrdersQuery(undefined, {
    select: (data) => data.orders,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return isLoading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <motion.div
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <CustomContainer>
        <Row>
          {orders?.length >= 1 ? (
            <Col sm={12} lg={8} className="mx-sm-auto my-4">
              <Alert
                className="text-center text-white d-flex align-items-center justify-content-center"
                variant="dark"
                style={{
                  background: "linear-gradient(to right, #666970ff, #393d47)",
                  height: "80px",
                }}
              >
                {" "}
                <h2 className="fw-bold">Orders Status</h2>
              </Alert>
              <Table responsive="xl" variant="dark" striped bordered hover>
                <thead>
                  <tr>
                    <th className="text-center align-middle">#</th>
                    <th className="text-center">Payment Method</th>
                    <th className="text-center">Paid Status</th>
                    <th className="text-center">Paid Time</th>
                    <th className="text-center">Total Price</th>
                    <th className="text-center">Order Status</th>
                    <th className="text-center">Order Page</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td className="text-center">{item._id}</td>
                        <td className="text-center">{item.paymentMethod}</td>
                        <td className="text-center">
                          {<StatusIcon isActive={item.isPaid} />}
                        </td>
                        <td className="text-center">
                          {item.status === "Cancelled" ? (
                            <StatusIcon isActive={false} />
                          ) : (
                            convertToUTC(item.paidAt)
                          )}
                        </td>
                        <td className="text-center ">{item.totalPrice} $</td>
                        <td className="text-center">{item.status}</td>
                        <td className="text-center">
                          <Button
                            variant="warning"
                            size="sm"
                            disabled={item.status === "Cancelled"}
                            onClick={() => {
                              navigate(`/order/${item._id}`);
                            }}
                          >
                            Details
                          </Button>
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
        </Row>
      </CustomContainer>
    </motion.div>
  );
};

export default Profile;
