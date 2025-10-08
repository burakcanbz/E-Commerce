import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import { useGetCategorizedProductsQuery } from "../../slices/productsApiSlice";
import { slickSettings } from "../../utils/helpers";
import { FaArrowRight } from "react-icons/fa";
import { LIMIT, PAGE } from "../../constants/constants";
import ProductCard from "../../components/Product/ProductCard.tsx";
import Loading from "../../components/Common/Loading";
import Message from "../../components/Common/Message";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeCategory = ({ category }) => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCategorizedProductsQuery({
    category,
    page: PAGE,
    limit: LIMIT,
  });
  const products = data?.products;
  const changedSlickSettings = {
    ...slickSettings,
    slidesToScroll: category === 'Electronics' ? 1 : 2,
  };

  return isLoading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <span>
        <button className="btn btn-secondary mb-3" onClick={(e ) => {e.preventDefault(); navigate(`/category?category=${category.toLowerCase()}`)}}>
          {category}&nbsp;&nbsp;
          <FaArrowRight />
        </button>
        </span>
      <Slider {...changedSlickSettings}>
        {products?.map((product, index) => {
          return (
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <ProductCard product={product} />
              </Col>
            );
          })}
      </Slider>
    </>
  );
};

export default HomeCategory;
