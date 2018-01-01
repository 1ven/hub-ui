import { symbol } from "../createApi";

export default (types, request, config) => payload => ({
  [symbol]: true,
  request: typeof request === "function" ? request(payload) : request,
  payload,
  types,
  config
});
