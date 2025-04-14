import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
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

// 이미지 업로드 API
export const uploadImage = async (file) => {
  try {
    if (!file) return { imageUrl: null };

    // 파일 확장자 추출
    const fileExtension = file.name.split(".").pop();

    // 파일 명 생성
    const fileName = `${uuidv4()}.${fileExtension}`;

    // storage reference 생성
    const storageRef = ref(storage, `community/${fileName}`);

    // 파일 업로드
    const snapshot = await uploadBytes(storageRef, file);

    // 업로드된 파일의 다운로드 URL 가져오기
    const imageUrl = await getDownloadURL(snapshot.ref);

    return { imageUrl, error: null };
  } catch (error) {
    console.error("이미지 업로드 오류:", error);
    return { imageUrl: null, error: error.message };
  }
};

// 게시글 목록 조회 API
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

// 게시글 단일 조회 API
export const getPostDetailAPI = async (postId) => {
  try {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { error: "게시글을 찾을 수 없습니다." };
    }

    const data = {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt:
        docSnap.data().createdAt?.toDate().toLocaleString() || "날짜 없음",
      error: null,
    };

    return data;
  } catch (error) {
    console.error("게시글 조회 오류", error);
    return { error: "게시글을 불러오는 중 오류가 발생했습니다." };
  }
};

// 게시글 수정 API
export const updatePostAPI = async (postId, updateData) => {
  try {
    const postRef = doc(db, "posts", postId);

    await updateDoc(postRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("게시글 수정 오류: ", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// 게시글 삭제 API
export const deletePostAPI = async (postId) => {
  try {
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("게시글 삭제 오류:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
