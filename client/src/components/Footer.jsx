import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container fluid>
        <Row className="footer text-white">
          <Col className="d-flex align-items-center justify-content-start">
          <Container>
          <div>
            <p className="my-3 p-3">Copyright &copy; Buyzy {currentYear}</p>
          </div>
          </Container>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
