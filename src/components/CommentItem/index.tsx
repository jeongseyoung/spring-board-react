import React from "react";
import "./style.css";
import defaultImage from "assets/image/bus.jpg";
import { CommentListItem } from "types/interface";
import dayjs from "dayjs";

interface Props {
  commentList: CommentListItem;
}

export default function CommentList({ commentList }: Props) {
  // state : properties
  const { nickname, profileImage, writeDatetime, content } = commentList;

  // function : 작성일 경과시간 함수  -> 수정 필요
  const getElapsedTime = () => {
    const now = dayjs().add(9, "hour");
    const writeTime = dayjs(writeDatetime);

    //now - wrtietime 초단위로 계산
    const gap = now.diff(writeTime, "s");
    console.log("gap", now, writeTime, gap);
    if (gap < 60) return `${gap}초 전`;
    if (gap < 3600) return `${Math.floor(gap / 60)}분 전`;
    if (gap < 86400) return `${Math.floor(gap / 3600)}시간 전`;
    return `${Math.floor(gap / 86400)}/일 전`;
  };

  // render
  return (
    <div className="comment-list-item">
      <div className="comment-list-item-top">
        <div className="comment-list-item-profile-box">
          <div
            className="comment-list-item-profile-image"
            style={{
              backgroundImage: `url(${
                profileImage ? profileImage : defaultImage
              })`,
            }}
          ></div>
        </div>
        <div className="comment-list-item-nickname">{nickname}</div>

        <div className="comment-list-item-divider">{"|"}</div>

        <div className="comment-list-item-time">{getElapsedTime()}</div>
      </div>
      <div className="comment-list-item-main">
        <div className="comment-list-item-content">{content}</div>
      </div>
    </div>
  );
}
