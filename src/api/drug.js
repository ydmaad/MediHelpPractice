import axios from "axios";

// API 기본 설정(axios 인스턴스 생성)
// e약은요
const drugInfoAPI = axios.create({
  baseURL: import.meta.env.VITE_DRUG_INFO_API_URL,
  params: {
    serviceKey: import.meta.env.VITE_DRUG_INFO_API_KEY,
    type: "json",
  },
});

// 낱알정보
const pillAPI = axios.create({
  baseURL: import.meta.env.VITE_PILL_API_URL,
  params: {
    serviceKey: import.meta.env.VITE_PILL_API_KEY,
    type: "json",
  },
});

// e약은요 요청 인터셉터
drugInfoAPI.interceptors.request.use(
  (config) => {
    console.log("👉 API 요청:", config.url);
    console.log("👉 파라미터:", config.params);
    return config;
  },
  (error) => {
    console.error("❌ 요청 에러:", error);
    return Promise.reject(error);
  }
);

// e약은요 응답 인터셉터
drugInfoAPI.interceptors.response.use(
  (response) => {
    console.log("✅ API 응답:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ 응답 에러:", error);
    return Promise.reject(error);
  }
);

// 낱알정보 요청 인터셉터
pillAPI.interceptors.request.use(
  (config) => {
    console.log("👉 API 요청:", config.url);
    console.log("👉 파라미터:", config.params);
    return config;
  },
  (error) => {
    console.error("❌ 요청 에러:", error);
    return Promise.reject(error);
  }
);

// 낱알정보 응답 인터셉터
pillAPI.interceptors.response.use(
  (response) => {
    console.log("✅ API 응답:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ 응답 에러:", error);
    return Promise.reject(error);
  }
);

// e약은요 API - 의약품 검색
export const searchDrugAPI = async (keyword, pageNo, numOfRows) => {
  try {
    const response = await drugInfoAPI.get("/getDrbEasyDrugList", {
      params: { itemName: keyword, pageNo: pageNo, numOfRows: numOfRows },
    });

    if (response.data.body?.items) {
      return {
        data: response.data.body.items,
        numOfRows: response.data.body.numOfRows,
        pageNo: response.data.body.pageNo,
        totalCount: response.data.body?.totalCount,
        error: null,
      };
    }

    return {
      data: [],
      numOfRows: 0,
      pageNo: 0,
      totalCount: 0,
      error: "검색 결과가 없습니다.",
    };
  } catch (error) {
    console.error("약 검색 API 오류 :", error);
    return {
      data: [],
      numOfRows: 0,
      pageNo: 0,
      totalCount: 0,
      error: "약 검색 중 알 수 없는 오류가 발생하였습니다.",
    };
  }
};

// 낱알정보 API - 낱알 검색
export const searchPillAPI = async (keyword, pageNo, numOfRows) => {
  try {
    const response = await pillAPI.get("/getMdcinGrnIdntfcInfoList", {
      params: { itemName: keyword, pageNo: pageNo, numOfRows: numOfRows },
    });

    if (response.data.body?.items) {
      return {
        data: response.data.body.items,
        numOfRows: response.data.body.numOfRows,
        pageNo: response.data.body.pageNo,
        totalCount: response.data.body?.totalCount,
        error: null,
      };
    }

    return {
      data: [],
      numOfRows: 0,
      pageNo: 0,
      totalCount: 0,
      error: "검색 결과가 없습니다.",
    };
  } catch (error) {
    console.error("낱알 검색 API 에러", error);
    return {
      data: [],
      numOfRows: 0,
      pageNo: 0,
      totalCount: 0,
      error: "약 검색 중 알 수 없는 오류가 발생하였습니다.",
    };
  }
};
