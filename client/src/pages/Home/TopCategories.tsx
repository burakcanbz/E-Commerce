import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import categoriesData from "./CategoriesData.tsx"; 

const TopCategories: React.FC = () => {
  return (
    <Container
      className="d-flex justify-content-center my-3 mx-2"
      style={{ overflowX: "auto" }}
    >
      <Row
        style={{
          display: "flex",
          minWidth: "max-content",
        }}
      >
        {categoriesData.map((category, idx) => (
          <Col
            key={idx}
            xs="auto"
            className="d-flex flex-column align-items-center"
            style={{ marginRight: 16 }}
          >
            <div className="top-categories-icon">{category.icon}</div>
            <div className="top-categories-name">{category.name}</div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TopCategories;
