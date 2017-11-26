import "rxjs";
import "isomorphic-fetch";

import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { ConnectedRouter } from "react-router-redux";
import { createStore } from "core/redux";
import bootstrap from "core/bootstrap";
import Root from "./application";

bootstrap();

const history = createBrowserHistory();
const { store, persistor } = createStore(history);

const App = () => (
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
    <ConnectedRouter history={history}>
      <Root />
    </ConnectedRouter>
    {/* </PersistGate> */}
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
