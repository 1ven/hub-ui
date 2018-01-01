import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { persistStore } from "redux-persist";
import { createEpicMiddleware } from "redux-observable";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { apiMiddleware } from "redux-server-middleware";
import { apiMiddleware as graphqlMiddleware } from "core/lib/redux-graphql";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (reducer, epic, history) => {
  const store = createStore(
    combineReducers({
      router: routerReducer,
      modules: reducer
    }),
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        apiMiddleware,
        graphqlMiddleware({
          map: {
            request: JSON.stringify,
            response: JSON.parse
          },
          endpoint: "https://api.github.com/graphql",
          headers: {
            authorization: `Bearer 02c6b6f8d1f87d2fab48090b92bc1463dd42ef04`,
            "content-type": "application/json"
          }
        }),
        createEpicMiddleware(epic)
      )
    )
  );
  const persistor = persistStore(store);

  return { persistor, store };
};
