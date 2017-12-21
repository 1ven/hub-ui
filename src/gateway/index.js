import { renderRoutes } from "react-router-config";
import paths from "./paths";
import * as app from "application/components";
import * as auth from "application/modules/auth/components";
import * as workspace from "application/modules/workspace/components";

const Root = ({ route }) => renderRoutes(route.routes);

export default renderRoutes([
  {
    component: Root,
    routes: [
      {
        path: paths.main,
        exact: true,
        component: app.Redirect
      },
      {
        path: paths.login,
        exact: true,
        component: auth.Login
      },
      {
        path: paths.setToken,
        exact: true,
        component: auth.SetToken
      },
      {
        path: paths.workspace,
        exact: true,
        component: workspace.Main
      },
      {
        path: paths.noWorkspaces,
        exact: true,
        component: workspace.NoWorkspaces
      }
    ]
  }
]);
