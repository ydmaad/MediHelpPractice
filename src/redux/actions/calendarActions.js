import { CALENDAR_ACTIONS, MEDICINE_ACTIONS } from "../actionTypes";

// 일정 추가
export const addSchedule = (scheduleData) => ({
  type: CALENDAR_ACTIONS.ADD_SCHEDULE,
  payload: scheduleData,
});

// 일정 수정
export const updateSchedule = (scheduleData) => ({
  type: CALENDAR_ACTIONS.UPDATE_SCHEDULE,
  payloady: scheduleData,
});

// 일정 삭제
export const deleteSchedule = (scheduleId) => ({
  type: CALENDAR_ACTIONS.DELETE_SCHEDULE,
  payload: scheduleId,
});

// 알람 설정
export const setAlarm = (scheduleId, alarm) => ({
  type: CALENDAR_ACTIONS.SET_ALARM,
  payload: { scheduleId, alarm },
});

// 약 등록
export const addMedicine = (medicineData) => ({
  type: MEDICINE_ACTIONS.ADD_MEDICINE,
  payload: { medicineData },
});

// 약 삭제
export const deleteMedicine = (medicineId) => ({
  type: MEDICINE_ACTIONS.DELETE_MEDICINE,
  payload: medicineId,
});

// 사용자별 약 목록 불러오기
export const setMedicines = (medicines) => ({
  type: MEDICINE_ACTIONS.SET_MEDICINE,
  payload: medicines,
});
