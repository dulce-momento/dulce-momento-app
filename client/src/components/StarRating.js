import React, { useContext, useState } from "react";
import { Image } from "react-bootstrap";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const StarRating = () => {
  //const [rating, setRating] = useState(null);  
  const { curRating } = useContext(Context);
  const [hover, setHover] = useState(null);

  return (
    <div style={{padding: '20px'}}>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={ratingValue + "label"}>
            <input
              type="radio"
              name="rating"
              style={{ display: "none" }}
              value={ratingValue}
              onClick={() => curRating.setCurRating(ratingValue)}//setRating(ratingValue)}
            />
            <Image
              key={i}
              className="star"
              size={100}
              src={ratingValue <= (hover || curRating.curRating) ? "/star_full.png" : "/star_empty.png"}
              width={15}
              height={15}
              style={{ display: "block" }}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <p>Рейтинг: {curRating.curRating}</p>

    </div>
  );
};

export default observer(StarRating);
