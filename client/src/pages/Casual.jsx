import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
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
      <>
        <Row>
          {products &&
            products.map((product, index) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={index}>
                  <Product product={product} />
                </Col>
              );
            })}
        </Row>
      </>
    );
}

export default Casual;