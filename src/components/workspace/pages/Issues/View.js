import React from "react";
import styled from "styled-components";
import { Overlay } from "components/generic/layout";
import { SideBody } from "components/workspace/generic";
import { Section } from "./components";

const More = styled.a`
  cursor: pointer;
  text-decoration: underline;
  margin-top: 0.5rem;
  display: inline-block;
  vertical-align: top;
`;

export default ({
  issues,
  issuesBySprint,
  sprints,
  loadMore,
  hasNextPage,
  issuesLoading,
  pageLoading
}) => (
  <Overlay>
    <SideBody>
      {pageLoading ? (
        "Loading..."
      ) : (
        <div>
          {sprints.map(sprint => (
            <Section
              key={sprint.id}
              title={sprint.title}
              issues={issuesBySprint[sprint.id]}
              emptyMessage="You have no issues in this sprint"
            />
          ))}
          <div>
            {
              <Section
                title="Backlog"
                issues={issues}
                emptyMessage="You have no issues in the backlog"
              />
            }
            {issuesLoading && <div>Loading...</div>}
            {!issuesLoading &&
              hasNextPage && (
                <div className="col">
                  <More onClick={loadMore}>Load more</More>
                </div>
              )}
          </div>
        </div>
      )}
    </SideBody>
  </Overlay>
);
