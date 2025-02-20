import React from "react";
import SectionTitle from "../components/common/SectionTitle";
import { Calendar } from "react-big-calendar";

const CalendarPage = () => {
  return (
    <div>
      <div>
        <SectionTitle emoji="✏️">복약 달력</SectionTitle>
      </div>
      <div>
        <Calendar></Calendar>
      </div>
    </div>
  );
};

export default CalendarPage;
