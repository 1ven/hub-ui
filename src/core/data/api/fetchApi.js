import React from "react";
import { merge } from "ramda";
import { withProps, compose, lifecycle } from "recompose";
import { connect } from "react-redux";

const defaults = {
  sync: false,
  cache: false,
  fetchOnUpdate: () => false,
  Loader: () => "Loading..."
};

export default (api, config = {}) => Component =>
  compose(
    withProps(props => ({
      _config: merge(
        defaults,
        typeof config === "function" ? config(props) : config
      )
    })),
    connect(
      (state, { _config }) => {
        if (_config.selector) {
          const apiFromState = _config.selector(state);

          return {
            ...(_config.key && {
              [_config.key]: apiFromState
            }),
            _cached: apiFromState.lastUpdated
          };
        }

        return {};
      },
      (dispatch, { _config, ...props }) => ({
        _fetch() {
          const { payload } = _config;
          dispatch(api.request(payload));
        }
      })
    ),
    lifecycle({
      componentDidMount() {
        const { _config, _cached } = this.props;

        if (!_config.cache || !_cached) {
          this.props._fetch();
        }
      },
      componentWillReceiveProps(nextProps) {
        const { fetchOnUpdate } = nextProps._config;

        if (fetchOnUpdate(this.props, nextProps)) {
          this.props._fetch();
        }
      }
    })
  )(({ _fetch, _cached, _config, ...props }) => {
    if (!_config.sync || _cached) {
      return <Component {...props} />;
    }
    // eslint-disable-next-line
    return <_config.Loader />;
  });
