import React, { useState } from "react";
import SectionTitle from "../components/common/SectionTitle";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { ko } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PrimaryButton from "../components/common/button/PrimaryButton";
import MedicineAddModal from "../components/calendar/MedicineAddModal";
import SkyblueButton from "../components/common/button/SkyblueButton";
import ScheduleAddModal from "../components/calendar/ScheduleAddModal";

const locales = {
  ko: ko,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

const CalendarPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      title: "타이레놀 복용",
      start: new Date(2025, 1, 20, 10, 0),
      end: new Date(2025, 1, 21, 10, 0),
      medType: "해열제",
    },
  ]);

  const handleSubmit = (data) => {
    console.log("제출된 데이터", data);
  };

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("복용할 약 이름을 입력하세요.");
    if (title) {
      setEvents([
        ...events,
        {
          start,
          end,
          title,
        },
      ]);
    }
  };

  const handleAddMedicineClick = () => {
    setIsOpen(true);
  };

  const formats = {
    dateFormat: "dd",
    dayFormat: (date, culture, localizer) => dayNames(date.getDay()),
    monthHeaderFormat: (date, culture, localizer) =>
      `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}월`,
  };

  return (
    <div>
      <MedicineAddModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
      <ScheduleAddModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
      <div>
        <SectionTitle emoji="✏️">복약 달력</SectionTitle>
      </div>
      <SkyblueButton
        onClick={handleAddMedicineClick}
        size={"px-6 py-2 w-[100px] h-[32px] text-body-14"}
      >
        약 등록
      </SkyblueButton>
      <PrimaryButton style={"w-[100px] h-[32px] text-body-14 px-6 py-2"}>
        기록 추가
      </PrimaryButton>
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleSelectSlot}
          selectable
          style={{ height: 600 }}
          defaultView="month"
          views={["month"]}
          formats={formats}
          messages={{
            next: "다음",
            previous: "이전",
            today: "오늘",
            date: "날짜",
            time: "시간",
            event: "일정",
            noEventsInRange: "이 기간에 일정이 없습니다.",
          }}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
