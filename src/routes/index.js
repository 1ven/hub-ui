import { renderRoutes } from "react-router-config";
import paths from "./paths";
import * as auth from "components/auth/pages";
import * as workspace from "components/workspace/pages";

const Root = ({ route }) => renderRoutes(route.routes);

export default renderRoutes([
  {
    component: Root,
    routes: [
      {
        path: paths.main,
        exact: true,
        component: auth.Redirect
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
        path: paths.backlog,
        exact: true,
        component: workspace.Backlog
      },
      {
        path: paths.noWorkspaces,
        exact: true,
        component: workspace.NoWorkspaces
      }
    ]
  }
]);
