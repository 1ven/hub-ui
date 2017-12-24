import React from "react";
import { createStructuredSelector, createSelector } from "reselect";
import { omit, equals } from "ramda";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

export default (
  api,
  apiToProps,
  { request = () => void 0, cache = true } = {}
) => Component =>
  compose(
    connect(
      createStructuredSelector({
        _api: makeSelector(api.selectors)
      }),
      {
        _fetch: api.request
      }
    ),
    lifecycle({
      componentDidMount() {
        // TODO: change to lastUpdated
        if (!this.props._api.data || !cache) {
          this.props._fetch(request(this.props));
        }
      },
      componentWillReceiveProps(nextProps) {
        if (!equals(request(nextProps), request(this.props))) {
          this.props._fetch(request(nextProps));
        }
      }
    })
  )(
    props =>
      !props._api.data || props._api.isFetching ? (
        "Loading..."
      ) : (
        <Component {...apiToProps && withApiProps(props, apiToProps)} />
      )
  );

const withApiProps = (props, apiToProps) => ({
  ...omit(["_api", "_fetch"], props),
  ...apiToProps(props._api, props)
});

const makeSelector = selectors =>
  createSelector(
    [
      selectors.data,
      selectors.isFetching,
      selectors.error,
      selectors.lastUpdated
    ],
    (data, isFetching, error, lastUpdated) => ({
      data,
      isFetching,
      lastUpdated,
      error
    })
  );
