import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import ProductCarousel from "../../components/Product/ProductCarousel";
import HomeCategory from "./HomeCategory";
import ProductCard from "../../components/Product/ProductCard";
import CustomContainer from "../../components/Common/CustomContainer";
import './Home.css';

const HomePresenter = ({ isDesktop, categories, searchedProducts }) => {
    const renderSearchedProducts = () => (
    <Row>
      {searchedProducts.map((product, index) => (
        <Col className="col-custom" key={index}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );

  const renderDefaultContent = () => (
    <motion.div
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {isDesktop ? (
        <CustomContainer>
          <Row>
            <ProductCarousel />
          </Row>
        </CustomContainer>
      ) : (
        <Row>
          <ProductCarousel />
        </Row>
      )}
      <CustomContainer>
        {categories?.map((c, i) => (
          <Row className="mb-5" key={i}>
            <HomeCategory category={c} />
          </Row>
        ))}
      </CustomContainer>
    </motion.div>
  );

  const hasSearchResults = Array.isArray(searchedProducts) && searchedProducts.length > 0;
  
  return (
    <div>
      {hasSearchResults ? (
        renderSearchedProducts()
      ) : (
        renderDefaultContent()
      )}
    </div>
  );
};

export default HomePresenter;
