import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetProductCategoriesQuery } from "../slices/productsApiSlice";
import { motion } from "framer-motion";
import ProductCarousel from "../components/ProductCarousel";
import Category from "../components/Category";
import Product from "../components/Product";

const Home = () => {
  const { data: categories } = useGetProductCategoriesQuery();
  
  const searchedProducts = useSelector(
    (state) => state.product?.searchedProducts
  );

  return (
    <div>
      {searchedProducts && searchedProducts.length !== 0 ? (
          <Row>
          {searchedProducts?.map((product, index) => {
            return (
              <Col className="col-custom" key={index}>
                <Product product={product} />
              </Col>
            );
          })}{" "}
        </Row>
      ) : (
        <motion.div initial={{ y: -200, opacity: 0 }}  
                    animate={{ y: 0, opacity: 1 }}     
                    transition={{ duration: 0.5, ease: "easeOut" }}>
          <Row>
            <ProductCarousel />
          </Row>
          {categories?.map((c, i) => {
            return (
              <Row className="mb-5" key={i}>
                <Category category={c} />
              </Row>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default Home;
