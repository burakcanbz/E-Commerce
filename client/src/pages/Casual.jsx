import React from "react";
import { Col, Row } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { motion } from "framer-motion";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Product from "../components/Product";
import CustomContainer from "../components/CustomContainer";

const Casual = () => {
  const { data: allProducts, isLoading, isError } = useGetProductsQuery();
  const products = allProducts?.filter((p) => p.category === "Casual");

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Message variant="danger">{isError}</Message>
  ) : (
    <motion.div
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="d-flex justify-content-center align-items-center">
        <h2
          className="fw-bold"
          style={{
            background: "linear-gradient(90deg, #797c82ff, #4f6aacff", // turuncu → mavi
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          }}
        >
          Casual
        </h2>
      </div>
      <CustomContainer>
        <Row>
          {products &&
            products.map((product, index) => {
              return (
                <Col className="col-custom" key={index}>
                  <Product product={product} />
                </Col>
              );
            })}
        </Row>
      </CustomContainer>
    </motion.div>
  );
};

export default Casual;
