import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container fluid>
        <Row className="bg-secondary text-white">
          <Col className="d-flex align-items-center justify-content-center">
          <div>
            <p className="my-3">BcShop &copy; {currentYear}</p>
          </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
