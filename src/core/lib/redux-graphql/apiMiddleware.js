import { mergeDeepLeft } from "ramda";
import { fetchApi } from "./utils";
import { symbol } from "./createApi";

// TODO: should keep fetching method(rest, graphql) settings code just here?
export default (genericConfig = {}) => store => next => async action => {
  if (!action[symbol]) {
    return next(action);
  }

  next({
    type: action.types.request,
    payload: action.payload
  });

  const config = mergeDeepLeft(genericConfig, action.config);
  const request =
    typeof action.request === "function"
      ? action.request(action.payload)
      : action.request;

  if (request instanceof Array) {
    try {
      const data = await Promise.all(
        request.map(item => fetchApi(item, config))
      );

      fetchingSuccess(data, action, next);
    } catch (err) {
      fetchingFailure(err, action, next);
    }

    return;
  }

  try {
    const data = await fetchApi(request, config);

    fetchingSuccess(data, action, next);
  } catch (err) {
    fetchingFailure(err, action, next);
  }
};

const fetchingSuccess = (data, { types, payload }, dispatch) =>
  dispatch({
    type: types.success,
    payload: {
      request: payload,
      body: data,
      meta: {
        receivedAt: Date.now()
      }
    }
  });

const fetchingFailure = ({ message, data }, { types, payload }, dispatch) =>
  dispatch({
    type: types.failure,
    payload: {
      request: payload,
      message,
      data,
      meta: {
        receivedAt: Date.now()
      }
    }
  });
