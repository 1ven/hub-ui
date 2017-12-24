import React from "react";
import styled from "styled-components";
import { Icon, Button } from "core/components/kit";
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

const Body = styled.div`
  padding: 0 1.5rem 1.5rem;
`;

const Footer = styled.div`
  background-color: ${colors.gray};
  border-top: 1px solid ${colors.darkGray};
  padding: 1rem 1.5rem;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
`;

const Close = styled(Icon)`
  color: #767878;
  cursor: pointer;
  margin-left: auto;
  font-weight: 600;
`;

const Cancel = styled(Button)`
  margin-right: 0.75rem;
`;

export default ({ title, children, onClose }) => (
  <Wrap onClick={e => e.stopPropagation()}>
    <Header className="flex items-center">
      {title}
      <Close onClick={onClose} name="close" size="1.25" />
    </Header>
    <Body>{children}</Body>
    <Footer className="flex items-center">
      <div className="ml-auto">
        <Cancel theme="bordered" onClick={onClose}>
          Cancel
        </Cancel>
        <Button>Create</Button>
      </div>
    </Footer>
  </Wrap>
);
