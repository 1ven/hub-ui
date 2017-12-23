import { injectGlobal } from "styled-components";
import "./normalize.min.css";
import { times } from "ramda";

export default () => injectGlobal`
  html {
    font-size: 14px;
  }
  html, body, #root {
    height: 100%;
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }

  .w-100 {
    width: 100%;
  }
  .h-100 {
    height: 100%;
  }
  .flex {
    display: flex;
  }
  .flex-row {
    flex-direction: row;
  }
  .flex-column {
    flex-direction: column;
  }
  .flex-auto {
    flex: 1;
  }
  .items-center {
    align-items: center;
  }
  .justify-center {
    justify-content: center;
  }
  .ml-auto {
    margin-left: auto;
  }
  .mr-auto {
    margin-right: auto;
  }
  .mt-auto {
    margin-top: auto;
  }
  .mb-auto {
    margin-bottom: auto;
  }

  .container {
    padding: 0 1rem;
    width: 100%;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    margin-left: -1rem;
    margin-right: -1rem;
  }
  .col {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  ${times(i => {
    const width = `${100 / (12 / (i + 1))}%`;
    return `
      .col-${i + 1} {
        flex: 0 0 ${width};
        max-width: ${width};
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
      }
    `;
  }, 12)}
`;
