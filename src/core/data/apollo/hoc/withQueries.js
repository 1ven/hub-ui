import React from "react";
import { prop } from "ramda";
import { compose } from "recompose";
import { withApollo } from "react-apollo";

export default (responseToProps, propsToReq) => Component =>
  compose(withApollo)(
    class extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          res: void 0
        };
      }

      async componentDidMount() {
        const queries = propsToReq(this.props).map(this.props.client.query);
        const res = (await Promise.all(queries)).map(prop("data"));

        this.setState({
          res
        });
      }

      render() {
        const resProps =
          this.state.res && responseToProps(this.state.res, this.props);
        return <Component {...this.props} {...resProps} />;
      }
    }
  );
