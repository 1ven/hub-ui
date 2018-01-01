import { mergeDeepLeft } from "ramda";
import { fetchApi } from "./utils";
import { symbol } from "./createApi";

// TODO: should not be graphql specific
export default (config = {}) => store => next => async action => {
  if (!action[symbol]) {
    return next(action);
  }

  next({
    type: action.types.request,
    payload: action.payload
  });

  try {
    const { data, meta } = await fetchApi(
      action.request,
      mergeDeepLeft(config, action.config)
    );

    next({
      type: action.types.success,
      payload: {
        request: action.payload,
        body: data,
        meta
      }
    });
  } catch ({ message, data, meta }) {
    next({
      type: action.types.failure,
      payload: {
        request: action.payload,
        message,
        data,
        meta
      }
    });
  }
};
