import {
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { hideUserName } from "../../utils/helpers";
import CustomContainer from "../../components/Common/CustomContainer";
import Rating from "../../components/Common/Rating";
import Message from "../../components/Common/Message";
import Loading from "../../components/Common/Loading";
import './Product.css';

const ProductDetailPresenter = ({
  product,
  qty,
  setQty,
  addToCartHandler,
  reviews,
  loadingReviews,
  userInfo,
  rating,
  setRating,
  comment,
  handleCommentChange,
  commentSubmitHandler,
  loadingReviewCreate,
  errorReviewCreate,
  productLoading,
  productLoadingError,
  showMessage,
}) => (
  <motion.div
    initial={{ x: -200, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <CustomContainer>
      <Row className="mb-3">
        <Link to="/" className="text-center text-md-start">
          <Button variant="secondary">Go Back</Button>
        </Link>
      </Row>
      {productLoading ? (
        <Loading />
      ) : productLoadingError ? (
        <Message variant="danger">
          {productLoadingError?.data?.message || productLoadingError.error}
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
                  <div className="reviews">
                    <Form.Control
                      as={"textarea"}
                      rows={3}
                      value={comment}
                      maxLength={500}
                      className="text-area placeholder-secondary"
                      placeholder="Write your comment..."
                      type="text"
                      onChange={handleCommentChange}
                    />
                    <div className="d-flex justify-content-between align-items-center p-1">
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
                        className="review-item mb-2 rounded shadow-sm"
                      >
                        <p
                        className="list-group-item-text"
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
    </CustomContainer>
  </motion.div>
);

export default ProductDetailPresenter;
