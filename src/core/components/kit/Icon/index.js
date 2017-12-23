import React from "react";

export default ({ name, className = "", size = 1, lineHeight = 1 }) => (
  <i
    class={`material-icons ${className}`}
    style={{
      fontSize: `${size}rem`,
      lineHeight
    }}
  >
    {name}
  </i>
);
