import styled from "styled-components";
import { transparentize } from "polished";
import { colors } from "core/theme";

export default styled.div`
  color: ${colors.black};
  margin: 0 -0.5rem 0.25rem;
  padding: 0.375rem 0.5rem;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    color: ${colors.blue};
    background-color: ${transparentize(0.9, colors.blue)};
  }
`;
