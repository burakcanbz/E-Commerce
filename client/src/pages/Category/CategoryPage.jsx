import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useGetAllProductsByCategoryQuery } from "../../slices/productsApiSlice";
import { motion } from "framer-motion";

import Loading from "../../components/Common/Loading";
import Message from "../../components/Common/Message";
import ProductCard from "../../components/Product/ProductCard";
import CustomContainer from "../../components/Common/CustomContainer";
import './main.scss';

const CategoryPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category")[0].toUpperCase() + queryParams.get("category").slice(1);
  const { data: products, isLoading, isError } = useGetAllProductsByCategoryQuery(category);

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Message variant="danger">{isError}</Message>
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
            products.map((product, index) => {
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
