import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { useSelector } from "react-redux";
import Rating from "./Rating";

const Product = ({ product }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const [qty, setQty] = useState(0);

  const addToCartHandler = async () => {
    const productExist = cartItems.find((item) => item._id === product._id);
    if (product.countInStock && qty < product.countInStock) {
      setQty((prevQty) => {
        let updatedQty = null;
        if (!productExist) {
          updatedQty = 1;
        } else {
          updatedQty = prevQty + 1;
        }
        dispatch(addToCart({ ...product, qty: updatedQty }));
        return updatedQty;
      });
    } else if (qty >= product.countInStock) {
      if (cartItems.length === 0) {
        dispatch(addToCart({ ...product, qty: 1 }));
        setQty(1);
      }
    }
  };

  return (
    <Card
      className="my-3 p-3 rounded shadow-lg"
      style={{ minWidth: 300, minHeight: 350 }}
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
            <button className="btn btn-dark">Details...</button>
          </Link>
          <button
            className="btn btn-dark"
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
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
