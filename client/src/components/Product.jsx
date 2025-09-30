import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { useSelector } from "react-redux";
import Rating from "./Rating";

const Product = ({ product }) => {
  const { cartItems } = useSelector((state) => state.cart);
    const productExist = cartItems.find((item) => item._id === product._id);

  const dispatch = useDispatch();

  const addToCartHandler = async () => {
    const productExist = cartItems.find((item) => item._id === product._id);
    const currentQty = productExist ? productExist.qty : 0;
    if (product.countInStock && currentQty < product.countInStock) {
      dispatch(addToCart({ ...product, qty: currentQty + 1 }));
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify({ cartItems }));
  }, [cartItems]);

  return (
    <Card
      className="my-3 p-3 rounded shadow-lg"
      style={{ minWidth: 250, width: 250, minHeight: 420, cursor: "pointer" }}
    >
      <Link to={`/product/${product._id}`} target="_blank">
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
          <Link to={`/product/${product._id}`} target="_blank">
            <button className="btn btn-dark">Details</button>
          </Link>
          <button
            className="btn btn-dark"
            onClick={addToCartHandler}
            disabled={product.countInStock === 0 || productExist?.qty >= product.countInStock}
          >
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
