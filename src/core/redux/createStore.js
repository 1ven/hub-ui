import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { persistStore } from "redux-persist";
import { createEpicMiddleware } from "redux-observable";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { apiMiddleware } from "redux-server-middleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default history => {
  const store = createStore(
    combineReducers({
      router: routerReducer
    }),
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        apiMiddleware
        // createEpicMiddleware(scenesEpic)
      )
    )
  );
  const persistor = persistStore(store);

  return { persistor, store };
};
