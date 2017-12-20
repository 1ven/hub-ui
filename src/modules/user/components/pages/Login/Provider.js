import { compose, withProps } from "recompose";
import join from "url-join";
import { unauthenticated } from "../../../hoc";
import View from "./View";

const { REACT_APP_API: api, REACT_APP_HOST: host } = process.env;

export default compose(
  unauthenticated,
  withProps({
    url: join(api, `/auth/github?redirect_uri=${join(host, "/auth/set-token")}`)
  })
)(View);
