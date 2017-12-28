import styled from "styled-components";
import { transparentize } from "polished";
import { NavLink } from "react-router-dom";
import { colors } from "core/theme";

export default styled(NavLink)`
  color: ${colors.black};
  margin: 0 -0.5rem 0.25rem;
  padding: 0.375rem 0.5rem;
  text-decoration: none;
  display: block;
  border-radius: 3px;
  cursor: pointer;
  &:hover,
  &.active {
    color: ${colors.blue};
    background-color: ${transparentize(0.9, colors.blue)};
  }
`;
