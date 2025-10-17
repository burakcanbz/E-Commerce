import type { JSX } from "react";
import { FcSalesPerformance } from "react-icons/fc";
import { FcPhoneAndroid } from "react-icons/fc";
import { FcCustomerSupport } from "react-icons/fc";
import { FcReading } from "react-icons/fc";
import { MdNetworkCheck } from "react-icons/md";
import { FcHome } from "react-icons/fc";
import { GiClothes } from "react-icons/gi";
import { FcUnlock } from "react-icons/fc";
import { FcVoicemail } from "react-icons/fc";
import { FaPaintbrush } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";
import { FcPlanner } from "react-icons/fc";

interface Category {
    name: string;
    icon: JSX.Element;
} 

const categories: Category[] = [
  { name: "Food", icon: <IoFastFoodOutline size={54} color="orange" /> },
  { name: "Electronics", icon: <FcPhoneAndroid size={54} /> },
  { name: "Customer Support", icon: <FcCustomerSupport size={54} /> },
  { name: "Books", icon: <FcReading size={54} /> },
  {
    name: "Network & Computer",
    icon: <MdNetworkCheck size={54} color="blue" />,
  },
  { name: "Home & Living", icon: <FcHome size={54} /> },
  { name: "Fashion", icon: <GiClothes size={54} /> },
  { name: "Discover Privileges", icon: <FcUnlock size={54} /> },
  { name: "Support Campaign", icon: <FcVoicemail size={54} /> },
  { name: "Artworks", icon: <FaPaintbrush size={54} color="gray" /> },
  { name: "Good Price Products", icon: <FcSalesPerformance size={54} /> },
  { name: "Take It!", icon: <FcPlanner size={54} /> },
];

export default categories;