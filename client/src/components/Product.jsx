import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import Rating from "./Rating";

const Product = ({ product }) => {

  const dispatch = useDispatch();

  const [qty, setQty] = useState(0);

  const addToCartHandler = async () => {
  if (product.countInStock && qty < product.countInStock) {
    setQty((prevQty) => {
      const updatedQty = prevQty + 1; 
      dispatch(addToCart({ ...product, qty: updatedQty })); 
      return updatedQty;
    });
  }
};

  return (
    <Card className="my-3 p-3 rounded shadow-lg" style={{minWidth: 250, minHeight: 300}}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link
          to={`/product/${product._id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Card.Title
            as="div"
            style={{
              height: "2.5em",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text className="d-flex justify-content-between align-items-center">
          <Link to={`/product/${product._id}`}>
            <button class="btn btn-dark">Details...</button>
          </Link>
          <button className="btn btn-dark" onClick={addToCartHandler} disabled={product.countInStock === 0}>
            Add to <FaCartShopping />
          </button>
        </Card.Text>
        <Card.Text>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text
          as="h3"
          className="d-flex justify-content-center align-items-center"
        >
          {product.price}${" "}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
