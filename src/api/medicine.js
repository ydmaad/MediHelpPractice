import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
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

// 사용자별 복용약 불러오기 API
export const getUserMedicinesAPI = async (userId) => {
  try {
    const q = query(collection(db, "medicines"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const medicines = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createAt?.doDate?.() || null,
      updatedAt: doc.data().updateAt?.toDate?.() || null,
    }));

    return {
      success: true,
      medicines,
      error: null,
    };
  } catch (error) {
    console.error("약 목록 조회 오류:::::", error);
    return {
      success: false,
      medicines: [],
      error: error.message,
    };
  }
};
