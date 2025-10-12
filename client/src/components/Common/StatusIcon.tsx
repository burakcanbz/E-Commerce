import { IoCloseSharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

import type { JSX } from "react";

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