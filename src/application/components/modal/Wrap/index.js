import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Portal = ({ children }) =>
  ReactDOM.createPortal(children, document.getElementById("modals"));

const Wrap = styled.div`
  background-color: rgba(0, 33, 66, 0.5);
`;

export default ({ children, onHide }) => (
  <Portal>
    <Wrap
      className="fixed t-0 l-0 w-100 h-100 flex items-center justify-center"
      onClick={onHide}
    >
      {children}
    </Wrap>
  </Portal>
);
