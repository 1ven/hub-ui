import React from "react";
import { SideBody, SideLink } from "components/generic/layout";

export default ({ children }) => (
  <SideBody
    sidebar={
      <div>
        <SideLink>Sprint board</SideLink>
        <SideLink>Backlog</SideLink>
        <SideLink>Settings</SideLink>
      </div>
    }
  >
    {children}
  </SideBody>
);
