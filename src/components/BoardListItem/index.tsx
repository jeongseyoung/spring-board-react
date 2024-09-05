import React from "react";
import "./style.css";
import { BoardListItem } from "types/interface";
import { useNavigate } from "react-router-dom";
import defaultImage from "assets/image/bus.jpg";
import { BOARD_DETAIL_PATH, BOARD_PATH } from "constant";
interface Props {
  boardlistItem: BoardListItem;
}

//component: Board List Item component
export default function BoardListItemRendering({ boardlistItem }: Props) {
  //properties
  const { boardNumber, title, content, boardTitleImage } = boardlistItem;
  const { favoriteCnt, commentCnt, viewCnt } = boardlistItem;
  const { writeDatetime, writerNickname, writerProfileImage } = boardlistItem;

  // //function: 네비게이트 함수
  const navigator = useNavigate();

  // //event handler : 게시물 아이템 클릭 이벤트 처리 함수
  const onClickHandler = (bn: number) => {
    console.log(bn);
    navigator(BOARD_PATH() + "/" + BOARD_DETAIL_PATH(bn));
  };

  //https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg.webp
  // render: Board List Item component rendering
  return (
    <div
      className="board-list-item"
      onClick={() => onClickHandler(boardNumber)}
    >
      <div className="board-list-item-box">
        <div className="board-list-item-top">
          <div className="board-list-item-profile-box">
            <div
              className="board-list-item-profile-image"
              style={{
                backgroundImage: `url(${
                  writerProfileImage ? writerProfileImage : defaultImage
                })`,
              }}
            ></div>
          </div>
          <div className="board-list-item-write-box">
            <div className="board-list-item-nickname">{writerNickname}</div>
            <div className="board-list-item-write-datetime">
              {writeDatetime}
            </div>
          </div>
        </div>
        <div className="board-list-item-middle">
          <div className="board-list-item-title">{title}</div>
          <div className="board-list-item-content">{content}</div>
        </div>
        <div className="board-list-item-bottom">
          <div className="board-list-item-counts">
            {`댓글 ${commentCnt} , 좋아요  ${favoriteCnt}, 조회수  ${viewCnt}`}
          </div>
          <div className="board-list-item-"></div>
        </div>
      </div>
      {boardTitleImage !== null && (
        <div className="board-list-item-image-box">
          <div
            className="board-list-item-image"
            style={{
              backgroundImage: `url(${boardTitleImage})`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
