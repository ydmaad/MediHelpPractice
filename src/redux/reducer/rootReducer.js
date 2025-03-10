import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { drugReducer } from "./drugReducer";
import { calendarReducer } from "./calendarReducer";
import { medicineReducer } from "./medicineReducer";

// 리듀서를 하나로 합침
export const rootReducer = combineReducers({
  auth: authReducer,
  drug: drugReducer,
  calendar: calendarReducer,
  medicine: medicineReducer,
});
