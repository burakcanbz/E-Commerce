import { Carousel, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useGetTopRatedProductsQuery } from "../../slices/productsApiSlice";
import Loading from "../Common/Loading";
import Message from "../Common/Message";
import './main.scss';

import type { JSX } from "react";
import type { Product } from "../../types/redux.ts";

const ProductCarousel = (): JSX.Element => {
  const { data: products, isLoading, error }: { data?: Product[]; isLoading: boolean; error?: any } = useGetTopRatedProductsQuery(undefined);
  return (
    <Row className="mx-auto">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error?.data || error?.message || error?.error}</Message>
      ) : (
        <div>
          <Carousel
            hover="pause"
            className="bg-dark mb-5 shadow-lg rounded"
            style={{ position: "relative" }}
            {...({} as any)} 
          >
            {products?.map((item) => {
              return (
                <Carousel.Item key={item._id}>
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      overflow: "hidden",
                      width: "75px",
                      height: "75px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "-25px",
                        width: "100px",
                        textAlign: "center",
                        backgroundColor: "#dc3545",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.85rem",
                        transform: "rotate(-45deg)",
                        padding: "5px 0",
                      }}
                    >
                      Popular
                    </div>
                  </div>
                  <Link to={`/product/${item._id}`} target="_blank">
                    <div className="d-flex justify-content-center">
                      <Image src={item.image} alt={item.name} fluid />
                    </div>
                    <Carousel.Caption className="d-none d-md-block caption p-2 text-white">
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