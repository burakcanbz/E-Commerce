import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text }) => {

    const stars = [];
    
    const starStyle={ color: 'gold', marginRight: '2px' }
    for (let i = 1; i <= 5; i++) {
      if (value >= i) {
        stars.push(<FaStar key={i} style={starStyle} />);
      } else if (value >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} style={starStyle} />);
      } else {
        stars.push(<FaRegStar key={i} style={starStyle} />);
      }
    }
  return (
    <div style={{ display: 'flex', alignItems: 'center', cursor: "pointer", marginLeft: 10 }}>
        <span>{stars}</span>
        <span style={{fontWeight: '500', textDecoration: 'underline', marginLeft: 5}}>{ text && text }</span>
    </div>
  )
}

export default Rating