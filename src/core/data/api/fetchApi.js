import React from "react";
import { omit } from "ramda";
import { withProps, compose, lifecycle } from "recompose";
import { connect } from "react-redux";

export default (api, config) => Component =>
  compose(
    withProps(props => ({
      _config: typeof config === "function" ? config(props) : config
    })),
    connect(void 0, (dispatch, { _config, ...props }) => ({
      _fetch() {
        const { shouldFetch, payload } = _config;
        if (shouldFetch) {
          dispatch(api.request(payload));
        }
      }
    })),
    lifecycle({
      componentDidMount() {
        this.props._fetch();
      },
      componentWillReceiveProps(nextProps) {
        const { fetchOnUpdate } = nextProps._config;

        if (fetchOnUpdate && fetchOnUpdate(this.props, nextProps)) {
          this.props._fetch();
        }
      }
    })
  )(props => <Component {...omit(internalKeys, props)} />);

const internalKeys = ["_api", "_fetch", "_config"];
