import React from "react";
import styled from "styled-components";
import { colors } from "core/theme";

const themes = {
  blue: `
    background-color: ${colors.blue};
    color: ${colors.white};
    &:hover {
      background-color: ${colors.darkBlue};
    }
  `,
  bordered: `
    background-color: ${colors.white};
    border: 1px solid ${colors.silver};
    color: ${colors.silver};
    padding: calc(0.5625rem - 1px) calc(1.25rem - 1px);
  `
};

const Wrap = styled.button`
  border: 0;
  appearance: none;
  outline: 0;
  font-weight: 600;
  border-radius: 2px;
  background-color: rgb(0, 126, 255);
  cursor: pointer;
  padding: 0.5625rem 1.25rem;
  font-family: inherit;
  ${({ theme }) => themes[theme]};
`;

export default ({ type, children, className, theme = "blue", onClick }) => (
  <Wrap onClick={onClick} className={className} type={type} theme={theme}>
    {children}
  </Wrap>
);
