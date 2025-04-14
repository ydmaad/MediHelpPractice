import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePostAPI, getPostDetailAPI } from "../../api/community";
import TextButton from "../common/TextButton";

const CommunityDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      setIsLoading(true);

      try {
        const postData = await getPostDetailAPI(postId);

        if (postData.error) {
          setError(postData.error);
          console.error("게시글을 못 불러옴:", error);
          return;
        }

        setPost(postData);
      } catch (error) {
        setError("게시글을 불러오는 중 오류가 발생하였습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostAndComments();
  }, [postId]);

  const handleDelete = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (post.authorId !== user.uid) {
      alert("본인이 작성한 글만 삭제할 수 있습니다.");
      return;
    }
    setIsLoading(true);
    try {
      const { success, error } = await deletePostAPI(postId);

      if (!success) {
        alert(error || "게시글 삭제 중 오류가 발생했습니다.");
        return;
      }

      alert("게시글이 삭제되었습니다.");
      navigate("/community");
    } catch (error) {
      console.error("게시글 삭제 중 오류:", error);
      alert("게시글 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = () => {
    if (user?.uid !== post.authorId) {
      alert("작성자만 수정할 수 있습니다.");
      return;
    }
    navigate(`/community/edit/${postId}`);
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <div>
        <div className="text-header-20 text-gray/400">{post.category}</div>
        <div className="text-header-32 text-gray/1000">{post.title}</div>
      </div>
      <div className="flex justify-between">
        <div className="flex justify-between">
          <div className="text-header-16 text-gray/800">{post.author}</div>
          <div className="h-4 w-[1px] bg-gray/200 my-1 mx-3" />
          <div className="text-body-16 text-gray-600">{post.createdAt}</div>
          <div className="h-4 w-[1px] bg-gray/200 my-1 mx-3" />
          <div className="flex justify-between">
            <div className="text-body-16 text-gray-600">저장</div>
            <div className="text-body-16 text-primary/500">
              {post.likeCount}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <TextButton onClick={handleDelete}>삭제</TextButton>
          <div className="h-4 w-[1px] bg-gray/200 my-1 mx-6" />
          <TextButton onClick={handleUpdate}>수정</TextButton>
        </div>
      </div>
      <div className="mt-[45px]">
        <div className="mb-10">
          <img src={post.image} alt="게시글 이미지" />
        </div>
        <div className="text-body-16 text-gray/1000 whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
