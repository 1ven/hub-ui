import { authenticated } from "modules/user/hoc";
import View from "./View";

export default authenticated(View);
