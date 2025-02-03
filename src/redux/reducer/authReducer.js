import { AUTH_ACTIONS } from "../actionTypes";

// 2. 리덕스 설정 방법
// 초기값 설정 후 리듀서 구현

// 로그인 초기값
const initialAuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

// 로그인/로그아웃 상태와 사용자 정보 관리
export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };
    case AUTH_ACTIONS.UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
