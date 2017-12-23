import React from "react";

export default ({ name, size = 1, lineHeight = 1 }) => (
  <i
    class="material-icons"
    style={{
      fontSize: `${size}rem`,
      lineHeight
    }}
  >
    {name}
  </i>
);
