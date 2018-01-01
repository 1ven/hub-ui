import React from "react";
import { SideBody, SideLink } from "components/generic/layout";

export default ({ links, children }) => (
  <SideBody
    sidebar={
      <div>
        <SideLink to={links.issues}>Issues</SideLink>
        <SideLink to={"/settings"}>Settings</SideLink>
      </div>
    }
  >
    {children}
  </SideBody>
);
