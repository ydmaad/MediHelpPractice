// 1. 리덕스 설정 방법
// 기능별 액션 타입 정의

// 로그인
export const AUTH_ACTIONS = {
  LOGIN_SUCCESS: "AUTH/LOGIN_SUCCESS",
  LOGIN_FAILURE: "AUTH/LOGIN_FAILURE",
  LOGOUT: "AUTH/LOGOUT",
  UPDATE_PROFILE: "AUTH/UPDATE_PROFILE",
};

// 약 검색
export const DRUG_ACTIONS = {
  SET_SEARCH_RESULTS: "DRUG/SET_SEARCH_RESULTS",
  ADD_RECENT_SEARCH: "DRUG/ADD_RECENT_SEARCH",
  ADD_FAVORITES: "DRUG/ADD_FAVORITES",
  REMOVE_FAVORITES: "DRUG/REMOVE_FAVORITES",
};

// 캘린더
export const CALENDAR_ACTIONS = {
  ADD_SCHEDULE: "CALENDAR/ADD_SCHEDULE",
  UPDATE_SCHEDULE: "CALENDAR/UPDATE_SCHEDULE",
  DELETE_SCHEDULE: "CALENDAR/DELETE_SCHEDULE",
  SET_ALARM: "CALENDAR/SET_ALARM",
};

// 약 관리
export const MEDICINE_ACTIONS = {
  ADD_MEDICINE: "MEDICINE/ADD_MEDICINE",
  SET_MEDICINE: "MEDICINE/SET_MEDICINE",
  UPDATE_MEDICINE: "MEDICINE/UPDATE_MEDICINE",
  DELETE_MEDICINE: "MEDICINE/DELETE_MEDICINE",
};

// 커뮤니티
export const COMMUNITY_ACTIONS = {
  ADD_POST: "COMMUNITY/ADD_POST",
  UPDATE_POST: "COMMUNITY/UPDATE_POST",
  DELETE_POST: "COMMUNITY/DELETE_POST",
};
