import { bindActionCreators } from "redux";
import { connect } from "react-redux";

export default actions =>
  connect(void 0, (dispatch, props) => {
    if (typeof actions !== "function") {
      return bindActionCreators(actions, dispatch);
    }
    return bindActionCreators(actions(props), dispatch);
  });
