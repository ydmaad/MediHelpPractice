import React, { useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import PrimaryButton from "../common/button/PrimaryButton";
import ToggleSwitch from "../common/ToggleSwitch";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import "../../styles/calendar-custom.css";
import { addMedicineAPI } from "../../api/medicine";
import { useDispatch, useSelector } from "react-redux";
import { addMedicine } from "../../redux/actions/calendarActions";

const MedicineAddModal = ({ isOpen, onClose, onSubmit }) => {
  const selectRef = useRef(null);
  const [medicineData, setMedicineData] = useState({
    title: "",
    medicineName: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    timeOfDay: {
      아침: false,
      점심: false,
      저녁: false,
    },
    alarm: {
      enabled: false,
      weekDays: {
        월: false,
        화: false,
        수: false,
        목: false,
        금: false,
        토: false,
        일: false,
      },
      time: {
        ampm: "오전",
        hour: "01",
        minute: "00",
      },
    },
    memo: "",
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  if (!isOpen) return null;

  // 알람 설정 토글
  const handleAlarmToggle = () => {
    setMedicineData((prev) => ({
      ...prev,
      alarm: {
        ...prev.alarm,
        enabled: !prev.alarm.enabled,
      },
    }));
  };

  // 폼데이터 입력값 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicineData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 아침, 점심, 저녁 선택 토글
  const handleTiemOfDayToggle = (time) => {
    setMedicineData((prev) => ({
      ...prev,
      timeOfDay: {
        ...prev.timeOfDay,
        [time]: !prev.timeOfDay[time],
      },
    }));
  };

  // 알람 시간값 변경
  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setMedicineData((prev) => ({
      ...prev,
      alarm: {
        ...prev.alarm,
        time: {
          ...prev.alarm.time,
          [name]: value,
        },
      },
    }));
  };

  // 요일값 변경
  const handleWeekDayChange = (day) => {
    setMedicineData((prev) => ({
      ...prev,
      alarm: {
        ...prev.alarm,
        weekDays: {
          ...prev.alarm.weekDays,
          [day]: !prev.alarm.weekDays[day],
        },
      },
    }));
  };

  // 약 등록 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(medicineData), onClose();

    try {
      const { success, id, error } = await addMedicineAPI(
        medicineData,
        user.uid
      );

      if (success) {
        dispatch(addMedicine({ ...medicineData, id, userId: user.uid }));
        alert("약이 성공적으로 등록되었습니다.");
        onClose();
      } else {
        alert(`약 등록 실패: ${error}`);
      }
    } catch (error) {
      alert(`오류가 발생했습니다: ${error.message}`);
    }
  };

  // 시간 범위
  const hourOption = [];
  for (let i = 0; i < 13; i++) {
    hourOption.push(i.toString().padStart(2, "0"));
  }

  // 분 범위
  const minuteOption = [];
  for (let i = 0; i < 60; i += 5) {
    minuteOption.push(i.toString().padStart(2, "0"));
  }

  const amPmOption = ["오전", "오후"];

  // 커밋 테스트

  return (
    <div
      className=" bg-gray-800 bg-opacity-50 flex items-center justify-center fixed inset-0 z-50"
      onClick={onClose}
    >
      <div
        className={`w-[432px] ${
          medicineData.alarm.enabled ? "h-[696px]" : "h-[590px]"
        } h-[696px] bg-white overflow-y-auto rounded-lg p-6`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 영역 */}
        <div className="flex justify-between mb-4">
          <h2 className="text-header-16 text-gray/800">나의 약 등록</h2>
          <button onClick={onClose}>
            <CgClose />
          </button>
        </div>

        <div className="mb-5">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="title"
              value={medicineData.title}
              onChange={handleChange}
              placeholder="ex) 피부과약"
              className="border border-gray/200 rounded-sm text-body-16 text-gray/1000 px-4 py-2 focus:outline-none"
            />
            <input
              type="text"
              name="medicineName"
              value={medicineData.medicineName}
              onChange={handleChange}
              placeholder="ex) 이소티논"
              className="border border-gray/200 rounded-sm text-body-16 text-gray/1000 px-4 py-2 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <h2 className="text-gray/600 text-body-14">복용 일자</h2>

          <div className="flex gap-2">
            {Object.keys(medicineData.timeOfDay).map((time) => {
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleTiemOfDayToggle(time)}
                  className={`w-[122px] h-8 rounded-full ${
                    medicineData.timeOfDay[time]
                      ? "bg-primary/500 text-white"
                      : "bg-gray/50 text-gray-800"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-5">
          <input
            type="date"
            name="startDate"
            value={medicineData.startDate}
            onChange={handleChange}
            className="w-[134px] h-10 border text-gray/600 border-gray/200 rounded-sm px-2"
          />
          <span>부터</span>
          <input
            type="date"
            name="endDate"
            value={medicineData.endDate}
            onChange={handleChange}
            className="w-[134px] h-10 border text-gray/600 border-gray/200 rounded-sm px-2"
          />
          <span>까지</span>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <div className="flex flex-row items-center gap-2">
              <h2 className="text-body-14 text-gray/600">알림 설정</h2>
              <ToggleSwitch
                isOn={medicineData.alarm.enabled}
                handleToggle={handleAlarmToggle}
              ></ToggleSwitch>
            </div>
            {medicineData.alarm.enabled && (
              <button className="text-body-14 text-primary/500">추가</button>
            )}
          </div>
          {medicineData.alarm.enabled && (
            <>
              <div className="flex gap-4">
                {Object.keys(medicineData.alarm.weekDays).map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleWeekDayChange(day)}
                    className={`w-10 h-10 rounded-full mb-4 ${
                      medicineData.weekDays[day]
                        ? "bg-primary/500 text-white"
                        : "bg-gray/50 text-gray-800"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-8 ">
                <div className="flex items-center gap-1 ">
                  <select
                    ref={selectRef}
                    name="ampm"
                    value={medicineData.alarm.time.ampm}
                    onChange={handleTimeChange}
                    className="focus:outline-none text-gray/1000 text-body-16 appearance-none ml-3"
                  >
                    {amPmOption.map((ampm) => (
                      <option key={ampm} value={ampm}>
                        {ampm}
                      </option>
                    ))}
                  </select>
                  <div
                    className="cursor-pointer"
                    onChange={() => selectRef.current?.click()}
                  >
                    <IoIosArrowDown size={18} color="#7C7F86" />
                  </div>
                </div>

                <div>
                  <select
                    name="hour"
                    value={medicineData.alarm.time.hour}
                    onChange={handleTimeChange}
                    className="focus:outline-none appearance-none text-gray/600 text-body-16 border border-gray/200 py-2 px-10 rounded-sm"
                  >
                    {hourOption.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                  <span className="p-2">:</span>
                  <select
                    name="minute"
                    value={medicineData.alarm.time.minute}
                    onChange={handleTimeChange}
                    className="focus:outline-none appearance-none text-gray/600 text-body-16 border border-gray/200 py-2 px-10 rounded-sm"
                  >
                    {minuteOption.map((minute) => (
                      <option key={minute} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                </div>

                <IoCloseOutline size={30} />
              </div>
            </>
          )}
        </div>
        <div className="gap-2 mt-5">
          <h2>메모</h2>
          <textarea
            name="memo"
            value={medicineData.memo}
            onChange={handleChange}
            placeholder="약에 대한 간단한 기록"
            className="w-full h-20 p-2 focus:outline-none resize-none border border-gray/200 rounded-sm"
          ></textarea>
        </div>
        <div className="flex justify-center mt-10">
          <PrimaryButton
            style="w-[104px] h-10 text-header-16"
            onClick={handleSubmit}
          >
            저장
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default MedicineAddModal;
