import React from "react";
import styled from "styled-components";
import { colors } from "core/theme";
import { Overlay } from "components/generic/layout";
import { SideBody } from "components/workspace/generic";

const Head = styled.div`
  padding: 0.875rem 1rem;
  font-weight: 600;
  background-color: ${colors.gray};
  border-bottom: 1px solid ${colors.darkGray};
`;

const Issue = styled.div`
  padding: 0.625rem 1rem;
  border-bottom: 1px solid ${colors.darkGray};
`;

const More = styled.a`
  cursor: pointer;
  text-decoration: underline;
  margin-top: 0.5rem;
  display: inline-block;
  vertical-align: top;
`;

export default ({ issues, hasNextPage, isLoading }) => (
  <Overlay>
    <SideBody>
      <Head>Backlog</Head>
      <div>
        {issues &&
          issues.map(({ id, title, repository }) => (
            <Issue key={id} className="flex">
              {title}
              <div className="ml-auto">{repository.nameWithOwner}</div>
            </Issue>
          ))}
        {isLoading && <div>Loading...</div>}
      </div>
      {issues &&
        hasNextPage && (
          <div className="col">
            <More>Load more</More>
          </div>
        )}
    </SideBody>
  </Overlay>
);
