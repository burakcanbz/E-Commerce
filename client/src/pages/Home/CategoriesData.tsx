import type { JSX } from "react";
import { FcSalesPerformance } from "react-icons/fc";
import { FaMobileButton } from "react-icons/fa6";
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
  { name: "Tech", icon: <FaMobileButton size={48} /> },
  { name: "Customer Support", icon: <FcCustomerSupport size={54} /> },
  { name: "Books", icon: <FcReading size={54} /> },
  {
    name: "Network",
    icon: <MdNetworkCheck size={54} color="blue" />,
  },
  { name: "Home", icon: <FcHome size={54} /> },
  { name: "Fashion", icon: <GiClothes size={54} /> },
  { name: "Discover", icon: <FcUnlock size={54} /> },
  { name: "Support", icon: <FcVoicemail size={54} /> },
  { name: "Art", icon: <FaPaintbrush size={54} color="gray" /> },
  { name: "Discount Products", icon: <FcSalesPerformance size={54} /> },
  { name: "Take It!", icon: <FcPlanner size={54} /> },
];

export default categories;