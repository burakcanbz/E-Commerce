import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { FaCartShopping } from "react-icons/fa6";

import { addToCart } from "../../slices/cartSlice.ts";
import { RootState, CartItem, Product } from "../../types/redux.ts";
import Rating from "../Common/Rating";

type ProductCardProps =
  | { product: CartItem; searchedProduct?: never }
  | { searchedProduct: Product; product?: never };

const ProductCard = React.memo(({ product, searchedProduct }: ProductCardProps) => {
  const p = product || searchedProduct;
  const { cartItems, shippingAddress, paymentMethod } = useSelector((state: RootState) => state.cart);
  const productExist = cartItems?.find((item) => item._id === p._id);

  const dispatch = useDispatch();

  const addToCartHandler = async () => {
    const productExist = cartItems.find((item) => item._id === p._id);
    const currentQty = productExist ? productExist.qty : 0;
    if (p.countInStock && currentQty < p.countInStock) {
      dispatch(addToCart({ ...p, qty: currentQty + 1 }));
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify({ cartItems, shippingAddress, paymentMethod }));
  }, [cartItems, shippingAddress, paymentMethod]);

  return (
    <Card
      className="my-3 p-2 rounded shadow-lg"
      style={{
        minWidth: 180,
        maxWidth: 180,
        maxHeight: 350,
        cursor: "pointer",
      }}
    >
      <Link to={`/product/${p._id}`} target="_blank">
        <Card.Img
          src={p.image}
          variant="top"
          style={{ height: "150px", objectFit: "cover" }}
        />
      </Link>
      <Card.Title
        as="div"
        className="mt-3 ms-1"
        style={{
          textAlign: "left",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          fontSize: ".9em",
        }}
      >
        <strong>{p.name}</strong>
      </Card.Title>
      <Card.Body style={{ marginTop: -25, marginLeft: -14, marginRight: -14 }}>
        <Link
          to={`/product/${p._id}`}
          style={{ textDecoration: "none", color: "black" }}
        ></Link>
        <Card.Text className="d-flex justify-content-between align-items-center" style={{ marginTop: 11}}>
          <Link to={`/product/${p._id}`} target="_blank">
            <button className="btn btn-sm btn-dark" >Details</button>
          </Link>
          <button
            className="btn btn-sm btn-dark"
            onClick={addToCartHandler}
            disabled={
              p.countInStock === 0 ||
              (productExist?.qty !== undefined && productExist?.qty >= p.countInStock)
            }
          >
            Add to <FaCartShopping />
          </button>
        </Card.Text>
        <Card.Text>
          <Rating
            value={p.rating}
            text={`${p.numReviews} reviews`}
            onChange={() => {}}
          />
        </Card.Text>
        <Card.Text
          as="h5"
          className="d-flex justify-content-center align-items-center"
          style={{ fontWeight: "bold", marginTop: -5, marginBottom: -15 }}
        >
          {p.price}${" "}
        </Card.Text>
      </Card.Body>
    </Card>
  );
});

export default ProductCard;