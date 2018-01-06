export default (store, selector, propsToAction) =>
  propsToAction(selector(store.getState()));
