import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loading from "../components/Loading";
import Message from "../components/Message";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div>
          {
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          }
        </div>
      ) : (
        <>
          <h2> Latest Products</h2>
          <Row>
            {products.map((product, index) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={index}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </div>
  );
};

export default Home;
