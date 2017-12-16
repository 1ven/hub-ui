import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { persistStore } from "redux-persist";
import { createEpicMiddleware } from "redux-observable";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { apiMiddleware } from "redux-server-middleware";

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
        createEpicMiddleware(epic)
      )
    )
  );
  const persistor = persistStore(store);

  return { persistor, store };
};
