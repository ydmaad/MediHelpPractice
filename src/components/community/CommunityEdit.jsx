import React, { useEffect, useState } from "react";
import CategoryButton from "../common/button/CategoryButton";
import SkyblueButton from "../common/button/SkyblueButton";
import PrimaryButton from "../common/button/PrimaryButton";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPostDetailAPI, updatePostAPI } from "../../api/community";

const CommunityEdit = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categoryList = ["메디톡", "궁금해요", "건강 꿀팁"];

  // 카테고리 선택
  const handleCategoryClick = (category) => {
    setFormData((prev) => ({
      ...prev,
      category,
    }));
  };

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 게시글 작성 취소 핸들러
  const handleCancel = () => {
    navigate(`/community/${postId}`);
  };

  // 수정할 데이터 초기 로딩
  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);
      try {
        const response = await getPostDetailAPI(postId);

        if (response.error) {
          setError(response.error);
          console.error(response.error);
          return;
        }

        setFormData({
          title: response.title,
          content: response.content,
          category: response.category,
        });
      } catch (error) {
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    loadPost();
  }, [postId, user?.uid, navigate]);

  // 게시글 수정 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    if (!formData.title) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!formData.content) {
      alert("내용을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { success, error: updateError } = await updatePostAPI(postId, {
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category,
      });

      if (!success) {
        setError(updateError || "게시글 수정 중 오류가 발생했습니다.");
        return;
      }

      navigate(`/community/${postId}`);
    } catch (error) {
      setError("게시글 수정 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>무슨 오류가 났지??:::::{error}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-header-24 text-gray/800">게시글 수정</h1>
      <div className="flex justify-start gap-2">
        {categoryList.map((category) => (
          <CategoryButton
            key={category}
            onClick={() => handleCategoryClick(category)}
            isSelected={formData.category === category}
            size="w-[100px] h-8"
          >
            {category}
          </CategoryButton>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          name="title"
          className="border-2 w-full rounded-lg px-5 py-2 text-header-16 focus:outline-none"
          placeholder="제목을 입력하세요. (최대 30자)"
          value={formData.title}
          onChange={handleChange}
          maxLength={30}
        />
        <textarea
          type="text"
          name="content"
          className="border-2 w-full rounded-lg px-5 py-5 h-[277px] focus:outline-none resize-none"
          placeholder={`궁금한 점이나 공유하고 싶은 내용을 작성해 보세요!
구체적인 제품명이나 이미지, 약 정보 등을 작성하면 더욱 구체적인 답변을 받을 수 있어요.`}
          value={formData.content}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="flex justify-center gap-5">
        <SkyblueButton size="w-[90px] h-[40px]" onClick={handleCancel}>
          취소
        </SkyblueButton>
        <PrimaryButton
          style="w-[90px] h-[40px] text-header-16"
          onClick={handleSubmit}
        >
          수정
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CommunityEdit;
