import React from "react";
import styled from "styled-components";
import Switch from "./Switch";
import * as modal from "../../modal";

const Header = styled.div`
  height: 3.25rem;
  border-bottom: 1px solid #dedede;
`;

const Link = styled.a`
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  color: #353535;
  &:hover {
    color: #000000;
  }
`;

export default ({
  children,
  workspaces,
  onWorkspaceChange,
  selected,
  isLoading
}) =>
  isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="h-100 flex flex-column">
      <Header className="w-100 container flex items-center">
        <Switch
          onChange={e =>
            onWorkspaceChange(workspaces.find(w => w.id == e.target.value))
          }
          value={selected}
        >
          <option disabled>Select workspace</option>
          {workspaces.map(w => (
            <option key={w.id} value={w.id}>
              {w.assigned_to + "/" + w.slug}
            </option>
          ))}
        </Switch>
        <div className="ml-auto">
          <Link href="#">Settings</Link>
        </div>
      </Header>
      <div className="flex-auto">{children}</div>
      <modal.Wrap>
        <modal.Box title="Create workspace">test</modal.Box>
      </modal.Wrap>
    </div>
  );
