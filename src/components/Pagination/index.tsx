import React from "react";
import "./style.css";

interface Props {
  currentPage: number;
  currentSection: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
  //totalPage: number;
  viewPageList: number[];
  totalSection: number;
}

export default function Pagination(props: Props) {
  const {
    currentPage,
    currentSection,
    viewPageList,
    totalSection,
    setCurrentPage,
    setCurrentSection,
  } = props;

  // event handler : 페이지 클릭 이벤트 처리
  const onPageClickHandler = (page: number) => {
    setCurrentPage(page);
  };
  // event handler : 이전 section 버튼 클릭 이벤트 처리
  const onPreviousClickHandler = () => {
    if (currentSection === 1) return;
    setCurrentPage((currentSection - 1) * 10);
    setCurrentSection(currentSection - 1);
  };
  // event handler : 다음 section 버튼 클릭 이벤트 처리
  const onNextClickHandler = () => {
    if (currentSection === totalSection) return;
    setCurrentPage(currentSection * 10 + 1);
    setCurrentSection(currentSection + 1);
  };
  // render
  return (
    <div id="pagination-wrapper">
      <div className="pagination-change-link-box">
        <div className="icon-box-small">
          <div className="icon expand-left"></div>
        </div>
        <div
          className="pagination-change-link-text"
          onClick={onPreviousClickHandler}
        >
          {"prev"}
        </div>
      </div>
      <div className="pagination-divider">{"|"}</div>

      {viewPageList.map((page) =>
        page === currentPage ? (
          <div className="pagination-text-active">{1}</div>
        ) : (
          <div
            className="pagination-text"
            onClick={() => onPageClickHandler(2)}
          >
            {2}
          </div>
        )
      )}

      <div className="pagination-divider">{"|"}</div>
      <div className="pagination-change-link-box">
        <div
          className="pagination-change-link-text"
          onClick={onNextClickHandler}
        >
          {"next"}
        </div>
        <div className="icon-box-small">
          <div className="icon expand-right"></div>
        </div>
      </div>
    </div>
  );
}
