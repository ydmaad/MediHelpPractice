import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import PrimaryButton from "../common/button/PrimaryButton";
import ToggleSwitch from "../common/ToggleSwitch";

const MedicineAddModal = ({ isOpen, onClose, onSubmit }) => {
  const [alarmSet, setAlarmSet] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    medicineName: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    timeOfDay: {
      아침: false,
      점심: false,
      저녁: false,
    },
    weekDays: {
      월: false,
      화: false,
      수: false,
      목: false,
      금: false,
      토: false,
      일: false,
    },
    tiem: {
      hour: "01",
      minute: "00",
    },
    memo: "",
  });

  if (!isOpen) return null;

  const handleAlarmToggle = () => {
    setAlarmSet(!alarmSet);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTiemOfDayToggle = (time) => {
    setFormData((prev) => ({
      ...prev,
      timeOfDay: {
        ...prev.timeOfDay,
        [time]: !prev.timeOfDay[time],
      },
    }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      tiem: {
        ...prev.time,
        [name]: value,
      },
    }));
  };

  const handleWeekDayChange = (day) => {
    setFormData((prev) => ({
      ...prev,
      weekDays: {
        ...prev.weekDays,
        [day]: !prev.weekDays[day],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData), onClose();
  };

  return (
    <div className=" bg-gray-800 bg-opacity-50 flex items-center justify-center fixed inset-0 z-50  ">
      <div className="w-[432px] h-[696px] bg-white overflow-y-auto rounded-lg p-6">
        <div className="flex justify-between">
          <h2 className="text-header-16 text-gray/800">나의 약 등록</h2>
          <CgClose />
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="ex) 피부과약"
              className="border border-gray/200 rounded-sm"
            />
            <input
              type="text"
              name="medicineName"
              value={formData.medicineName}
              onChange={handleChange}
              placeholder="ex) 이소티논"
              className="border border-gray/200 rounded-sm"
            />
          </div>
        </div>

        <div className="flex flex-col gap-">
          <h2>복용 일자</h2>

          <div className="flex gap-2">
            {Object.keys(formData.timeOfDay).map((time) => {
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleTiemOfDayToggle(time)}
                  className={`w-[122px] h-8 rounded-full ${
                    formData.timeOfDay[time]
                      ? "bg-primary/500 text-white"
                      : "bg-gray/200 text-gray-700"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-[134px] h-10 border border-gray/200 rounded-sm"
          />
          <span>부터</span>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-[134px] h-10 border border-gray/200 rounded-sm"
          />
          <span>까지</span>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex flex-row items-center gap-2">
              <h2 className="text-body-14 text-gray/600">알림 설정</h2>
              <ToggleSwitch
                isOn={alarmSet}
                handleToggle={handleAlarmToggle}
              ></ToggleSwitch>
            </div>
            {alarmSet && (
              <button className="text-body-14 text-primary/500">추가</button>
            )}
          </div>
          {alarmSet && (
            <>
              <div className="flex gap-4">
                {Object.keys(formData.weekDays).map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleWeekDayChange(day)}
                    className={`w-10 h-10 rounded-full ${
                      formData.weekDays[day]
                        ? "bg-primary/500 text-white"
                        : "bg-gray/200 text-gray-700"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <div>TODO: 여기에 알림 시간 설정 UI!!</div>
            </>
          )}
        </div>
        <div className="gap-2">
          <h2>메모</h2>
          <textarea
            name="memo"
            value={formData.memo}
            onChange={handleChange}
            placeholder="약에 대한 간단한 기록"
            className="w-full h-20 p-2 focus:outline-none resize-none border border-gray/200 rounded-sm"
          ></textarea>
        </div>
        <PrimaryButton size="w-[104px] h-10" onClick={handleSubmit}>
          저장
        </PrimaryButton>
      </div>
    </div>
  );
};

export default MedicineAddModal;
