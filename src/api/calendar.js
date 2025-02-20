import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// 스케쥴 생성
export const createScheduleAPI = async (scheduleData) => {
  try {
    const docRef = await addDoc(collection(db, "schedules"), {
      ...scheduleData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      id: docRef.id,
      error: null,
    };
  } catch (error) {
    console.error("일정 생성 오류", error);
    return {
      success: false,
      id: null,
      error: error.message,
    };
  }
};
