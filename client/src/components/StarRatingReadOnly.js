import React from "react";
import { Image } from "react-bootstrap";

const StarRatingReadOnly = ({rating}) => {

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={"starlabel"+i}>
            <Image
              key={"star"+{i}}
              className="star"
              size={100}
              src={ratingValue <= (rating) ? "/star_full.png" : "/star_empty.png"}
              width={15}
              height={15}
              style={{display: "block"}}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRatingReadOnly;
