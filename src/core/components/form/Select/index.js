import React from "react";
import styled from "styled-components";
import { withProps } from "recompose";
import { Icon } from "core/components/kit";
import { colors } from "core/theme";

const Arrow = withProps({
  lineHeight: 0.5,
  size: 0.75
})(Icon);

const Wrap = styled.div`
  cursor: pointer;
  border-radius: 2px;
  padding: 0.5625rem;
  border: 1px solid ${colors.heavyGray};
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

export default props => (
  <Wrap className="flex flex-row items-center">
    <Select {...props} />
    <div className="flex flex-column">
      <Arrow name="keyboard_arrow_up" />
      <Arrow name="keyboard_arrow_down" />
    </div>
  </Wrap>
);
