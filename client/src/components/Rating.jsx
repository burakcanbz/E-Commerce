import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text, onChange }) => {
  const stars = [];
  const starStyle = { color: 'gold', marginRight: '2px' };

  for (let i = 1; i <= 5; i++) {
    const handleClick = () => {
      if (onChange) {
        onChange(i);
      }
    };

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
    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: 10 }}>
      <span>{stars}</span>
      <span style={{ fontWeight: '500', marginLeft: 5, marginTop: 2.8 }}>
        {text && text}
      </span>
    </div>
  );
};

export default Rating;
