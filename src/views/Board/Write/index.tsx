import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./style.css";
import { useBoardStore, useLoginUserStore } from "stores";
import { useNavigate } from "react-router-dom";
import { MAIN_PATH } from "constant";
import { useCookies } from "react-cookie";

// component : 게시물 Write 화면 컴포넌트
export default function BoardWrite() {
  // state : 본문(content),이미지 영역 요소 ref상태
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  // state : 게시물 상태
  const { title, setTitle } = useBoardStore();
  const { content, setContent } = useBoardStore();
  const { boardImageFileList, setBoardImageFileList } = useBoardStore();
  const { resetBoard } = useBoardStore();

  // state : 쿠키 상태
  const [cookies, setCookie] = useCookies();
  // state : 게시물 이미지 미리보기 URL 상태
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  // state : 로그인 유저 상태
  const { loginUser } = useLoginUserStore();

  // function : navigator
  const navigate = useNavigate();

  // event handler : 제목, 내용 변경 이벤트
  const onTitleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTitle(value);

    if (!titleRef.current) return;
    titleRef.current.style.height = "auto";
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
  };
  const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setContent(value);

    if (!contentRef.current) return;
    contentRef.current.style.height = "auto";
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  };

  // event handler : 이미지 업로드, 변경(change), 닫기(삭제) 버튼 클릭 이벤트 처리
  const onImageUploadButtonClickHandler = () => {
    if (!imageInputRef.current) return;
    imageInputRef.current.click();
  };
  const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;
    const file = event.target.files[0];

    // 미리보기
    const imageUrl = URL.createObjectURL(file);
    const newImageUrls = imageUrls.map((item) => item);
    newImageUrls.push(imageUrl);
    setImageUrls(newImageUrls);

    // 업로드
    const newBoardImageFileList = boardImageFileList.map((item) => item);
    newBoardImageFileList.push(file);
    setBoardImageFileList(newBoardImageFileList);
  };
  const onImageCloseButtonClickHandler = (deleteIndex: number) => {
    if (!imageInputRef.current) return;
    imageInputRef.current.value = "";

    const newImageUrls = imageUrls.filter((url, idx) => idx !== deleteIndex);
    setImageUrls(newImageUrls);

    const newBoardImageFileList = boardImageFileList.filter(
      (url, idx) => idx !== deleteIndex
    );
    setBoardImageFileList(newBoardImageFileList);

    if (!imageInputRef.current) return;
    imageInputRef.current.value = "";
  };
  // effect : 마운트 실 실행할 함수?
  useEffect(() => {
    const accessToken = cookies.accessToken;
    if (!accessToken) {
      navigate(MAIN_PATH());
      return;
    }
  }, []);
  // render
  return (
    <div id="board-write-wrapper">
      <div className="board-write-container">
        <div className="board-write-box">
          <div className="board-write-title-box">
            <textarea
              className="board-write-title-textarea"
              placeholder="제목을 입력하세요."
              rows={1}
              value={title}
              onChange={onTitleChangeHandler}
            />
          </div>
          <div className="divider"></div>
          <div className="board-write-content-box">
            <textarea
              ref={contentRef}
              className="board-write-content-textarea"
              placeholder="본문을 작성해 주세요."
              value={content}
              onChange={onContentChangeHandler}
            ></textarea>
            <div
              className="icon-button"
              onClick={onImageUploadButtonClickHandler}
            >
              <div className="icon image-box-light-icon"></div>
            </div>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onImageChangeHandler}
            />
          </div>
          <div className="board-write-images-box">
            {imageUrls.map((imageUrl, idx) => (
              <div className="board-write-image-box">
                <img className="board-write-image" src={imageUrl} />
                <div
                  className="icon-button image-close"
                  onClick={() => onImageCloseButtonClickHandler(idx)}
                >
                  <div className="icon close-icon"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
