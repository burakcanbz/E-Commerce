import { Carousel, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useGetTopRatedProductsQuery } from "../slices/productsApiSlice";
import Loading from "./Loading";
import Message from "./Message";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopRatedProductsQuery();
  console.log(error);
  return (
    <Row className="mx-auto">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error.error}</Message>
      ) : (
        <div>
        <Carousel hover="pause" className="bg-dark mb-5 shadow-lg rounded">
          {products?.map((item) => {
            return (
              <Carousel.Item key={item._id}>
                <Link to={`/product/${item._id}`}>
                  <div className="d-flex justify-content-center">
                    <Image src={item.image} alt={item.name} fluid />
                  </div>
                  <Carousel.Caption className="caption p-4 text-white">
                    <div>
                      <h5>{item.name}</h5>
                      <p>
                        <strong>{item.price} $</strong>
                      </p>
                    </div>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            );
          })}
        </Carousel>
        </div>
      )}
    </Row>
  );
};

export default ProductCarousel;