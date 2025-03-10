import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import ToggleSwitch from "../common/ToggleSwitch";
import { CgClose } from "react-icons/cg";

const ScheduleAddModal = ({ isOpen, onClose, onSubmit }) => {
  return (
    <>
      <div
        className=" bg-gray-800 bg-opacity-50 flex items-center justify-center fixed inset-0 z-50"
        onClick={onClose}
      >
        <div
          className={`w-[416px] 
         h-[579px] bg-white overflow-y-auto rounded-lg p-6`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between mb-4">
            <h2 className="text-header-16 text-gray/800">하루 약 기록</h2>
            <button onClick={onClose}>
              <CgClose />
            </button>
          </div>
          <input type="date" name="date" />
        </div>
      </div>
    </>
  );
};

export default ScheduleAddModal;
