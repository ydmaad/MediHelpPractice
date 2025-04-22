import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMedicines } from "../../redux/actions/calendarActions";
import { getUserMedicinesAPI } from "../../api/medicine";

const MedicineFilter = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const medicineList = useSelector((state) => state.medicine?.medicines || []);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMedicines = async () => {
      if (!user || !user.uid) return;

      try {
        const response = await getUserMedicinesAPI(user.uid);
        if (response.success) {
          dispatch(setMedicines(response.medicines));
        }
      } catch (error) {
        console.error("약 목록 로드 오류:::", error);
      }
    };
    fetchMedicines();
  }, [user, dispatch]);

  return (
    <div className="py-8">
      <div className="text-gray/600 py-2 px-4">복용 약 필터</div>
    </div>
  );
};

export default MedicineFilter;
