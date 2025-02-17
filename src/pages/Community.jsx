import React, { useState } from "react";
import { useSelector } from "react-redux";
import CommunityCard from "../components/common/CommunityCard";
import Button from "../components/common/button/PrimaryButton";
import 약이미지 from "../assets/약이미지.jpg";
import SectionTitle from "../components/common/SectionTitle";
import SearchBar from "../components/common/SearchBar";
import { useNavigate } from "react-router-dom";

const Community = () => {
  // const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    console.log("검색어:", searchTerm);
  };

  const handleWriteClick = () => {
    navigate("/community/write");
  };

  const posts = [
    {
      id: 1,
      title:
        "정수리 탈모로 이 약 먹어보신 분 계신가요? 저는 이런 저런 약을 먹고 있습니다!!",
      content: "요즘 정수리 쪽이 점점 비는 것 같아서 복용 중입니다...",
      author: "용감한사자",
      time: "2025년 2월 12일",
      commentCount: 37,
      likeCount: 14,
      image: 약이미지,
      category: "궁금해요",
    },
    {
      id: 2,
      title: "정수리 탈모로 이 약 먹어보신 분 계신가요?",
      content:
        "요즘 정수리 쪽이 점점 비는 것 같아서 복용 중입니다... 어떤약을 먹는게 좋을까요?? 추천 좀 부탁드릴게요!!!",
      author: "용감한사자",
      time: "2025년 2월 12일",
      commentCount: 37,
      likeCount: 14,
      category: "궁금해요",
    },
    {
      id: 3,
      title: "정수리 탈모로 이 약 먹어보신 분 계신가요?",
      content: "요즘 정수리 쪽이 점점 비는 것 같아서 복용 중입니다...",
      author: "용감한사자",
      time: "2025년 2월 12일",
      commentCount: 37,
      likeCount: 14,
      image: "/path/to/image.jpg",
      category: "궁금해요",
    },
  ];
  return (
    <div>
      <div className="flex justify-between">
        <SectionTitle emoji="💬" subtitle="약에 대한 이야기를 나누어 보아요.">
          커뮤니티
        </SectionTitle>
        <div className="flex justify-between">
          <SearchBar
            placeholder="글 제목 및 내용, 작성자 등을 검색"
            onSearch={handleSearch}
            size="w-[300px] h-10 mr-6"
          />
          <Button
            variant="primary"
            size="w-[106px] h-10"
            onClick={handleWriteClick}
          >
            글쓰기
          </Button>
        </div>
      </div>

      <div>
        {posts.map((post) => (
          <CommunityCard
            key={post.id}
            title={post.title}
            content={post.content}
            author={post.author}
            time={post.time}
            commentCount={post.commentCount}
            image={post.image}
            category={post.category}
            likeCount={post.likeCount}
            onClick={() => console.log("카드 클릭:", post.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Community;
