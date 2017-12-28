import React from "react";

export default ({
  name,
  onClick,
  className = "",
  size = 1,
  lineHeight = 1
}) => (
  <i
    onClick={onClick}
    className={`material-icons ${className}`}
    style={{
      fontSize: `${size}rem`,
      lineHeight
    }}
  >
    {name}
  </i>
);
