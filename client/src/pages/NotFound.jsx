import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'

const NotFound = () => {
  return (
    <Container>
        <Row>
            <Col md={12} >
                <Message  variant='secondary'> <h2>The Page you looking for is not available right now!</h2></Message>
            </Col>
        </Row>
    </Container>
)
}

export default NotFound