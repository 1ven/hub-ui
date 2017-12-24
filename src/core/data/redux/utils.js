export const mergeReducers = (...reducers) => (state, action) =>
  reducers.reduce((prevState, r) => r(prevState, action), state);
