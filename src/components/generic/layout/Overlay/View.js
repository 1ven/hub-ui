import React from "react";
import styled from "styled-components";
import { colors } from "core/theme";
import { Icon } from "components/generic/kit";
import CreateModal from "./CreateModal";

const Header = styled.div`
  height: 3.25rem;
  border-bottom: 1px solid ${colors.darkGray};
`;

const Switch = styled.select`
  cursor: pointer;
  appearance: none;
  outline: none;
  font-size: 0.875rem;
  background-color: transparent;
  border: 0;
`;

const Link = styled.a`
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  color: ${colors.lightBlack};
  &:hover {
    color: ${colors.black};
  }
`;

const CreateWorkspace = styled(Icon)`
  margin-left: 0.25rem;
  cursor: pointer;
`;

export default ({
  children,
  workspaces,
  onWorkspaceChange,
  onCreateWorkspace,
  selected,
  isLoading,
  isModalVisible
}) =>
  isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="h-100 flex flex-column">
      <Header className="w-100 container flex items-center">
        <Switch
          onChange={e =>
            onWorkspaceChange(workspaces.find(w => w.id === +e.target.value))
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
        <CreateWorkspace name="add" onClick={onCreateWorkspace} />
        <div className="ml-auto">
          <Link href="#">Settings</Link>
        </div>
      </Header>
      <div className="flex-auto">{children}</div>
      {isModalVisible && <CreateModal />}
    </div>
  );
