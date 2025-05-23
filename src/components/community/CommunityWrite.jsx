import React, { useState, useRef } from "react";
import CategoryButton from "../common/button/CategoryButton";
import SkyblueButton from "../common/button/SkyblueButton";
import { useSelector } from "react-redux";
import { createPostAPI } from "../../api/community";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../common/button/PrimaryButton";
import { TbCameraPlus } from "react-icons/tb";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebase/firebase";
import { IoClose } from "react-icons/io5";

const CommunityWrite = () => {
  const [selectCategory, setSelectCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);
  const categoryList = ["메디톡", "궁금해요", "건강 꿀팁"];
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const MAX_IMAGES = 3; // 최대 이미지 수

  // 카테고리 선택
  const handleCategoryClick = (category) => {
    setSelectCategory(category);
  };

  // 카메라 버튼 클릭시 파일 선택 창 열기
  const handleImageButtonClick = () => {
    fileInputRef.current.click();
  };

  // 파일 선택시 처리 로직
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // 최대 이미지 개수 검사
    if (imageFiles.length + files.length > MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}개까지 업로드 가능합니다.`);
      return;
    }

    // 각 파일 유효성 검사 및 추가
    const validFiles = [];
    const validPreviews = [];

    files.forEach((file) => {
      // 파일 크기 확인(50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert("50MB 이하의 이미지만 업로드 가능합니다.");
        return;
      }

      // 이미지 파일 타입 확인
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      validFiles.push(file);
      // 업로드 이미지 미리보기 설정
      const reader = new FileReader();
      reader.onload = () => {
        validPreviews.push({
          id: uuidv4(),
          url: reader.result,
          file: file,
        });

        // 모든 파일의 미리보기가 생성되었을 때 상태 업데이트
        if (validPreviews.length === validFiles.length) {
          setImageFiles((prev) => [...prev, ...validFiles]);
          setImagePreviews((prev) => [...prev, ...validPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    // 파일 입력 초기화(동일 파일 재선택 가능하도록)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 단일 이미지 제거
  const handleRemoveImage = (id) => {
    const previewToRemove = imagePreviews.find((preview) => preview.id === id);
    setImagePreviews((prev) => prev.filter((preview) => preview.id !== id));
    if (previewToRemove) {
      setImageFiles((prev) =>
        prev.filter((file) => file !== previewToRemove.file)
      );
    }
  };

  // 이미지 업로드 함수
  const uploadImages = async () => {
    if (!imageFiles.length) return [];

    try {
      const uploadPromises = imageFiles.map(async (file) => {
        // 파일명 생성
        const fileName = `${uuidv4()}-${file.name}`;
        const storageRef = ref(storage, `community_images/${fileName}`);

        // 이미지 업로드
        await uploadBytes(storageRef, file);

        // 이미지 URL 가져오기
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      });

      // 모든 이미지 업로드 완료 대기
      const imageUrls = await Promise.all(uploadPromises);
      return imageUrls;
    } catch (error) {
      console.error("이미지 업로드 실패 :", error);
      throw error;
    }
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
      // 이미지가 있으면 먼저 업로드
      let imageUrls = null;
      if (imageFiles) {
        imageUrls = await uploadImages();
      }

      const postData = {
        category: selectCategory,
        title: title.trim(),
        content: content.trim(),
        author: user.email,
        authorId: user.uid,
        images: imageUrls,
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
          placeholder="제목을 입력하세요 (최대 100자)"
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, 100))}
        />
        <div className="relative bg-white border-2 w-full rounded-lg">
          <button
            type="button"
            className="flex justify-start text-gray/600 px-6 pt-5"
            onClick={handleImageButtonClick}
          >
            <TbCameraPlus size={24} />
            <span className="pl-2">
              이미지 추가 (최대 {MAX_IMAGES}개, 각 최대 50MB)
            </span>
          </button>
          {/* 이미지 미리보기 영역 */}
          {imagePreviews.map((preview) => (
            <div key={preview.id} className="m-4 relative">
              <img
                src={preview.url}
                alt="미리보기"
                className="max-h-52 rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(preview.id)}
                className="absolute top-2 left-2 text-white shadow"
              >
                <IoClose size={24} />
              </button>
            </div>
          ))}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
            multiple
          />
          <textarea
            type="text"
            className="w-full px-5 py-5 h-[277px] focus:outline-none resize-none"
            placeholder={`궁금한 점이나 공유하고 싶은 내용을 작성해 보세요!
구체적인 제품명이나 이미지, 약 정보 등을 작성하면 더욱 구체적인 답변을 받을 수 있어요.`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* 로딩 상태 표시 */}
      {isLoading && (
        <div className="text-center py-2">
          <p>처리 중입니다...</p>
        </div>
      )}

      {/* 에러 메시지 표시 */}
      {error && (
        <div className="text-danger py-2">
          <p>{error}</p>
        </div>
      )}

      <div className="flex justify-center gap-5">
        <SkyblueButton size="w-[90px] h-[40px]" onClick={handleCancel}>
          취소
        </SkyblueButton>
        <PrimaryButton
          style="w-[90px] h-[40px] text-header-16"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          작성
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CommunityWrite;
