import { mapObjIndexed } from "ramda";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

export default spec =>
  connect(void 0, (dispatch, props) =>
    bindActionCreators(mapObjIndexed(fn => fn(props), spec), dispatch)
  );
