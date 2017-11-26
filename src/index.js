import React from "react";
import ReactDOM from "react-dom";

const App = () => (
  <a
    className="bg-blue white f6 br2 ph3 pv2 dib ma2 pointer no-underline hover-bg-black"
    href="https://github.com/login/oauth/authorize?scope=user:email&client_id=295a8468029ab1edeadf"
  >
    Login with GitHub
  </a>
);

ReactDOM.render(<App />, document.getElementById("root"));
