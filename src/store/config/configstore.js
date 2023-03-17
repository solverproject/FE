import { combineReducers, createStore } from "redux";
import followers from "../modules/followers";

const rootReducer = combineReducers({
  followers: followers,
});
const store = createStore(rootReducer);

export default store;
