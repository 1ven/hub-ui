import React from "react";
import { omit, merge } from "ramda";
import { withProps, compose, lifecycle } from "recompose";
import { connect } from "react-redux";

const defaults = {
  shouldFetch: true
};

export default (api, config = {}) => Component =>
  compose(
    withProps(props => ({
      _config: merge(
        defaults,
        typeof config === "function" ? config(props) : config
      )
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
