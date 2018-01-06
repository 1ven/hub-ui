import React from "react";
import { keys, F } from "ramda";

export default (spec, Loader = F) => Component => props => {
  if (
    !keys(spec).reduce((acc, key) => (!acc ? acc : spec[key](props[key])), true)
  ) {
    return <Loader />;
  }
  return <Component {...props} />;
};
