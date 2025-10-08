import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetProductCategoriesQuery } from "../../slices/productsApiSlice";

import HomePresenter from "./HomePresenter";
import './main.scss';

const Home = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const { data: categories } = useGetProductCategoriesQuery();

  const searchedProducts = useSelector(
    (state) => state.product?.searchedProducts
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const props = {
    isDesktop,
    categories,
    searchedProducts,
  };

  return (
    <HomePresenter {...props} />
  );
};

export default Home;
