import React, { useEffect, useRef, useState } from "react";
import CategoryButton from "../common/button/CategoryButton";
import SkyblueButton from "../common/button/SkyblueButton";
import PrimaryButton from "../common/button/PrimaryButton";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPostDetailAPI, updatePostAPI } from "../../api/community";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { TbCameraPlus } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

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
  const [imageFiles, setImageFiles] = useState([]); // 새로 업로드할 이미지 파일
  const [imagePreviews, setImagePreviews] = useState([]); // 이미지 미리보기
  const [existingImages, setExistingImages] = useState([]); // 기존 업로드된 이미지
  const fileInputRef = useRef(null);
  const MAX_IMAGES = 3;

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

  // 카메라 버튼 클릭시 파일 선택 창 열기
  const handleImageButtonClick = () => {
    fileInputRef.current.click();
  };

  // 파일 선택시 처리 로직
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // 최대 이미지 갯수 검사(기존 이미지 + 새 이미지)
    const totalImagesCount =
      existingImages.length + imageFiles.length + files.length;
    if (totalImagesCount > MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}개까지 업로드 가능합니다.`);
      return;
    }

    // 각 파일 유효성 검사 및 추가
    const validFiles = [];
    const validPreviews = [];

    files.forEach((file) => {
      if (file.size > 50 * 1024 * 1024) {
        alert(`50MB 이하의 이미지만 업로드 가능합니다.`);
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      validFiles.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        validPreviews.push({
          id: uuidv4(),
          url: reader.result,
          file: file,
        });

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

  // 새 이미지 제거
  const handleRemoveNewImage = (id) => {
    const previewToRemove = imagePreviews.find((preview) => preview.id === id);
    setImagePreviews((prev) => prev.filter((preview) => preview.id !== id));
    if (previewToRemove) {
      setImageFiles((prev) =>
        prev.filter((file) => file !== previewToRemove.file)
      );
    }
  };

  // 기존 이미지 제거
  const handleRemoveExistingImage = (url) => {
    setExistingImages((prev) => prev.filter((imageUrl) => imageUrl !== url));
  };

  // 이미지 업로드 함수
  const uploadImages = async () => {
    if (!imageFiles.length) return [];

    try {
      const uploadPromises = imageFiles.map(async (file) => {
        // 파일 생성
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
      console.error("이미지 업로드 실패:::", error);
      throw error;
    }
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
        console.log(response);
        setFormData({
          title: response.title,
          content: response.content,
          category: response.category,
        });

        // 기존 이미지가 있으면 설정
        if (response.images && response.images.length > 0) {
          setExistingImages(response.images);
        }
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
      // 새 이미지 업로드
      let newImageUrls = [];
      if (imageFiles.length > 0) {
        newImageUrls = await uploadImages();
      }

      // 기존 이미지 URL과 새 이미지 URL 합치기
      const updatedImageUrls = [...existingImages, ...newImageUrls];

      const { success, error: updateError } = await updatePostAPI(postId, {
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category,
        images: updatedImageUrls,
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
          {/* 기존 이미지 미리보기 영역 */}
          {existingImages.map((imageUrl, index) => (
            <div key={`existing-${index}`} className="m-4 relative">
              <img
                src={imageUrl}
                alt="미리보기"
                className="max-h-52 rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveExistingImage(imageUrl)}
                className="absolute top-2 left-2 text-white shadow"
              >
                <IoClose size={24} />
              </button>
            </div>
          ))}
          {/* 새 이미지 미리보기 영역 */}
          {imagePreviews.map((preview) => (
            <div key={preview.id} className="m-4 relative">
              <img
                src={preview.url}
                alt="미리보기"
                className="max-h-52 rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveNewImage(preview.id)}
                className="absolute top-2 left-2 text-white shadow bg-black bg-opacity-50 rounded-full p-1"
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
            name="content"
            className="w-full px-5 py-5 h-[277px] focus:outline-none resize-none"
            placeholder={`궁금한 점이나 공유하고 싶은 내용을 작성해 보세요!
구체적인 제품명이나 이미지, 약 정보 등을 작성하면 더욱 구체적인 답변을 받을 수 있어요.`}
            value={formData.content}
            onChange={handleChange}
          ></textarea>
        </div>
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
