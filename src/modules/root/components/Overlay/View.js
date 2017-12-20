import React from "react";

export default ({ children, workspaces, isLoading }) =>
  isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div className="pv3 w-100 bg-black white">
        <select>
          <option disabled>Select workspace</option>
          {workspaces.map(w => (
            <option key={w.id} value={w.id}>
              {w.assigned_to + "/" + w.slug}
            </option>
          ))}
        </select>
        header
      </div>
      {children}
    </div>
  );
