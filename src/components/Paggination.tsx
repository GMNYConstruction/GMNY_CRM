import React, { useEffect, useState } from "react";
import { Button } from "./Button";

interface IProps {
  pagesArr: number[];
  currentPage: number;
  onPageClick: (page: number) => void;
}

const Paggination: React.FC<IProps> = ({ pagesArr, currentPage, onPageClick }) => {
  const length = pagesArr.length;
  const [displayLeft, setDisplayLeft] = useState({
    min: 2,
    max: Math.floor(length / 2),
  });
  const [displayRight, setDisplayRight] = useState({
    min: Math.floor(length / 2) + 1,
    max: length - 2,
  });

  useEffect(() => {
    setDisplayLeft({
      min: 2,
      max: Math.floor(length / 2),
    });
    setDisplayRight({
      min: Math.floor(length / 2) + 1,
      max: length,
    });
  }, [length]);

  if (pagesArr?.length <= 8) {
    return (
      <div className="w-full flex gap-2">
        {pagesArr.map((value, index) => (
          <Button
            btype="button"
            key={`${index}${value}`}
            onClick={() => onPageClick(value)}
            properties={`${currentPage !== value && "shadow-none border-0"}`}
          >
            {value}
          </Button>
        ))}
      </div>
    );
  }

  const handleLeftSide = () => {
    let min = displayLeft.min - 1;
    let max = displayLeft.min + 1;

    if (currentPage > 2 && currentPage + 1 < displayLeft.max + 1) {
      min = currentPage - 2;
      max = currentPage + 1;
    } else if (currentPage > 2 && currentPage + 1 >= displayLeft.max + 1) {
      min = displayLeft.max - 2;
      max = displayLeft.max;
    }

    return pagesArr.slice(min, max).map((value, index) => (
      <Button
        btype="button"
        key={`${index}${value}`}
        onClick={() => onPageClick(value)}
        properties={`${value !== currentPage && "border-0 shadow-none"}`}
      >
        {value}
      </Button>
    ));
  };

  const handleRightSide = () => {
    let min = displayRight.min - 1;
    let max = displayRight.min + 1;

    if (currentPage > min + 1 && currentPage + 1 < displayRight.max) {
      min = currentPage - 2;
      max = currentPage + 1;
    } else if (currentPage > min + 2 && currentPage + 1 >= displayRight.max) {
      min = displayRight.max - 3;
      max = displayRight.max - 1;
    }

    return pagesArr.slice(min, max).map((value, index) => (
      <Button
        btype="button"
        key={`${index}${value}`}
        onClick={() => onPageClick(value)}
        properties={`${value !== currentPage && "border-0 shadow-none"}`}
      >
        {value}
      </Button>
    ));
  };

  const handleHideMiddleButton = () => {
    if (
      currentPage === displayLeft.max ||
      currentPage === displayLeft.max - 1 ||
      currentPage === displayRight.min ||
      currentPage === displayRight.min + 1
    ) {
      return "hidden";
    }
  };

  return (
    <div className="w-full flex gap-2">
      <Button
        btype="button"
        properties={`${currentPage !== 1 && "border-0 shadow-none"}`}
        onClick={() => onPageClick(1)}
      >
        1
      </Button>

      {handleLeftSide()}

      <Button btype="button" properties={`border-0 shadow-none ${handleHideMiddleButton()}`}>
        ...
      </Button>

      {handleRightSide()}

      <Button
        btype="button"
        properties={`${currentPage !== length && "border-0 shadow-none"}`}
        onClick={() => onPageClick(length)}
      >
        {length}
      </Button>
    </div>
  );
};

export default Paggination;
