import { renderRoutes } from "react-router-config";
import paths from "./paths";
import * as user from "modules/user";
import * as userSignIn from "modules/user/modules/sign-in";
import * as workspace from "modules/workspace";

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
        component: userSignIn.cmp.pages.Login
      },
      {
        path: paths.setToken,
        exact: true,
        component: userSignIn.cmp.pages.SetToken
      },
      {
        path: paths.workspace,
        exact: true,
        component: workspace.cmp.pages.Main
      },
      {
        path: paths.noWorkspaces,
        exact: true,
        component: workspace.cmp.pages.NoWorkspaces
      }
    ]
  }
]);
