import { prop } from "ramda";
import { protect } from "application/data/user/hoc";

export default protect(prop("isAuthenticated"))(() => "list of orgs");
