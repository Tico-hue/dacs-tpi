import { combineReducers } from "redux";

import { loginReducer } from "./reducers/LoginReducer";

const reducers = combineReducers({
  logged: loginReducer,
});

export default reducers;
