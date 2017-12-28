import React from "react";
import { SideBody, SideLink } from "components/generic/layout";

export default ({ path, children }) => (
  <SideBody
    sidebar={
      <div>
        <SideLink to={path + "/backlog"}>Backlog</SideLink>
        <SideLink to={path + "/settings"}>Settings</SideLink>
      </div>
    }
  >
    {children}
  </SideBody>
);
