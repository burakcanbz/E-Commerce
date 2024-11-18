import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';

const FormContainer = ({ children }) => {
    
    return(
    <Container>
        <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
            <Card style={{backgroundColor: "rgba(230, 230, 230)"}} className="p-5">
                { children }
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer;