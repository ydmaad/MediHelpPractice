import React, { useState } from "react";
import CategoryButton from "../common/button/CategoryButton";
import SkyblueButton from "../common/button/SkyblueButton";
import { useSelector } from "react-redux";
import { createPostAPI } from "../../api/community";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../common/button/PrimaryButton";

const CommunityWrite = () => {
  const [selectCategory, setSelectCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const categoryList = ["메디톡", "궁금해요", "건강 꿀팁"];
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // 카테고리 선택
  const handleCategoryClick = (category) => {
    setSelectCategory(category);
  };

  // 게시글 작성 제출 핸들러
  const handleSubmit = async () => {
    if (!selectCategory) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const postData = {
        category: selectCategory,
        title: title.trim(),
        content: content.trim(),
        author: user.email,
        authorId: user.uid,
      };

      const { success, error } = await createPostAPI(postData);

      if (success) {
        navigate("/community");
      } else {
        setError(error || "게시글 작성에 실패했습니다.");
      }
    } catch (error) {
      setError("게시글 작성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 게시글 작성 취소 핸들러
  const handleCancel = () => {
    navigate("/community");
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
          className="border-2 w-full rounded-lg px-5 py-2 text-header-16 focus:outline-none"
          placeholder="제목을 입력하세요 (최대 30자)"
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, 30))}
        />
        <textarea
          type="text"
          className="border-2 w-full rounded-lg px-5 py-5 h-[277px] focus:outline-none resize-none"
          placeholder={`궁금한 점이나 공유하고 싶은 내용을 작성해 보세요!
구체적인 제품명이나 이미지, 약 정보 등을 작성하면 더욱 구체적인 답변을 받을 수 있어요.`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      <div className="flex justify-center gap-5">
        <SkyblueButton size="w-[90px] h-[40px]" onClick={handleCancel}>
          취소
        </SkyblueButton>
        <PrimaryButton size="w-[90px] h-[40px]" onClick={handleSubmit}>
          작성
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CommunityWrite;
