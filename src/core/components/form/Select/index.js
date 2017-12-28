import React from "react";
import styled from "styled-components";
import { withProps } from "recompose";
import { colors } from "core/theme";
import { Icon } from "core/components/kit";
import Error from "../Error";

const Arrow = withProps({
  lineHeight: 0.5,
  size: 0.75
})(Icon);

const Wrap = styled.div`
  cursor: pointer;
  border-radius: 2px;
  padding: 0.5625rem;
  border: 1px solid ${colors.heavyGray};
  ${({ isNotValid }) =>
    isNotValid &&
    `
    margin-bottom: -2px;
    border-color: ${colors.red};
  `};
`;

const Select = styled.select`
  cursor: pointer;
  appearance: none;
  outline: none;
  font-size: 0.875rem;
  background-color: transparent;
  border: 0;
  width: 100%;
`;

export default ({ field, children, form: { touched, errors } }) => {
  const error = errors[field.name];
  const dirty = touched[field.name];

  return (
    <div>
      <Wrap className="flex flex-row items-center" isNotValid={dirty && error}>
        <Select {...field} children={children} />
        <div className="flex flex-column">
          <Arrow name="keyboard_arrow_up" />
          <Arrow name="keyboard_arrow_down" />
        </div>
      </Wrap>
      {dirty && error && <Error>{error}</Error>}
    </div>
  );
};
