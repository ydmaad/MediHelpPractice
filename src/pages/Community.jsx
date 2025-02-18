import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommunityCard from "../components/common/CommunityCard";
import Button from "../components/common/button/PrimaryButton";
import 약이미지 from "../assets/약이미지.jpg";
import SectionTitle from "../components/common/SectionTitle";
import SearchBar from "../components/common/SearchBar";
import { useNavigate } from "react-router-dom";
import { getPostAPI } from "../api/community";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPosts, setLastPosts] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    console.log("검색어:", searchTerm);
  };

  // 글쓰기 페이지로 이동
  const handleWriteClick = () => {
    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/auth/login");
      return;
    }
    navigate("/community/write");
  };

  // 게시글 상세 페이지로 이동
  const handlePostClick = (id) => {
    navigate(`/community/${id}`);
  };

  // 게시글 불러오기
  const fetchPosts = async (isInitial = false) => {
    if (isLoading || (!hasMore && !isInitial)) return;

    setIsLoading(true);

    try {
      const {
        posts: newPosts,
        lastPosts: newLastPosts,
        error,
      } = await getPostAPI(isInitial ? null : lastPosts);

      if (error) {
        setError(error);
        console.error("게시글을 불러오는 중 오류가 발생했습니다.", error);
        return;
      }

      if (isInitial) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }

      setLastPosts(newLastPosts);
      setHasMore(newPosts.length === 10);
    } catch (error) {
      setError("게시글을 불러오는 중 오류가 발생했습니다.", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 게시글 조회
  useEffect(() => {
    fetchPosts(true);
  }, []);

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
            time={post.createdAt}
            commentCount={post.commentCount}
            image={post.image}
            category={post.category}
            likeCount={post.likeCount}
            onClick={() => handlePostClick(post.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Community;
