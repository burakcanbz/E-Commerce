import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Product from "../components/Product";
import Loading from "../components/Loading";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import { FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    adaptiveHeight: true,
  };

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
          <Row>
            <ProductCarousel />
          </Row>
          <Row className="mb-5">
            <Link to="/technology" style={{ textDecoration: 'none', color: 'black'}}>
              <h4>Technology&nbsp;&nbsp;<FaArrowRight /></h4> 
            </Link>
            <Slider {...settings}>
              {products.map((product, index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    key={index}
                  >
                    <Col sm={12} md={6} lg={4} xl={3} key={index}>
                      <Product product={product} />
                    </Col>
                  </div>
                );
              })}
            </Slider>
          </Row>
        </>
      )}
    </div>
  );
};

export default Home;
