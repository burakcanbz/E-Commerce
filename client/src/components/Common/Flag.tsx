import FlagPortal from "./FlagPortal.tsx";
import rightFlag from "../../assets/flag-right.jpg";
import leftFlag from "../../assets/flag-left.jpg";

import type { JSX } from "react";
import type { FlagProps } from "../../types/components";

const Flag = ({ side }: FlagProps): JSX.Element => {
  const bg = side === "left" ? leftFlag : rightFlag;

  const handleClose = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    const parent = e.currentTarget.parentElement;
    if (parent) {
      parent.style.display = "none";
    }
  }

  return (
    <FlagPortal id="flag-root" render={() => (
      <div
        className={`flag ${side}-flag relative`}
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={(e) => {
          e.preventDefault();
          window.open(
            `${
              side === "right"
                ? "https://www.apple.com/tr/iphone-16/specs/"
                : "https://www.playstation.com/tr-tr/ps5/buy-now/"
            }`,
            "_blank"
          );
        }}
      >
        <span
        className="flag-close"
          style={{
            left: side === "right" ? 5 : "auto",
            right: side === "left" ? 5 : "auto",
          }}
          aria-label="close"
          onClick={handleClose}
        >
          ×
        </span>
      </div>)}/>
      
  );
};

export default Flag;
