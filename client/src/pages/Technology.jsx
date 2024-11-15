import React from "react";
import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Product from "../components/Product";
import Loading from "../components/Loading";
import Message from "../components/Message";

const Technology = () => {
  
  const { data: allProducts, isLoading, isError } = useGetProductsQuery();
  const products = allProducts?.filter((p) => p.category === "Electronics");

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Message variant="danger">{isError}</Message>
  ) : (
    <>
      <Row>
        {products &&
          products.map((product, index) => {
            return (
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <Product product={product} />
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default Technology;
