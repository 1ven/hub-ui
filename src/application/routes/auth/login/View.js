import React from "react";

export default ({ url }) => (
  <div className="flex items-center justify-center h-100">
    <a
      className="bg-blue white f5 br2 ph4 pv3 dib pointer no-underline hover-bg-black"
      href={url}
    >
      Login with GitHub
    </a>
  </div>
);
