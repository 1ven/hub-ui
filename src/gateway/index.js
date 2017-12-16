import { renderRoutes } from "react-router-config";
import * as user from "modules/user";
import * as workspace from "modules/workspace";

export const paths = {
  main: "/",
  login: "/auth/login",
  setToken: "/auth/set-token/:token",
  workspace: "/w/:org/:slug"
};

const Root = ({ route }) => renderRoutes(route.routes);

export default renderRoutes([
  {
    component: Root,
    routes: [
      {
        path: paths.main,
        exact: true,
        component: user.cmp.pages.Redirect
      },
      {
        path: paths.login,
        exact: true,
        component: user.cmp.pages.Login
      },
      {
        path: paths.setToken,
        exact: true,
        component: user.cmp.pages.SetToken
      },
      {
        path: paths.workspace,
        exact: true,
        component: workspace.cmp.pages.Main
      }
    ]
  }
]);
