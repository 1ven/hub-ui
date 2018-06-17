import { rest } from "core/data/api/fetch";

export const fetchUser = () =>
  rest({
    path: `/user`,
    method: "GET"
  });
