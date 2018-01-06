import { combineEpics } from "redux-observable";
import initialLoading from "./initialLoading";
import nextPageLoading from "./nextPageLoading";

export default combineEpics(initialLoading, nextPageLoading);
