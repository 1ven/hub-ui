import { F } from "ramda";
import { authorized } from "modules/user/hoc";

export default authorized(F)(F);
