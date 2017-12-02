import React from "react";
import join from "url-join";

const { REACT_APP_API: api, REACT_APP_HOST: host } = process.env;

export default () => (
  <div className="flex items-center justify-center h-100">
    <a
      className="bg-blue white f5 br2 ph4 pv3 dib pointer no-underline hover-bg-black"
      href={join(
        api,
        `/auth/github?redirect_uri=${join(host, "/auth/set-token")}`
      )}
    >
      Login with GitHub
    </a>
  </div>
);
