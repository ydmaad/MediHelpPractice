import React from "react";

const ScheduleAddCard = ({ isEditable }) => {
  return (
    <>
      <div className="w-48 h-14 bg-gray/50 rounded-md flex items-center p-3">
        <img src="/pill.svg" alt="약 이미지" width={24} height={24} />
        <div className="ml-2">
          <div className="flex justify-between items-center">
            <div className="text-gray/600">점심</div>
            <div className="text-primary/500 ml-1">오후 12:00</div>
          </div>
          <div className="text-gray/1000">약 이름</div>
        </div>
      </div>
    </>
  );
};

export default ScheduleAddCard;
