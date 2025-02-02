import { DRUG_ACTIONS } from "../actionTypes";

// 2. 리덕스 설정 방법
// 초기값 설정 후 리듀서 구현

// 약 검색 초기값
const initialDrugState = {
  searchResults: [],
  recentSearches: [],
  favorites: [],
};

// 약 검색 결과, 최근 검색어, 즐겨찾기 관리
export const drugReducer = (state = initialDrugState, action) => {
  switch (action.type) {
    case DRUG_ACTIONS.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };
    case DRUG_ACTIONS.ADD_RECENT_SEARCH:
      return {
        ...state,
        recentSearches: [action.payload, ...state.recentSearches.slice(0, 9)],
      };
    case DRUG_ACTIONS.ADD_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case DRUG_ACTIONS.REMOVE_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((drug) => drug.id !== action.payload),
      };
    default:
      return state;
  }
};
