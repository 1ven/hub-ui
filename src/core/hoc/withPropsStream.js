import React from "react";

export default mapper => Component =>
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        props: null
      };
    }

    componentDidMount() {
      const stream$ = mapper(this.props);

      stream$.subscribe(value =>
        this.setState({
          props: value
        })
      );
    }

    render() {
      if (!this.state.props) {
        return null;
      }
      return <Component {...this.props} {...this.state.props} />;
    }
  };
