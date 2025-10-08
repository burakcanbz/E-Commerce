import { JSX } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

const StatusIcon = ({ isActive }: { isActive: boolean }): JSX.Element => {
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