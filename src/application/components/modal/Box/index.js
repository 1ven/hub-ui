import React from "react";
import styled from "styled-components";
import { Icon } from "core/components/kit";

const Wrap = styled.div`
  border-radius: 2px;
  max-width: 45rem;
  width: 100%;
`;

const Header = styled.div`
  background-color: #ecf0f1;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  padding: 0 1.5rem;
  height: 4rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #3d3e3e;
`;

const Body = styled.div`
  padding: 1.5rem;
  background-color: #fff;
`;

const Close = styled(Icon)`
  color: #767878;
  cursor: pointer;
  margin-left: auto;
  font-weight: 600;
`;

export default ({ title, children, onClose }) => (
  <Wrap>
    <Header className="flex items-center">
      {title}
      <Close name="close" size="1.25" />
    </Header>
    <Body>{children}</Body>
  </Wrap>
);
