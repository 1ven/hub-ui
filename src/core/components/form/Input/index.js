import React from "react";
import styled from "styled-components";
import { placeholder } from "polished";
import { colors } from "core/theme";

const Wrap = styled.input`
  outline: 0;
  width: 100%;
  border-radius: 2px;
  border: 1px solid ${colors.heavyGray};
  padding: 0.5625rem;
  font-size: 0.875rem;
  ${placeholder({ color: colors.darkSilver })};
`;

export default ({ placeholder }) => <Wrap placeholder={placeholder} />;
