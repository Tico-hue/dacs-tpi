import { createStore, applyMiddleware } from "redux";
import { loginReducer } from "../reducers/LoginReducer";
const store = createStore(loginReducer, ["Use Redux"]);

export default store;
