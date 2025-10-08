import FlagPortal from "./FlagPortal";
import rightFlag from "../../assets/flag-right.jpg";
import leftFlag from "../../assets/flag-left.jpg";

const Flag = ({ side }) => {
  const bg = side === "left" ? leftFlag : rightFlag;

  return (
    <FlagPortal>
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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.target.parentElement.style.display = "none";
          }}
        >
          ×
        </span>
      </div>
    </FlagPortal>
  );
};

export default Flag;
