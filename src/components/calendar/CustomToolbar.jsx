import {
  addMonths, // 날짜 조작 - 다음 달로 이동
  format, // 날짜 포맷팅
  subMonths, // 날짜 조작 - 이전 달로 이동
} from "date-fns";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SkyblueButton from "../common/button/SkyblueButton";
import PrimaryButton from "../common/button/PrimaryButton";

// 커스텀 캘린더 툴바 컴포넌트
const CustomToolbar = ({
  currentDate,
  setCurrentDate,
  onAddMedicine,
  onAddSchedule,
}) => {
  const year = format(currentDate, "yyyy"); // 년도 추출
  const month = format(currentDate, "MM"); // 월 추출
  // 다음 달 이동 함수
  const navigateToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // 이전 달 이동 함수
  const navigateToPrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  return (
    <div className="my-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button type="button" onClick={navigateToPrevMonth}>
            <IoIosArrowBack size={20} className="text-gray/600" />
          </button>
          <span className="text-header-18 text-gray/800 mx-2">
            {year}년 {month}월
          </span>
          <button type="button" onClick={navigateToNextMonth}>
            <IoIosArrowForward size={20} className="text-gray/600" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <SkyblueButton
            onClick={onAddMedicine}
            size={"px-6 py-2 w-[100px] h-[32px] text-body-14"}
          >
            약 등록
          </SkyblueButton>
          <PrimaryButton
            style={"w-[100px] h-[32px] text-body-14 px-6 py-2"}
            onClick={onAddSchedule}
          >
            기록 추가
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default CustomToolbar;
