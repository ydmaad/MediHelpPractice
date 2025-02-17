import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

// 게시글 작성 API
export const createPostAPI = async (postData) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      ...postData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      id: docRef.id,
      error: null,
    };
  } catch (error) {
    console.error("게시글 작성 오류:", error);
    return {
      success: false,
      id: null,
      error: error.message,
    };
  }
};

// 게시글 조회 API
export const getPostAPI = async (lastPost = null, postsPerPage = 10) => {
  try {
    let postsQuery;

    if (lastPost) {
      postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        startAfter(lastPost),
        limit(postsPerPage)
      );
    } else {
      postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        limit(postsPerPage)
      );
    }

    const querySnapshot = await getDocs(postsQuery);
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toLocaleString() || "날짜 없음",
    }));

    return {
      posts,
      lastPost: querySnapshot.docs[querySnapshot.docs.length - 1] || null,
      error: null,
    };
  } catch (error) {
    console.log("게시글 목록 조회 오류:", error);
    return {
      posts: [],
      lastPost: null,
      error: error.message,
    };
  }
};
