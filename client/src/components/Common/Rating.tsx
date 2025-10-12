import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

import type { JSX } from "react";
import type { RatingPropsType } from "../../types/components";

const Rating = ({ value, text, onChange }: RatingPropsType): JSX.Element => {
  const stars = [];
  const starStyle = { color: 'gold', marginRight: '2px' };

  for (let i = 1; i <= 5; i++) {
    const handleClick = () => {
      if (onChange) {
        onChange(i);
      }
    };
    
    if (typeof value !== 'number') continue;
    if (value >= i) {
      stars.push(
        <FaStar key={i} style={starStyle} onClick={handleClick} />
      );
    } else if (value >= i - 0.5) {
      stars.push(
        <FaStarHalfAlt key={i} style={starStyle} onClick={handleClick} />
      );
    } else {
      stars.push(
        <FaRegStar key={i} style={starStyle} onClick={handleClick} />
      );
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", cursor: 'pointer', marginTop: -9, marginLeft: 5}}>
      <span style={{ fontSize: '.8em' }}>{stars}</span>
      <span style={{ fontWeight: '500', fontSize: '0.8em', marginLeft: 5, marginTop: 2 }}>
        {text && text}
      </span>
    </div>
  );
};

export default Rating;
