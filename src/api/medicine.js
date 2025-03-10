import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

// 약 등록 API
export const addMedicineAPI = async (medicineData, userId) => {
  try {
    const docRef = await addDoc(collection(db, "medicines"), {
      ...medicineData,
      userId,
      createAt: serverTimestamp(),
      updateAt: serverTimestamp(),
    });

    return {
      success: true,
      id: docRef.id,
      error: null,
    };
  } catch (error) {
    console.error("약 등록 오류:", error);
    return {
      success: false,
      id: null,
      error: error.message,
    };
  }
};

// 약 삭제 API
export const deleteMedicineAPI = async (medicineId) => {
  try {
    const medicineRef = doc(db, "medicines", medicineId);
    await deleteDoc(medicineRef);

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("약 삭제 오류:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
