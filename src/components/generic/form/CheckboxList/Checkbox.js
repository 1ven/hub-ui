import React from "react";
import styled from "styled-components";
import { Icon } from "components/generic/kit";
import { colors } from "core/theme";

const Item = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 2px;
  border: 1px solid ${colors.heavyGray};
  margin-right: 0.375rem;
  color: ${colors.white};
  ${({ isActive }) =>
    isActive &&
    `
    border-color: ${colors.blue};
    background-color: ${colors.blue};
  `};
`;

const Wrap = styled.div`
  font-size: 0.9375rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
  ${({ isActive }) =>
    isActive &&
    `
    color: ${colors.darkBlue};
  `};
`;

export default ({ title, isActive, isPartial, onClick }) => (
  <Wrap
    onClick={onClick}
    className="flex items-center"
    isActive={isActive || isPartial}
  >
    <Item
      className="flex items-center justify-center"
      isActive={isActive || isPartial}
    >
      <Icon name={isPartial ? "remove" : "done"} />
    </Item>
    {title}
  </Wrap>
);
