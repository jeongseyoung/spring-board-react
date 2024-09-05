import React, { useEffect, useState } from "react";
import "./style.css";
import { useLoginUserStore } from "stores";
import Top3Item from "components/Top3Item";
import { BoardListItem } from "types/interface";
import { lastestBoardListMock, top3ItemMock } from "mocks";
import BoardListItemRendering from "components/BoardListItem";
import Pagination from "components/Pagination";
import {
  getLastestListRequest,
  getPopularWordListRequest,
  getTop3ListRequest,
} from "api";
import {
  GetLatestBoardListResponseDto,
  GetPopularListResponseDto,
  GetTop3BoardListResponseDto,
} from "api/res/board";
import { ResponseDto } from "api/res";
import { usePagination } from "hooks";
import { SEARCH_PATH } from "constant";
import { useNavigate } from "react-router-dom";

// component : 메인 화면 컴포넌트
export default function Main() {
  const { loginUser } = useLoginUserStore();

  // component : 메인 상단
  const MainTop = () => {
    // state : top3 주간 게시물 상태
    const [top3BoardList, setTop3BoardList] = useState<BoardListItem[]>([]);
    // function : top3listResponse
    const top3listResponse = (
      responseBody: GetTop3BoardListResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code, message } = responseBody;
      if (code === "DBE") alert(message);
      if (code !== "SU") return;

      const { top3List } = responseBody as GetTop3BoardListResponseDto;
      setTop3BoardList(top3List);
    };
    // effect : 마운트 시
    useEffect(() => {
      //setTop3BoardList(top3ItemMock); // mock
      getTop3ListRequest().then(top3listResponse);
    }, []);
    // render
    return (
      <div id="main-top-wrapper">
        <div className="main-top-container">
          <div className="main-top-title">{"다양한 이야기를 나눠보세요!!"}</div>
          <div className="main-top-contents-box">
            <div className="main-top-contents-title">{"주간 TOP3 게시글"}</div>
            <div className="main-top-contents">
              {top3BoardList.map((top3items) => (
                <Top3Item top3ListItem={top3items} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // component : 메인 하단
  const MainBottom = () => {
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

    const [popularWordList, setPopularWordList] = useState<string[]>([]);

    // function : getLastestListResponse
    const getLastestListResponse = (
      responseBody: GetLatestBoardListResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code, message } = responseBody;
      if (code == "DBE") alert(message);
      if (code !== "SU") return;

      const { latestList } = responseBody as GetLatestBoardListResponseDto;
      setTotalList(latestList);
    };

    // function : getPopularWordListResponse
    const getPopularWordListResponse = (
      responseBody: GetPopularListResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code, message } = responseBody;
      if (code === "DBE") alert(message);
      if (code !== "SU") {
        alert(message);
        return;
      }

      const { popularWordList } = responseBody as GetPopularListResponseDto;
      setPopularWordList(popularWordList);
    };

    // function : navigator
    const navigator = useNavigate();
    //const onPopularWordClickHandler = (word: string) => {};

    // effect : 마운트 시
    useEffect(() => {
      //setCurrentBoardList(lastestBoardListMock); // mock
      //setPopularWordList(["hi", "zz", "flower"]); // mock
      getLastestListRequest().then(getLastestListResponse);
      getPopularWordListRequest().then(getPopularWordListResponse);
    }, []);

    // render
    return (
      <div id="main-bottom-wrapper">
        <div className="main-bottom-container">
          <div className="main-bottom-title"></div>
          <div className="main-bottom-contents-box">
            <div className="main-bottom-current-contents">
              {viewList.map((boardListitem) => (
                <BoardListItemRendering boardlistItem={boardListitem} />
              ))}
            </div>
            <div className="main-bottom-popular-box">
              <div className="main-bottom-popular-card">
                <div className="main-bottom-popluar-card-container">
                  <div className="main-bottom-popular-card-title">
                    {"인기 검색어"}
                  </div>
                  <div className="main-bottom-popular-card-contents">
                    {popularWordList.map((item) => (
                      <div
                        className="word-badge"
                        onClick={() => navigator(SEARCH_PATH(item))}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-bottom-pagination-box">
            <Pagination
              currentPage={currentPage}
              currentSection={currentSection}
              setCurrentPage={setCurretPage}
              setCurrentSection={setCurrentSection}
              viewPageList={viewPageList}
              totalSection={totalSection}
            />
            {/*69 */}
          </div>
        </div>
      </div>
    );
  };

  // render
  return (
    <div>
      <MainTop />
      <MainBottom />
    </div>
  );
}
