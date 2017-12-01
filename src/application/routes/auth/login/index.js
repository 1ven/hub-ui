import React from "react";
import join from "url-join";

export default () => (
  <div className="flex items-center justify-center">
    <a
      className="bg-blue white f6 br2 ph3 pv2 dib ma2 pointer no-underline hover-bg-black"
      href={join(process.env.REACT_APP_API, "/auth/github")}
    >
      Login with GitHub
    </a>
  </div>
);
