import React from "react";
import styled from "styled-components";
import { colors } from "core/theme";

const Input = styled.input`
  appearance: none;
  outline: none;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 2px;
  border: 1px solid ${colors.heavyGray};
  margin-right: 0.375rem;
  &:checked {
    border-color: ${colors.blue};
    background-color: ${colors.blue};
  }
`;

const Label = styled.label`
  font-size: 0.9375rem;
`;

export default ({ field, title }) => (
  <Label className="flex items-center">
    <Input type="checkbox" />
    {title}
  </Label>
);
