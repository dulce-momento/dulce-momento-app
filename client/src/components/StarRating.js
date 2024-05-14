import React, { useState } from "react";
import { Image } from "react-bootstrap";

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label>
            <input
              type="radio"
              name="rating"
              style={{display:"none"}}
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <Image
              key={i}
              className="star"
              size={100}
              src={ratingValue <= (hover || rating) ? "/star_full.png" : "/star_empty.png"}
              width={15}
              height={15}
              style={{display: "block"}}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <p>Рейтинг: {rating}</p>
    </div>
  );
};

export default StarRating;
