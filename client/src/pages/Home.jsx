import React from "react";
import { Row, Col } from "react-bootstrap";
import { useGetProductCategoriesQuery } from "../slices/productsApiSlice";
import Product from "../components/Product";
import Loading from "../components/Loading";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import { useSelector } from "react-redux";
import Category from "../components/Category";

const Home = () => {
  const { data: categories } = useGetProductCategoriesQuery();

  const searchedProducts = useSelector(
    (state) => state.product?.searchedProducts
  );

  return (
    <div>
      {searchedProducts && searchedProducts.length !== 0 ? (
        <Row>
          {searchedProducts.map((product, index) => {
            return (
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <Product product={product} />
              </Col>
            );
          })}{" "}
        </Row>
      ) : (
        <>
          <Row>
            <ProductCarousel />
          </Row>
          {categories?.map((c) => {
            return (
              <Row className="mb-5">
                <Category category={c} />
              </Row>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Home;
