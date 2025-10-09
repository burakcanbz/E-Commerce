import { useState, useEffect, JSX } from "react";
import { useSelector } from "react-redux";

import { useGetProductCategoriesQuery } from "../../slices/productsApiSlice";
import { HomePropsType } from "../../types/components";
import { RootState } from "../../types/redux";
import HomePresenter from "./HomePresenter";
import './main.scss';

const Home = (): JSX.Element => {
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 768);
  const { data: categories } = useGetProductCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { searchedProducts } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const props: HomePropsType = {
    isDesktop,
    categories,
    searchedProducts,
  };

  return (
    <HomePresenter {...props} />
  );
};

export default Home;
