import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { useSelector } from "react-redux";
import Rating from "../Common/Rating";

const ProductCard = ({ product }) => {
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
      className="my-3 p-2 rounded shadow-lg"
      style={{
        minWidth: 180,
        maxWidth: 180,
        maxHeight: 350,
        cursor: "pointer",
      }}
    >
      <Link to={`/product/${product._id}`} target="_blank">
        <Card.Img
          src={product.image}
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
        <strong>{product.name}</strong>
      </Card.Title>
      <Card.Body style={{ marginTop: -25, marginLeft: -14, marginRight: -14 }}>
        <Link
          to={`/product/${product._id}`}
          style={{ textDecoration: "none", color: "black" }}
        ></Link>
        <Card.Text className="d-flex justify-content-between align-items-center" style={{ marginTop: 11}}>
          <Link to={`/product/${product._id}`} target="_blank">
            <button className="btn btn-sm btn-dark" >Details</button>
          </Link>
          <button
            className="btn btn-sm btn-dark"
            onClick={addToCartHandler}
            disabled={
              product.countInStock === 0 ||
              productExist?.qty >= product.countInStock
            }
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
          as="h5"
          className="d-flex justify-content-center align-items-center"
          style={{ fontWeight: "bold", marginTop: -5, marginBottom: -15 }}
        >
          {product.price}${" "}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
