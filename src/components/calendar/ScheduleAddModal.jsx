import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";
import ScheduleAddCard from "./ScheduleAddCard";
import PrimaryButton from "../common/button/PrimaryButton";

const ScheduleAddModal = ({ isOpen, onClose, onSubmit, selectedDate }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    date: selectedDate || new Date().toISOString().split("T")[0],
    timeOfDay: {
      아침: false,
      점심: false,
      저녁: false,
    },
    medicines: [
      { id: 1, time: "오전 12:00", name: "고혈압약", taken: false },
      { id: 2, time: "오전 12:00", name: "고혈압약", taken: true },
      { id: 3, time: "오전 12:00", name: "고혈압약", taken: true },
      { id: 4, time: "오전 12:00", name: "고혈압약", taken: false },
    ],
    note: "",
  });
  const { user } = useSelector((state) => state.auth);

  // 모달이 열려있지 않으면 렌더링하지 않음
  if (!isOpen) return null;

  // 복용 시간대 선택
  const handleTimeOfDaySelect = (time) => {
    setScheduleData((prev) => ({
      ...prev,
      timeOfDay: {
        ...prev.timeOfDay,
        [time]: !prev.timeOfDay[time],
      },
    }));
  };

  // 노트 변경
  const handleNoteChange = (e) => {
    setScheduleData((prev) => ({
      ...prev,
      note: e.target.value,
    }));
  };

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
          <input type="date" name="date" className="w-full " />
          <div>
            {Object.keys(scheduleData.timeOfDay).map((time) => {
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleTimeOfDaySelect(time)}
                  className={`w-9 h-9 rounded-full ${
                    scheduleData.timeOfDay[time]
                      ? "bg-primary/200 text-primary/800"
                      : "bg-white text-gray/400"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>

          <ScheduleAddCard isEditable={isEditMode} />

          <div className="text-gray/600 text-body-16">노트</div>
          <textarea
            name="note"
            value={scheduleData.note}
            onChange={handleNoteChange}
            placeholder="복약 후 몸 상태나 오늘 하루의 복약에 대한 한 마디"
            className="w-full h-32 bg-gray/50 p-5 focus:outline-none resize-none rounded-sm"
          ></textarea>
          <div className="flex items-center justify-center">
            <PrimaryButton style={"w-[107px] h-10"}>수정</PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleAddModal;
