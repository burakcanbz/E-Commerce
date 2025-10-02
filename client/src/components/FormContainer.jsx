import { Container, Row, Col, Card } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card
            className="p-4 shadow-lg rounded-4 mt-5"
            style={{
              maxWidth: 600,
              minHeight: 300,
              width: "100%",
              margin: "auto",
              background: "white",
            }}
          >
            {children}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
