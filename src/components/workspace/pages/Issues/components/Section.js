import React from "react";
import styled from "styled-components";
import { colors } from "core/theme";

export default ({ title, issues, emptyMessage }) => (
  <div>
    <Head>{title}</Head>
    {!issues.length ? (
      <Empty>{emptyMessage}</Empty>
    ) : (
      issues.map(({ id, title, createdAt, repository }) => (
        <Issue key={id} className="flex">
          {title}
          <div className="ml-auto">{repository.nameWithOwner}</div>
        </Issue>
      ))
    )}
  </div>
);

const Empty = styled.div`
  text-align: center;
  padding: 1rem 0;
`;

const Head = styled.div`
  padding: 0.875rem 1rem;
  font-weight: 600;
  background-color: ${colors.gray};
  margin-top: -1px;
  border-top: 1px solid ${colors.darkGray};
  border-bottom: 1px solid ${colors.darkGray};
`;

const Issue = styled.div`
  padding: 0.625rem 1rem;
  border-bottom: 1px solid ${colors.darkGray};
`;
