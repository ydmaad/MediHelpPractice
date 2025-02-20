import { CALENDAR_ACTIONS } from "../actionTypes";

// 초기 상태 설정
const initialCalendarState = {
  schedules: [],
  selectedDate: new Date(),
  isLoading: false,
  error: null,
};

// 캘린더 리듀서
export const calendarReducer = (state = initialCalendarState, action) => {
  switch (action.type) {
    // 일정 추가
    case CALENDAR_ACTIONS.ADD_SCHEDULE:
      return {
        ...state,
        schedules: [...state.schedules, action.payload],
        error: null,
      };

    // 일정 수정
    case CALENDAR_ACTIONS.UPDATE_SCHEDULE:
      return {
        ...state,
        schedules: state.schedules.map((schedule) =>
          schedule.id === action.payload.id
            ? { ...schedule, ...action.payload }
            : schedule
        ),
        error: null,
      };

    // 일정 삭제
    case CALENDAR_ACTIONS.DELETE_SCHEDULE:
      return {
        ...state,
        schedules: state.schedules.map((schedule) =>
          schedule.id === action.payload.scheduleId
            ? { ...schedule, alarm: action.payload.alarm }
            : schedule
        ),
        error: null,
      };

    // 알람 설정
    case CALENDAR_ACTIONS.SET_ALARM:
      return {
        ...state,
        schedules: state.schedules.map((schedule) =>
          schedule.id === action.payload.scheduleId
            ? { ...schedule, alarm: action.payload.alarm }
            : schedule
        ),
        error: null,
      };

    default:
      return state;
  }
};
