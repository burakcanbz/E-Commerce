import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { slickSettings } from "../utils/helpers";
import Product from "./Product";
import { useGetCategorizedProductsQuery } from "../slices/productsApiSlice";
import { LIMIT, PAGE } from "../constants";
import Loading from "./Loading";
import Message from "./Message";

const Category = ({ category }) => {
  const { data, isLoading, error } = useGetCategorizedProductsQuery({
    category,
    page: PAGE,
    limit: LIMIT,
  });
  const products = data?.products;
  
  const changedSlickSettings = {
    ...slickSettings,
    slidesToScroll: category === 'Electronics' ? 1 : 4,
  };

  return isLoading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Link
        to={`/${category.toLowerCase()}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <h4>
          {category}&nbsp;&nbsp;
          <FaArrowRight />
        </h4>
      </Link>
      <Slider {...changedSlickSettings}>
        {products?.map((product, index) => {
          return (
            <div
            className="d-flex justify-content-between align-items-center"
              key={index}
            >
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <Product product={product} />
              </Col>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default Category;
