import { symbol } from "../createApi";

export default (types, request, config) => payload => ({
  [symbol]: true,
  request,
  payload,
  types,
  config
});
