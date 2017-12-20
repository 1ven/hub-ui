import "isomorphic-fetch";
import "rxjs";

import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { ConnectedRouter } from "react-router-redux";
import { createStore } from "core/redux";
import bootstrap from "core/bootstrap";
import app from "./gateway";
import { reducer, epic } from "./modules";

bootstrap();

const history = createBrowserHistory();
const { store, persistor } = createStore(reducer, epic, history);

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>{app}</ConnectedRouter>
    </PersistGate>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
