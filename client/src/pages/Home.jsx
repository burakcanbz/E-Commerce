import React from 'react'
import { Row, Col } from 'react-bootstrap';
import products from '../products'
import Product from '../components/Product';

const HomeScreen = () => {
  return (
    <div>
        <h2> Latest Products</h2>
        <Row>
            {
                products.map((product, index) => {
                    return (
                    <Col sm={12} md={6} lg={4} xl={3} key={index}>
                        <Product product={product}/>
                    </Col>)
                })
            }
        </Row>
    </div>
  )
}

export default HomeScreen