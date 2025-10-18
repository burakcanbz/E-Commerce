import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import { useGetCategorizedProductsQuery } from "../../slices/productsApiSlice";
import { IoIosArrowForward } from "react-icons/io";
import { LIMIT, PAGE } from "../../constants/constants";
import ProductCard from "../../components/Product/ProductCard.tsx";
import Loading from "../../components/Common/Loading";
import Message from "../../components/Common/Message";

// @ts-expect-error TS doesn't have types for Swiper CSS
import "swiper/css";
// @ts-expect-error TS doesn't have types for Swiper CSS
import "swiper/css/navigation";
// @ts-expect-error TS doesn't have types for Swiper CSS
import "swiper/css/pagination";


import type { Product } from "../../types/redux.ts";

const HomeCategory = ({ category }: { category: string }) => {
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    error,
  }: { data?: any; isLoading: boolean; error?: any } =
    useGetCategorizedProductsQuery({
      category,
      page: PAGE,
      limit: LIMIT,
    });
  const products = data?.products;

  return isLoading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <p
      className="category-header"
       onClick={(e) => {
            e.preventDefault();
            navigate(`/category?category=${category.toLowerCase()}`);
          }}
        >
          See All&nbsp;
          <IoIosArrowForward style={{ marginTop: "-2px" }} size={20}/>
        </p>
      <Swiper
        className="swiper-container"
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1.5}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: ((Math.random() * 5) + 1) * 1000 , disableOnInteraction: false, pauseOnMouseEnter: true }}
        breakpoints={{
          344: { slidesPerView: 1.7 },
          365: { slidesPerView: 1.9 },
          390: { slidesPerView: 1.9 },
          425: { slidesPerView: 2.2 },
          480: { slidesPerView: 2.5 },
          550: { slidesPerView: 2.8 },
          650: { slidesPerView: 3.4 },
          767: { slidesPerView: 3.8 },
          991: { slidesPerView: 4.4},
          1024: { slidesPerView: 4.8 },
          1200: { slidesPerView: 6 },
          1400: { slidesPerView: 7 },
        }}
      >
        {products?.map((product: Product, index: number) => {
          return (
            <SwiperSlide key={index}>
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <ProductCard product={product} />
              </Col>
            </SwiperSlide>
          );
        })}
      </Swiper>{" "}
    </>
  );
};

export default HomeCategory;