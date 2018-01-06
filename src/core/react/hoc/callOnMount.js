import { lifecycle } from "recompose";

export default prop =>
  lifecycle({
    componentDidMount() {
      this.props[prop]();
    }
  });
