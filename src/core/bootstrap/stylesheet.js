import { injectGlobal } from "styled-components";

export default () => injectGlobal`
  html {
    font-size: 14px;
  }
  html, body, #root {
    height: 100%;
  }
`;
