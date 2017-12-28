import React from "react";
import styled from "styled-components";
import { Icon } from "core/components/kit";
import { colors } from "core/theme";

const Wrap = styled.div`
  border-radius: 2px;
  max-width: 45rem;
  width: 100%;
  background-color: #fff;
  border-radius: 2px;
`;

const Header = styled.div`
  padding: 0 1.5rem;
  height: 4rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${colors.lightBlack};
`;

const Close = styled(Icon)`
  color: #767878;
  cursor: pointer;
  margin-left: auto;
  font-weight: 600;
`;

export default ({ title, children, onClose }) => (
  <Wrap onClick={e => e.stopPropagation()}>
    <Header className="flex items-center">
      {title}
      <Close onClick={onClose} name="close" size="1.25" />
    </Header>
    {children}
  </Wrap>
);
