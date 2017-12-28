import React from "react";
import styled from "styled-components";
import { withState } from "recompose";
import { colors } from "core/theme";

const Item = styled.div`
  background-color: ${colors.gray};
  border: 1px solid ${colors.darkGray};
  font-size: 0.9375rem;
  padding: 0.5625rem;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Wrap = styled.div`
  margin-bottom: 0.25rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Body = styled.div`
  margin-top: 0.25rem;
  padding: 0 0.5625rem;
`;

export default withState("active", "setActive", void 0)(
  ({ items, active, setActive }) => (
    <div>
      {items.map(({ title, body }, i) => (
        <Wrap key={i} onClick={() => setActive(i)}>
          <Item>{title}</Item>
          {active === i && <Body>{body}</Body>}
        </Wrap>
      ))}
    </div>
  )
);
