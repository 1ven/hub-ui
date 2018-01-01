import { mergeDeepLeft } from "ramda";
import { fetchApi } from "./utils";
import { symbol } from "./createApi";

// TODO: should keep fetching method(rest, graphql) settings code just here?
export default (config = {}) => store => next => async action => {
  if (!action[symbol]) {
    return next(action);
  }

  next({
    type: action.types.request,
    payload: action.payload
  });

  if (action.payload instanceof Array) {
    try {
      const data = await Promise.all(
        action.payload.map(payload => sendRequest(payload, action, config))
      );

      fetchingSuccess(data, action, next);
    } catch (err) {
      fetchingFailure(err, action, next);
    }

    return;
  }

  try {
    const data = await sendRequest(action.payload, action, config);

    fetchingSuccess(data, action, next);
  } catch (err) {
    fetchingFailure(err, action, next);
  }
};

const sendRequest = (payload, { request, config }, genericConfig) =>
  fetchApi(
    typeof request === "function" ? request(payload) : request,
    mergeDeepLeft(genericConfig, config)
  );

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
