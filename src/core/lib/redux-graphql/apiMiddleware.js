import { mergeDeepLeft } from "ramda";
import { fetchApi } from "./utils";
import { symbol } from "./createApi";

// TODO: should not be graphql specific
export default (config = {}) => store => next => action => {
  if (!action[symbol]) {
    return next(action);
  }

  next({
    type: action.types.request,
    payload: action.payload
  });

  fetchApi(
    action.request,
    mergeDeepLeft(config, action.config),
    (body, meta) => {
      next({
        type: action.types.success,
        payload: {
          request: action.payload,
          body,
          meta
        }
      });
    },
    (message, body, meta) => {
      next({
        type: action.types.failure,
        payload: {
          request: action.payload,
          message,
          body,
          meta
        }
      });
    }
  );
};
