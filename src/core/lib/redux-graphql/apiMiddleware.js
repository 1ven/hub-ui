import { mergeDeepLeft } from "ramda";
import { fetchApi } from "./utils";
import { symbol } from "./createApi";

// TODO: should keep fetching method(rest, graphql) settings code just here?
export default (config = {}) => store => next => async action => {
  if (!action[symbol]) {
    return next(action);
  }

  const { request, payload, types } = action;

  next({
    type: types.request,
    payload
  });

  try {
    const { data, meta } = await fetchApi(
      typeof request === "function" ? request(payload) : request,
      mergeDeepLeft(config, action.config)
    );

    next({
      type: types.success,
      payload: {
        request: payload,
        body: data,
        meta
      }
    });
  } catch ({ message, data, meta }) {
    next({
      type: types.failure,
      payload: {
        request: payload,
        message,
        data,
        meta
      }
    });
  }
};
