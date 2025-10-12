import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import './main.scss';

import type { JSX } from "react";
import type { RootState, CartItem } from "../../types/redux";


const CardCheckoutBanner = (): JSX.Element => {
  const navigate: ReturnType<typeof useNavigate> = useNavigate();
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.cartItems);
  const handleClick = () => {
    navigate("/shipping");
  };

  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-light py-1 fixed-bottom shadow-lg"
      onClick={handleClick}
    >
      <Row
        className=" mx-2 g-0"
        style={{ border: "1px solid #ff7300", borderRadius: "5px" }}
      >
        <Col
          xs={5}
          className="d-flex flex-column align-items-center py-1 justify-content-center text-dark"
          style={{ background: "white", borderRadius: "5px" }}
        >
          <div className="py-2 text-center">
            <div className="lh-1 text-black" style={{ fontWeight: "bold" }}>
              <small>
                {cartItems
                  ?.reduce(
                    (acc, item) => acc + Number(item.price) * Number(item.qty),
                    0
                  )
                  .toFixed(2)}
                $
              </small>
            </div>
            <div
              className="small lh-1"
              style={{ fontWeight: "bold", color: "#1bd20bff" }}
            >
              <small>
                {Number(cartItems.reduce(
                    (acc, item) => acc + Number(item.price) * Number(item.qty),
                    0
                  )
                  .toFixed(2)) > 100
                  ? "Shipping Free"
                  : "Shipping 10$"}
              </small>
            </div>
          </div>
        </Col>
        <Col xs={7} className="d-flex text-center">
          <button className="btn-cart w-100">Confirm Cart</button>
        </Col>
      </Row>
    </motion.div>
  );
};

export default CardCheckoutBanner;
