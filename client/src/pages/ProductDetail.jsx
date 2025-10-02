import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import {
  useGetProductReviewsQuery,
  useCreateReviewMutation,
} from "../slices/reviewsApiSlice";
import { addToCart } from "../slices/cartSlice";
import { hideUserName } from "../utils/helpers";
import Loading from "../components/Loading";
import Rating from "../components/Rating";
import Message from "../components/Message";
import { toast } from "react-toastify";
import { set } from "mongoose";

const ProductDetail = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [
    createReview,
    { isLoading: loadingReviewCreate, error: errorReviewCreate },
  ] = useCreateReviewMutation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id: productId } = useParams();
  const { data: reviews, isLoading: loadingReviews } =
    useGetProductReviewsQuery(productId);
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

  const handleCommentChange = async (e) => {
    setComment(e.target.value);
  };

  const commentSubmitHandler = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      alert("Please enter a comment");
      return;
    }
    if (!userInfo) {
      toast.warning("Please log in to submit a review");
      navigate("/login?redirect=/product/" + productId);
      return;
    }
    try {
      await createReview({
        productId,
        review: { comment, rating: rating },
      }).unwrap();
      toast.success("Review submitted successfully");
      setComment("");
      setRating(0);
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Container>
      <Row className="mb-3">
        <Link to="/" className="text-center text-md-start">
          <Button  variant="secondary">Go Back</Button>
        </Link>
      </Row>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row>
            <Col xs={10} md={5} className="mx-auto">
              <Image
                src={product.image}
                alt={product.name}
                fluid
                className="shadow-lg"
                rounded
              ></Image>
            </Col>
            <Col xs={10} md={4} className="mx-auto mt-1">
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
                    <strong>Description: </strong>
                    <i>{product.description}</i>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col xs={10} md={3} className="mx-auto mt-1">
              <Card className="shadow-sm">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Price:</strong>
                      </Col>
                      <Col>
                        <strong>{product.price}$</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Status:</strong>
                      </Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col style={{ display: "flex", alignItems: "center" }}>
                          <strong>Quantity:</strong>
                        </Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {" "}
                                  {x + 1}{" "}
                                </option>
                              )
                            )}
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
          <Row>
            <Col className="mt-5" md={6}>
              {loadingReviews ? (
                <Loading />
              ) : reviews?.length === 0 ? (
                <Message>No Reviews</Message>
              ) : (
                <>
                  <div
                    style={{
                      border: "1px solid #dee2e6",
                      borderRadius: "8px",
                      background: "white",
                      marginBottom: "50px",
                    }}
                  >
                    <Form.Control
                      as={"textarea"}
                      rows={3}
                      value={comment}
                      maxLength={500}
                      className="placeholder-secondary"
                      placeholder="Write your comment..."
                      type="text"
                      style={{
                        borderRadius: 8,
                        padding: "10px 12px",
                        resize: "none",
                        borderColor: "white",
                      }}
                      onChange={handleCommentChange}
                    />
                    <div className="d-flex justify-content-between p-1">
                      <Rating
                        value={rating}
                        text={`Rating: ${rating}`}
                        onChange={(newValue) => {
                          setRating(newValue);
                        }}
                      />{" "}
                      <Button
                        className="mt-0 mb-1 mx-2"
                        variant="primary"
                        onClick={commentSubmitHandler}
                      >
                        Comment
                      </Button>
                    </div>
                  </div>
                  {reviews?.reviews.length !== 0 ? <h3>User Reviews</h3> : null}
                  <ListGroup>
                    {reviews?.reviews.map((review, index) => (
                      <ListGroup.Item
                        key={index}
                        className="mb-2 rounded shadow-sm"
                      >
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            margin: "2px 0px",
                            gap: "10px",
                          }}
                        >
                          <strong>{hideUserName(review.user.name)}</strong>
                          <Rating value={review.rating} />
                        </p>
                        <p className="mb-2">{review.comment}</p>
                        <p className="text-muted mb-1 mt-0">
                          {review.createdAt.split("T")[0]}
                        </p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </>
              )}
            </Col>
          </Row>
        </>
      )}
      </Container>
    </motion.div>
  );
};

export default ProductDetail;
