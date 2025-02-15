import React, { useState } from "react";
import CategoryButton from "../common/button/CategoryButton";
import GrayButton from "../common/button/GrayButton";
import SkyblueButton from "../common/button/SkyblueButton";

const CommunityWrite = () => {
  const [selectCategory, setSelectCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const categoryList = ["메디톡", "궁금해요", "건강 꿀팁"];

  const handleCategoryClick = (category) => {
    setSelectCategory(category);
    console.log("선택된 카테고리 명:", selectCategory);
  };
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-header-24 text-gray/800">커뮤니티 글쓰기</h1>
      <div className="flex justify-start gap-2">
        {categoryList.map((category) => (
          <CategoryButton
            key={category}
            onClick={() => handleCategoryClick(category)}
            isSelected={selectCategory === category}
            size="w-[100px] h-8"
          >
            {category}
          </CategoryButton>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          className="border-2 w-full rounded-lg px-5 py-2 text-header-16"
          placeholder="제목을 입력하세요 (최대 30자)"
        />
        <textarea
          type="text"
          className="border-2 w-full rounded-lg px-5 py-5 h-[277px]"
          placeholder={`궁금한 점이나 공유하고 싶은 내용을 작성해 보세요!
구체적인 제품명이나 이미지, 약 정보 등을 작성하면 더욱 구체적인 답변을 받을 수 있어요.`}
        ></textarea>
      </div>

      <div className="flex justify-center gap-5">
        <SkyblueButton size="w-[90px] h-[40px]">취소</SkyblueButton>
        <GrayButton size="w-[90px] h-[40px]">작성</GrayButton>
      </div>
    </div>
  );
};

export default CommunityWrite;
