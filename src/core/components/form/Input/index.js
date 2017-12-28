import React from "react";
import { assoc } from "ramda";
import styled from "styled-components";
import { placeholder } from "polished";
import { colors } from "core/theme";
import Error from "../Error";

const Wrap = styled.input`
  outline: 0;
  width: 100%;
  border-radius: 2px;
  border: 1px solid ${colors.heavyGray};
  padding: 0.5625rem;
  font-size: 0.875rem;
  ${placeholder({ color: colors.darkSilver })};
  ${({ isNotValid }) =>
    isNotValid &&
    `
    border-color: ${colors.red};
    margin-bottom: -2px;
  `};
`;

export default ({ field, placeholder, form: { touched, errors } }) => {
  const error = errors[field.name];
  const dirty = touched[field.name];

  return (
    <div>
      <Wrap
        {...assoc("value", field.value || "", field)}
        placeholder={placeholder}
        isNotValid={dirty && error}
      />
      {dirty && error && <Error>{error}</Error>}
    </div>
  );
};
