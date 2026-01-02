"use client";

import React from "react";
import {
  RatingDisplayProps as FluentRatingDisplayProps,
  RatingDisplay as FluentRatingDisplay
} from "@fluentui/react-rating";

interface RatingDisplayProps extends FluentRatingDisplayProps {
  value: number;
  className?: string;
  style?: React.CSSProperties;
}

const RatingDisplay = ({ value, className, style, ...rest }: RatingDisplayProps) => {
  return (
    <FluentRatingDisplay
      value={value}
      className={className}
      style={style}
      {...rest}
    />
  );
};

export default RatingDisplay;
