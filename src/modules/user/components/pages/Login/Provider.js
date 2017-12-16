import { compose, withProps } from "recompose";
import { prop, not } from "ramda";
import join from "url-join";
import { protect } from "../../../hoc";
import View from "./View";

const { REACT_APP_API: api, REACT_APP_HOST: host } = process.env;

export default compose(
  protect(compose(not, prop("isAuthenticated"))),
  withProps({
    url: join(api, `/auth/github?redirect_uri=${join(host, "/auth/set-token")}`)
  })
)(View);
