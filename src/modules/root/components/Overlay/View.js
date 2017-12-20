import React from "react";
import Container from "../Container";

export default ({ children, workspaces, isLoading }) =>
  isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="h-100 flex flex-column">
      <div className="pv3 w-100 bg-white black bb b--moon-gray">
        <Container>
          <div className="flex items-center">
            <select>
              <option disabled>Select workspace</option>
              {workspaces.map(w => (
                <option key={w.id} value={w.id}>
                  {w.assigned_to + "/" + w.slug}
                </option>
              ))}
            </select>
            <div className="ml-auto">
              <a href="" className="link fw6 mid-gray hover-black">
                Settings
              </a>
            </div>
          </div>
        </Container>
      </div>
      <div className="flex-auto bg-near-white">{children}</div>
    </div>
  );
