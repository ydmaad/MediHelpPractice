import React, { useEffect, useState } from "react";
import { searchDrugAPI, searchPillAPI } from "../api/drug";

const DrugSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // e약은요 검색 핸들러
  const handleSearch = async (e, page = 1) => {
    e?.preventDefault();

    if (!keyword.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await searchDrugAPI(keyword, page, 20);

      setSearchResults(response.data);
      setTotalCount(response.totalCount);
      setCurrentPage(page);
    } catch (error) {
      console.error("검색 중 오류가 발생했습니다.");
      setSearchResults([]);
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    handleSearch(null, newPage);
  };

  // 낱알정보 검색 핸들러
  const handlePillSearch = async (e, page = 1) => {
    e?.preventDefault();

    if (!keyword.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await searchPillAPI(keyword, page, 20);

      setSearchResults(response.data);
      setTotalCount(response.totalCount);
      setCurrentPage(page);
    } catch (error) {
      console.error("검색 중 오류가 발생했습니다.");
      setSearchResults([]);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        value={keyword}
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="약 이름을 입력하세요"
      />
      <button onClick={handleSearch} type="submit">
        검색
      </button>
      <div>총{totalCount}개 결과</div>
      <div>
        {searchResults.map((drug) => {
          return (
            <div key={drug.itemSeq}>
              <h3>{drug.itemName}</h3>
            </div>
          );
        })}
      </div>

      {totalCount > 0 && (
        <div>
          <button onClick={() => handlePageChange(currentPage - 1)}>
            이전
          </button>
          <span>
            {currentPage} / {Math.ceil(totalCount / 20)}
          </span>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage >= Math.ceil(totalCount / 20)}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default DrugSearch;
