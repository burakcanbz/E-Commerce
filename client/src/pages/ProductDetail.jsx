import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";

export const ProductDetail = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [showMessage, setShowMessage] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    const updatedProduct = cartItems.find((item) => item._id === productId);
    setQty((prevQty) => {
      let count = updatedProduct?.qty + prevQty || prevQty;
      if (count <= product.countInStock) {
        dispatch(addToCart({ ...(updatedProduct ?? product), qty: count }));
        navigate("/");
      } else {
        count = prevQty;
        setShowMessage(true);
      }
      return count;
    });
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <>
      <Row className="mb-3">
        <Link to="/">
          <Button variant="secondary">Go Back</Button>
        </Link>
      </Row>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid className="shadow-lg" rounded></Image>
          </Col>
          <Col md={4}>
          <Card className="shadow-sm">
            <ListGroup variant="flush" className="rounded mx-3">
              <ListGroup.Item className="my-2 p-3 rounded">
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item className="my-2 p-3 rounded">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item className="my-2 p-3 rounded fs-5">
                <strong>Price: {product.price}$</strong>
              </ListGroup.Item>
              <ListGroup.Item className="my-2 p-3 rounded">
                <strong>Description: </strong><i>{product.description}</i>
              </ListGroup.Item>
            </ListGroup>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="shadow-sm">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col><strong>Price:</strong></Col>
                    <Col>
                      <strong>{product.price}$</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col><strong>Status:</strong></Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col><strong>Quantity:</strong></Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {" "}
                              {x + 1}{" "}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item className="text-center">
                  <Button
                    className="my-2"
                    variant="secondary"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            {showMessage && (
              <Message variant="danger">
                You reached maximum product count in stock
              </Message>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};
