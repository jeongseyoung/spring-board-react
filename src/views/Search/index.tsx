import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { BoardListItem } from "types/interface";
import BoardListItemRendering from "components/BoardListItem";
import { SEARCH_PATH } from "constant";
import { lastestBoardListMock } from "mocks";
import { getRelationListRequest, getSearchBoardListRequest } from "api";
import { GetSearchBoardListResponseDto } from "api/res/board";
import { ResponseDto } from "api/res";
import { usePagination } from "hooks";
import Pagination from "components/Pagination";
import { GetRelationListResponseDto } from "api/res/search";

// component : 검색 화면 컴포넌트
export default function Search() {
  // state : pagination 관련 상태
  const {
    currentPage,
    currentSection,
    totalSection,
    viewList,
    viewPageList,
    setCurrentSection,
    setCurretPage,
    setTotalList,
  } = usePagination<BoardListItem>(5); // 5개씩 보여줌

  // state : searchWord param
  const { searchWord } = useParams();

  // state : 검색 결과 상태
  const [count, setCount] = useState<number>(0);

  // state : 이전 검색 상태
  const [preSearchWord, setPreSearchWord] = useState<string | null>(null);

  // state : 관련 검색어 리스트 상태
  const [relationWordList, setRelationWordList] = useState<string[]>([]);

  // // state : 검색 게시물 리스트 상태(temp)
  // const [searchBoardList, setSearchBoardList] = useState<BoardListItem[]>([]);

  // function navigator
  const navigator = useNavigate();

  // function : getSearchBoardListResponse
  const getSearchBoardListResponse = (
    responseBody: GetSearchBoardListResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;
    const { code, message } = responseBody;
    if (code === "DBE") alert("DBE " + message);
    if (code !== "SU") return;

    if (!searchWord) return;
    const { searchList } = responseBody as GetSearchBoardListResponseDto;
    setTotalList(searchList);
    setCount(searchList.length);
    setPreSearchWord(searchWord);
  };

  // function : getRelationListResponse
  const getRelationListResponse = (
    responseBody: GetRelationListResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;
    const { code, message } = responseBody;
    if (code === "DBE") alert(message);
    if (code !== "SU") {
      alert("NOT SU " + message);
      return;
    }

    const { relativeWordList } = responseBody as GetRelationListResponseDto;
    setRelationWordList(relativeWordList);
  };

  // event handler : onRelationWordClickHandler 연관 검색어 클릭
  const onRelationWordClickHandler = (word: string) => {
    navigator(SEARCH_PATH(word));
  };

  useEffect(() => {
    // setSearchBoardList(lastestBoardListMock);
    // setRelationList([]);
    if (!searchWord) return;
    getSearchBoardListRequest(searchWord, preSearchWord).then(
      getSearchBoardListResponse
    );
    getRelationListRequest(searchWord).then(getRelationListResponse);
  }, [searchWord]); // searchWord가 바뀔때마다 실행

  // render
  if (!searchWord) return <></>;
  return (
    <div id="search-wrapper">
      <div className="search-container">
        <div className="search-title-box">
          <div className="search-title">
            <span className="search-title-emphasis">
              {searchWord}에 대한 검색 결과입니다.
            </span>
          </div>
          <div className="search-count">{count}</div>
        </div>
        <div className="search-contents-box">
          {count === 0 ? (
            <div className="search-contents-nothing">
              {"검색 결과가 없습니다."}
            </div>
          ) : (
            <div className="search-contents">
              {viewList.map((item) => (
                <BoardListItemRendering boardlistItem={item} />
              ))}
            </div>
          )}
          <div className="search-relation-box">
            <div className="search-relation-card">
              <div className="search-relation-card-container">
                <div className="search-relation-card-title">
                  {"관련 검색어"}
                </div>
                {relationWordList.length === 0 ? (
                  <div className="search-relation-card-contents-nothing">
                    {"관련 검색어가 없습니다."}
                  </div>
                ) : (
                  <div className="search-relation-card-contents">
                    {relationWordList.map((item) => (
                      <div
                        className="word-badge"
                        onClick={() => navigator(SEARCH_PATH(item))}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="search-pagination-box">
          {count !== 0 && (
            <Pagination
              currentPage={currentPage}
              currentSection={currentSection}
              setCurrentPage={setCurretPage}
              setCurrentSection={setCurrentSection}
              viewPageList={viewPageList}
              totalSection={totalSection}
            />
          )}
        </div>
      </div>
    </div>
  );
}
