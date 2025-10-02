import { Container, Row, Col } from "react-bootstrap";
import PaymentForm from "../components/PaymentForm";
import BuyerInfo from "../components/BuyerInformation";
import { FaLock } from "react-icons/fa";

const OrderPayment = () => {
  return (
    <div
      style={{
        backgroundColor: "#fdfdfd",
        minHeight: "100vh",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div className="text-center mb-5">
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: 500,
                  color: "#2c2f33",
                  marginBottom: "10px",
                }}
              >
                <FaLock style={{ marginRight: "10px", color: "#6c757d" }} />
                Card Information
              </h1>
              <p style={{ color: "#6c757d", fontSize: "0.95rem" }}>
                Complete your order safely and quickly
              </p>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <PaymentForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderPayment;
