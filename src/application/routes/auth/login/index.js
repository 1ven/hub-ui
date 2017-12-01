import React from "react";
import join from "url-join";

export default () => (
  <div className="flex items-center justify-center h-100">
    <a
      className="bg-blue white f5 br2 ph4 pv3 dib pointer no-underline hover-bg-black"
      href={join(process.env.REACT_APP_API, "/auth/github")}
    >
      Login with GitHub
    </a>
  </div>
);
