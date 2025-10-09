import { useEffect, JSX } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Row, Col, Button, Alert } from "react-bootstrap";
import { motion } from "framer-motion";

import { convertToUTC } from "../../utils/helpers";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import UserInformation from "./UserInformation";
import CustomContainer from "../../components/Common/CustomContainer";
import StatusIcon from "../../components/Common/StatusIcon";
import Loading from "../../components/Common/Loading";
import Message from "../../components/Common/Message";
import './main.scss';
import { OrderItem } from "../../types/redux";

const Profile = (): JSX.Element => {
  const navigate = useNavigate();
  const { data: orders, isLoading, error, refetch }: { data?: OrderItem[]; isLoading: boolean; error?: any; refetch: () => void; } = useGetOrdersQuery();

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
        <Row className="profile-row">
          {orders && orders.length >= 1 ? (
            <Col sm={12} lg={8} className="mx-sm-auto my-4">
              <Alert
                className="profile-alert"
                variant="dark"
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
                  {orders?.map((item: OrderItem) => {
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