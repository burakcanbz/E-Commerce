import { IoCloseSharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

const StatusIcon = ({ isActive }) => {
  return (
    isActive ? 
    (
        <TiTick color="green" fontSize="24px" />
      ) : (
        <IoCloseSharp color="red" fontSize="24px" />
      )
  )
}

export default StatusIcon