import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { motion } from 'framer-motion';
import Loading from '../components/Loading';
import Message from '../components/Message';
import Product from '../components/Product';

const Casual = () => {
    const { data: allProducts, isLoading, isError } = useGetProductsQuery();
    const products = allProducts?.filter((p) => p.category === "Casual");
  
    return isLoading ? (
      <Loading />
    ) : isError ? (
      <Message variant="danger">{isError}</Message>
    ) : (
      <motion.div
      initial={{ y: -200, opacity: 0 }}  
      animate={{ y: 0, opacity: 1 }}     
      transition={{ duration: 0.5, ease: "easeOut" }}>
        <Row>
          {products &&
            products.map((product, index) => {
              return (
                <Col className='col-custom' key={index}>
                  <Product product={product} />
                </Col>
              );
            })}
        </Row>
      </motion.div>
    );
}

export default Casual;