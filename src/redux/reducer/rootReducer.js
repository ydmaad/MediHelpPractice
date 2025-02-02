import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { drugReducer } from "./drugReducer";

// 리듀서를 하나로 합침
export const rootReducer = combineReducers({
  auth: authReducer,
  drug: drugReducer,
});
