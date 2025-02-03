import { AUTH_ACTIONS } from "../actionTypes";

// 3. 리덕스 설정 방법
// 액션 생성자 정의

// 기본 구조
// export const 액션생성자이름 = (파라미터) => ({
//     type: 액션타입,
//     payload: 데이터
// });

// 로그인 성공 시 호출
export const loginSuccess = (user) => ({
  type: AUTH_ACTIONS.LOGIN_SUCCESS,
  payload: user,
});

// 로그인 실패 시 호출
export const loginFailure = (error) => ({
  type: AUTH_ACTIONS.LOGIN_FAILURE,
  payload: error,
});

// 로그아웃 시 호출
export const logout = () => ({
  type: AUTH_ACTIONS.LOGOUT,
});

// 따로 할지 말지 결정하기
// 프로필 업데이트 시 호출
export const updateProfile = (userData) => ({
  type: AUTH_ACTIONS.UPDATE_PROFILE,
  payload: userData,
});
