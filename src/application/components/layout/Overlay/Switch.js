import React from "react";
import styled from "styled-components";
import { withProps } from "recompose";
import { Icon } from "core/components/kit";

const Arrow = withProps({
  lineHeight: 0.5,
  size: 0.75
})(Icon);

const Wrap = styled.div`
  cursor: pointer;
  height: 1.75rem;
  background-color: #fcfcfc;
  border-radius: 2px;
  padding-left: 0.5rem;
  padding-right: 0.25rem;
  border: 1px solid #d4d4d4;
`;

const Select = styled.select`
  cursor: pointer;
  appearance: none;
  outline: none;
  font-size: 0.875rem;
  background-color: transparent;
  border: 0;
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
