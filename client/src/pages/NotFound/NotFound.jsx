import { Row, Col, Image } from "react-bootstrap";
import notFound from "../../assets/404.png";

const NotFound = () => {
  return (
    <Row>
      <Col md={10} sx={12} className="mx-auto text-center">
        <Image
          src={notFound}
          alt="404 Not Found"
          fluid
          className="my-5"
          style={{ borderRadius: "20px", height: "70vh", width: "80vw" }}
        />
      </Col>
    </Row>
  );
};

export default NotFound;
