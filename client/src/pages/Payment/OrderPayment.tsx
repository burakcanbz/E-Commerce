import { JSX } from "react";
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";

import CustomContainer from "../../components/Common/CustomContainer";
import PaymentForm from "./PaymentForm";

const OrderPayment = (): JSX.Element => {

  return (
    <motion.div
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        backgroundColor: "#fdfdfd",
        minHeight: "80dvh",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <CustomContainer>
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
        <div className="d-flex justify-content-center">
        <Row>
          <Col xs={12} md={12} lg={12}>
            <PaymentForm />
          </Col>
        </Row>
        </div>
        <Row className="d-flex justify-content-center text-muted" style={{ marginTop: "100px" }}>
          We are here to help! If you have any questions or need assistance,
          please contact our customer support team at{" "}
          <p className="text-center mt-2">
          <a href="mailto:burak.canbaz.web@gmail.com">burak.canbaz.web@gmail.com</a>
          </p>
        </Row>
      </CustomContainer>
    </motion.div>
  );
};

export default OrderPayment;