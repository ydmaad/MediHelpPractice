import React, { useState } from "react";
import SectionTitle from "../components/common/SectionTitle";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format, // 날짜 포맷팅
  getDay, // 요일 가져오기
  parse, // 문자열 날짜 파싱
  startOfWeek, // 주의 시작일 가져오기
} from "date-fns";
import { ko } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css"; // 캘린더 css
import MedicineAddModal from "../components/calendar/MedicineAddModal";
import ScheduleAddModal from "../components/calendar/ScheduleAddModal";
import CustomToolbar from "../components/calendar/CustomToolbar";

// 지역화 설정(한국어)
const locales = {
  ko: ko,
};

// react-big-calendar 지역화 도구 초기화
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [isMedicineModalOpen, setIsMedicineModalOpen] = useState(false); // 약 등록 모달 열림 상태
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false); // 일정 추가 모달 열림 상태
  // 선택된 날짜
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  // 이벤트 샘플 데이터
  const [events, setEvents] = useState([
    {
      title: "타이레놀 복용",
      start: new Date(2025, 3, 20, 10, 0),
      end: new Date(2025, 3, 21, 10, 0),
      medType: "해열제",
    },
  ]);
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 표시 중인 달력 날짜

  // 모달에서 폼 제출 처리
  const handleSubmit = (data) => {
    console.log("제출된 데이터", data);
  };

  // 날짜 선택 처리(미사용)
  const handleDateSelect = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  // 약 등록 버튼 클릭(모달 열림)
  const handleAddMedicineClick = () => {
    setIsMedicineModalOpen(true);
  };

  // 기록 추가 커튼 클릭(모달 열림)
  const handleAddScheduleClick = () => {
    setIsScheduleModalOpen(true);
  };

  const formats = {
    dateFormat: "dd", // 달력 셀 안에 날짜 숫자만 표시됨
    monthHeaderFormat: (date) =>
      `${format(date, "yyyy")}년 ${format(date, "MM")}월`, // 달력 상단에 표시되는 년/월 형식
  };

  // 커스텀 툴바를 위한 props 함수
  const customToolbar = () => (
    <CustomToolbar
      currentDate={currentDate}
      setCurrentDate={setCurrentDate}
      onAddMedicine={handleAddMedicineClick}
      onAddSchedule={handleAddScheduleClick}
    />
  );

  return (
    <div>
      {/* 약 추가 모달 */}
      <MedicineAddModal
        isOpen={isMedicineModalOpen}
        onClose={() => setIsMedicineModalOpen(false)}
        onSubmit={handleSubmit}
      />
      {/* 기록 추가 모달 */}
      <ScheduleAddModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSubmit={handleSubmit}
        selectedDate={selectedDate}
      />
      <div>
        {/* 타이틀 */}
        <SectionTitle emoji="✏️">복약 달력</SectionTitle>
      </div>

      <div>
        {/* 캘린더 컴포넌트 */}
        <Calendar
          localizer={localizer}
          culture="ko"
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          defaultView="month"
          views={["month"]}
          formats={formats}
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          components={{ toolbar: customToolbar }}
          messages={{
            next: "다음",
            previous: "이전",
            today: "오늘",
            date: "날짜",
            time: "시간",
            event: "일정",
          }}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
