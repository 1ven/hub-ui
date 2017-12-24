import "isomorphic-fetch";
import "rxjs";

import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { ConnectedRouter } from "react-router-redux";
import { createStore } from "core/data/redux";
import { client } from "core/data/apollo";
import bootstrap from "core/bootstrap";
import app from "./gateway";
import { reducer, epic } from "./application";

bootstrap();

const history = createBrowserHistory();
const { store, persistor } = createStore(reducer, epic, history);

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>{app}</ConnectedRouter>
      </PersistGate>
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
