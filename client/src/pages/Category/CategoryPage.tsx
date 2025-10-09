import { JSX } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useGetAllProductsByCategoryQuery } from "../../slices/productsApiSlice";
import { motion } from "framer-motion";

import { getQueryParams } from "../../utils/helpers.ts";
import { Product } from "../../types/redux.ts";
import CustomContainer from "../../components/Common/CustomContainer";
import ProductCard from "../../components/Product/ProductCard.tsx";
import Loading from "../../components/Common/Loading";
import Message from "../../components/Common/Message";
import './main.scss';

const CategoryPage = (): JSX.Element => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { category } = getQueryParams(queryParams);

  const { data: products, isLoading, isError }: { data?: Product[]; isLoading: boolean; isError?: any; } = useGetAllProductsByCategoryQuery(category);

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Message variant="danger">{(isError.error || isError.message || isError.data)}</Message>
  ) : (
    <motion.div
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="category-page"
    >
      <div className="category-div">
        <h2
          className="fw-bold"
        >
          {category}
        </h2>
      </div>
      <CustomContainer>
        <Row>
          {products &&
            products.map((product: Product, index: number): JSX.Element => {
              return (
                <Col className="col-custom" key={index}>
                  <ProductCard product={product} />
                </Col>
              );
            })}
        </Row>
      </CustomContainer>
    </motion.div>
  );
};

export default CategoryPage;
