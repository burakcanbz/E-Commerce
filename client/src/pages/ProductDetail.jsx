import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { addToCart } from '../slices/cartSlice';

export const ProductDetail = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);
  
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }))
    navigate('/')
  }

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
            <Image src={product.image} alt={product.name} fluid></Image>
          </Col>
          <Col md={4}>
            <ListGroup variant="flush" className='rounded mx-3'>
              <ListGroup.Item className="my-2 p-3">
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item className="my-2 p-3">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item className="my-2 p-3">
                <strong>Price: {product.price}$</strong>
              </ListGroup.Item>
              <ListGroup.Item className="my-2 p-3">
                Description: {product.description}$
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card className="shadow-sm">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>
                      <strong>{product.price}$</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && ( <ListGroup.Item>
                  <Row>
                    <Col>Qty: </Col>
                    <Col>
                      <Form.Control
                      as='select'
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}>
                        {[...Array(product.countInStock).keys()].map(x => <option key={x + 1} value={x + 1}> {x + 1} </option>)}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>) }

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
          </Col>
        </Row>
      )}
    </>
  );
};
