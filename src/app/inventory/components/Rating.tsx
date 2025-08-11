import { Star } from "lucide-react";
import React from "react";

type RatingProps = {
  rating: number;
};

const Rating = ({ rating }: RatingProps) => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          color={index <= rating ? "#FFC107" : "#E4E5E9"}
          size={16} // ersetzt w-4 h-4
          style={{ marginRight: 2 }}
        />
      ))}
    </>
  );
};

export default Rating;
