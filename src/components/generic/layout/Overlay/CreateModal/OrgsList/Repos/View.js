import React from "react";
import styled from "styled-components";
import { colors } from "core/theme";
import Checkbox from "../Checkbox";

const Body = styled.div`
  padding-left: calc(1.625rem + 2px);
  position: relative;
  margin-bottom: 0.75rem;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0.625rem;
    width: 1px;
    height: 100%;
    background-color: ${colors.heavyGray};
  }
`;

const More = styled.div`
  text-decoration: underline;
  cursor: pointer;
`;

export default ({ isLoading, repos, selected, hasMore, loadMore, onCheck }) => (
  <Body>
    {repos &&
      (!repos.length
        ? "No repos"
        : repos.map((repo, i) => (
            <Checkbox
              onClick={() => onCheck(repo.id)}
              key={i}
              title={repo.title}
              isActive={selected.includes(repo.id)}
            />
          )))}
    <div>{isLoading && "Loading..."}</div>
    {hasMore && !isLoading && <More onClick={loadMore}>Load more</More>}
  </Body>
);
