import React from "react";
import { RxDividerVertical } from "react-icons/rx";

const CommunityCard = ({
  category,
  title,
  commentCount,
  content,
  author,
  time,
  likeCount,
  images,
  onClick,
}) => {
  const thumbnailImage = images && images.length > 0 ? images[0] : null;

  return (
    <div
      className="bg-white hover:cursor-pointer hovor:bg-gray/100 transition-colors mt-5  rounded-2xl"
      onClick={onClick}
    >
      <div className="flex justify-between items-center p-5 h-40 ">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="text-gray/400 text-body-14">{category}</div>
            <div className="flex items-center">
              <div className="text-gray/1000 text-header-18 pb-1 pt-2">
                {title}
              </div>
              {commentCount > 0 && (
                <div className="text-[#F66555] text-header-18 ml-1">
                  ({commentCount})
                </div>
              )}
            </div>
            <div className="text-gray/800 text-body-14 line-clamp-2">
              {content}
            </div>
          </div>

          <div className="flex items-center">
            <div className="text-gray/600 text-body-14">{author}</div>
            <RxDividerVertical className="text-gray/600" />
            <div className="text-gray/600 text-body-14">{time}</div>
            <RxDividerVertical className="text-gray/600" />
            <div className="text-gray/600 text-body-14">저장 {likeCount}</div>
          </div>
        </div>
        {thumbnailImage && (
          <div className="w-32 h-32 flex-shrink-0 ">
            <img
              src={thumbnailImage}
              alt="대표이미지"
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                console.log("왜 오류??????", thumbnailImage);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityCard;
