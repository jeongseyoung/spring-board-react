import React, { useEffect, useState } from "react";
import "./style.css";
import { useLoginUserStore } from "stores";
import Top3Item from "components/Top3Item";
import { BoardListItem } from "types/interface";
import { lastestBoardListMock, top3ItemMock } from "mocks";
import BoardListItemRendering from "components/BoardListItem";
import Pagination from "components/Pagination";
import { useNavigate } from "react-router-dom";
import { MAIN_PATH, SEARCH_PATH } from "constant";

// component : 메인 화면 컴포넌트
export default function Main() {
  const { loginUser } = useLoginUserStore();

  // function : navigator
  const navigator = useNavigate();

  // component : 메인 상단
  const MainTop = () => {
    // state : top3 주간 게시물 상태
    const [top3BoardList, setTop3BoardList] = useState<BoardListItem[]>([]);

    // effect : 마운트 시
    useEffect(() => {
      setTop3BoardList(top3ItemMock); // mock
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

  // state : 최신 게시물 리스트 상태
  const [currentBoardList, setCurrentBoardList] = useState<BoardListItem[]>([]);

  // state : 인기 검색어 리스트 상태
  const [popularWordList, setPopularWordList] = useState<string[]>([]);

  // event handler : 인기 검색어 클릭 핸들러
  const onPopularWordClickHandler = (item: string | number) => {
    navigator(SEARCH_PATH(item));
  };
  // effect : 마운트 시
  useEffect(() => {
    setCurrentBoardList(lastestBoardListMock);
    setPopularWordList(["hi", "zz", "flower"]);
  }, []);
  const MainBottom = () => {
    // render
    return (
      <div id="main-bottom-wrapper">
        <div className="main-bottom-container">
          <div className="main-bottom-title"></div>
          <div className="main-bottom-contents-box">
            <div className="main-bottom-current-contents">
              {currentBoardList.map((boardListitem) => (
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
                        onClick={() => onPopularWordClickHandler(item)}
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
            {/* <Pagination /> */}
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
