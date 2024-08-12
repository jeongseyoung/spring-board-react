import React from "react";
import "./style.css";
import defaultImage from "assets/image/bus.jpg";
import { BoardListItem } from "types/interface";

interface Props {
  top3ListItem: BoardListItem;
}

//top3 List Item 컴포넌트
export default function Top3Item({ top3ListItem }: Props) {
  // //function: 네비게이트 함수
  // const navigator = useNavigate();
  // //event handler : 게시물 아이템 클릭 이벤트 처리 함수
  // const onClickHandler = () => {
  //   navigator(boardNumber);
  // };

  //properties
  const { boardNumber, title, content, boardTitleImage } = top3ListItem;
  const { favoriteCnt, commentCnt, viewCnt } = top3ListItem;
  const { writeDatetime, writerNickname, writerProfileImage } = top3ListItem;

  //render : top3 List Item 컴포넌트 렌더링
  return (
    <div
      className="top3-list-item"
      style={{
        backgroundImage: `url(${
          boardTitleImage ? boardTitleImage : defaultImage
        })`,
      }}
    >
      <div className="top3-list-item-main-box">
        <div className="top3-list-item-top">
          <div className="top3-list-item-profile-box">
            <div
              className="top3-list-item-profile-image"
              style={{
                backgroundImage: `url(${
                  writerProfileImage ? writerProfileImage : defaultImage
                })`,
              }}
            ></div>
          </div>
          <div className="top3-list-item-write-box">
            <div className="top3-list-item-nickname">{writerNickname}</div>
            <div className="top3-list-item-write-date">{writeDatetime}</div>
          </div>
        </div>
        <div className="top3-list-item-middle">
          <div className="top3-list-item-title">{title}</div>
          <div className="top3-list-item-content">{content}</div>
        </div>
        <div className="top3-list-item-bottom">
          <div className="top3-list-item-counts">
            {`댓글${commentCnt}, 좋아요${favoriteCnt}, 조회수${viewCnt}`}
          </div>
        </div>
      </div>
    </div>
  );
}
