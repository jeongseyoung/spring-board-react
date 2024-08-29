import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./style.css";
import FavoriteItem from "components/FavoriteItem";
import { Board, CommentListItem, FavoriteListItem } from "types/interface";
import { boardMock, favoriteListMock } from "mocks";
import commentListMock from "mocks/comment-list.mock";
import CommentList from "components/CommentItem";
import Pagination from "components/Pagination";
import defaultProfileImage from "assets/image/hero-image.webp";
import defaultTopMainImage from "assets/image/bus.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useLoginUserStore } from "stores";
import { BOARD_PATH, BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH } from "constant";
import {
  DeleteBoardRequest,
  getBoardRequest,
  getCommentListRequest,
  getFavoriteListRequest,
  IncreaseViewCountResponse,
  PostCommentRequest,
  PutFavoriteRequest,
} from "api";
import GetBoardResponseDto from "api/res/board/get-board.response.dto";
import { ResponseDto } from "api/res";
import {
  DeleteBoardResponseDto,
  GetCommentListResponseDto,
  GetFavoriteListResponseDto,
  IncreaseViewCountResponseDto,
  PostCommentResponseDto,
  PutFavoriteResponseDto,
} from "api/res/board";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";
import { PostCommentRequestDto } from "api/req/board";
import { usePagination } from "hooks";
// component : 게시물 상세 화면 컴포넌트
export default function BoardDetail() {
  // state : 게시물 번호 path variable상태
  const { boardNumber } = useParams();
  // state : 로그인 유지 상태
  const { loginUser } = useLoginUserStore();
  // state : cookie 상태
  const [cookies, setCookie] = useCookies();

  // function : 네비게이트 함수
  const navigator = useNavigate();

  // function : increase View Count Response
  const increaseViewCountResponse = (
    responseBody: IncreaseViewCountResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;
    const { code, message } = responseBody;
    if (code == "NB") alert(message);
    if (code == "DBE") alert(message);
  };

  // component : 게시물 상세 상단top,하단bottom 컴포넌트 (상단 - 게시물 / 하단 - 좋아요, 댓글)
  // component : 상단
  const BoardDetailTop = () => {
    // state : 작성자 여부 상태
    const [isWriter, setWriter] = useState<boolean>(false);
    // state : board 상태
    const [board, setBoard] = useState<Board | null>(null);
    // state : more버튼 상태
    const [showMore, setShowMore] = useState<boolean>(false);

    // function : 작성일 format변경 함수
    const getWriteDatetimeFormat = () => {
      if (!board) return "";
      const date = dayjs(board.writeDatetime);
      return date.format("YYYY. MM. DD");
    };

    // function : get board response, deleteBoardResponse 처리 함수
    const getBoardResponse = (
      responseBody: GetBoardResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code, message } = responseBody;
      if (code == "NB") alert(message);
      if (code == "DBE") alert(message);
      if (code !== "SU") {
        navigator(MAIN_PATH());
        return;
      }

      const board: Board = { ...(responseBody as GetBoardResponseDto) };
      setBoard(board);

      if (!loginUser) {
        setWriter(false);
        return;
      }
      //const isWriter = loginUser.email === board.writerEmail;
      setWriter(loginUser.email === board.writerEmail);
    };

    const deleteBoardResponse = (
      responseBody: DeleteBoardResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code, message } = responseBody;
      if (code == "VF") alert(message);
      if (code == "NU") alert(message);
      if (code == "NB") alert(message);
      if (code == "AF") alert(message);
      if (code == "NP") alert(message);
      if (code == "DBE") alert(message);

      navigator(MAIN_PATH());
    };

    // event handler : more버튼, 닉네임, 업데이트, 삭제 버튼 클릭 이벤트 처리
    const onMoreButtonClickHandler = () => {
      setShowMore(!showMore);
    };
    const onNicknameClickHandler = () => {
      if (!board) return;
      navigator(USER_PATH(board.writerEmail));
    };
    const onUpdateButtonClickHandler = () => {
      if (!board || !loginUser || loginUser.email !== board.writerEmail) return;
      navigator("/board/update/" + board.boardNumber);
    };
    const onDeleteButtonClickHandler = () => {
      if (
        !boardNumber ||
        !board ||
        !loginUser ||
        loginUser.email !== board.writerEmail
      )
        return;
      DeleteBoardRequest(boardNumber, cookies.accessToken).then(
        deleteBoardResponse
      );
    };

    // effect : 게시물 번호 path variable이 바뀔 때마다 게시물 불러오기
    useEffect(() => {
      if (!boardNumber) {
        navigator(MAIN_PATH());
        return;
      }
      getBoardRequest(boardNumber).then(getBoardResponse);
    }, [boardNumber]);

    // render
    if (!board) return <></>;
    // render
    return (
      <>
        <div id="board-detail-top">
          <div className="board-detail-top-header">
            <div className="board-detail-title">{board.title}</div>
            <div className="board-detail-top-sub-box">
              <div className="board-detail-write-info-box">
                <div
                  className="board-detail-write-profile-image"
                  style={{
                    backgroundImage: `url(${
                      board.writerProfileImage
                        ? board.writerProfileImage
                        : defaultProfileImage
                    })`,
                  }}
                ></div>
                <div
                  className="board-detail-write-nickname"
                  onClick={onNicknameClickHandler}
                >
                  {board.writeNickname}
                </div>
                <div className="board-detail-info-divider">{"|"}</div>
                <div className="board-detail-write-date">
                  {getWriteDatetimeFormat()}
                </div>
              </div>
              {isWriter && (
                <div className="icon-button" onClick={onMoreButtonClickHandler}>
                  <div className="icon more-icon"></div>
                </div>
              )}
              {showMore && (
                <div className="board-detail-more-box">
                  <div
                    className="board-detail-update-button"
                    onClick={onUpdateButtonClickHandler}
                  >
                    {"수정"}
                  </div>
                  <div className="divider"></div>
                  <div
                    className="board-detail-delete-button"
                    onClick={onDeleteButtonClickHandler}
                  >
                    {"삭제"}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="divider"></div>
          <div className="board-detail-top-main">
            <div className="board-detail-main-text">{board.content}</div>

            {board.boardImageList.map((image) => (
              <img className="board-detail-main-image" src={image} />
            ))}
          </div>
        </div>
      </>
    );
  };
  // component : 하단
  const BoardDetailBottom = () => {
    // state : 댓글 textarea 참조 상태
    const commentRef = useRef<HTMLTextAreaElement | null>(null);

    // state : pagination 상태
    const {
      currentPage,
      currentSection,
      totalSection,
      viewList,
      viewPageList,
      setCurretPage,
      setCurrentSection,
      setTotalList,
    } = usePagination<CommentListItem>(3);

    // state : 좋아요, 댓글 mock
    const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
    //const [commentList, setCommentList] = useState<CommentListItem[]>([]);
    const [totalCommentCount, setTotalCommentCount] = useState<number>(0);

    // state : 좋아요 상태
    const [isFavorite, setFavorite] = useState<boolean>(false);

    // state : 좋아요 상자, 댓글 상자 보기
    const [showFavorite, setShowFavorite] = useState<boolean>(false);
    const [showComment, setShowComment] = useState<boolean>(true);

    // state : 댓글 상태
    const [comment, setComment] = useState<string>("");

    // function : getFavoriteListResponse, getCommentListResponse 처리 함수
    const getFavoriteListResponse = (
      responseBody: GetFavoriteListResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code, message } = responseBody;
      if (code == "NB") alert(message);
      if (code == "DBE") alert(message);
      if (code !== "SU") return;

      const { favoriteList } = responseBody as GetFavoriteListResponseDto;
      setFavoriteList(favoriteList);

      if (!loginUser) {
        setFavorite(false);
        return;
      }
      // 리스트니깐 쭉 돌면서 f.email === loginUser.email를 하고 존재하는 첫번째 인덱스를 반환, 인덱스가 -1이 아니면 true반환
      const isFavorite =
        favoriteList.findIndex((f) => f.email === loginUser.email) !== -1;
      setFavorite(isFavorite);
    };

    const getCommentListResponse = (
      responseBody: GetCommentListResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;

      const { code, message } = responseBody;
      if (code == "NB") alert(message);
      if (code == "DBE") alert(message);
      if (code !== "SU") return;

      const { commentList } = responseBody as GetCommentListResponseDto;
      setTotalList(commentList);
      setTotalCommentCount(commentList.length);
    };

    // function : putFavoriteResponse, postCommentResponse 처리 함수
    const putFavoriteResponse = (
      responseBody: PutFavoriteResponseDto | ResponseDto | null
    ) => {
      const { code, message } = responseBody as ResponseDto;
      if (code === "VF") alert(message);
      if (code === "NU") alert(message);
      if (code === "NB") alert(message);
      if (code === "AF") alert(message);
      if (code === "DBE") alert(message);
      if (code !== "SU") return;

      if (!boardNumber) return;
      getFavoriteListRequest(boardNumber).then(getFavoriteListResponse);
    };

    const postCommentResponse = (
      responseBody: PostCommentResponseDto | ResponseDto | null
    ) => {
      const { code, message } = responseBody as ResponseDto;
      if (code === "VF") alert(message);
      if (code === "NU") alert(message);
      if (code === "NB") alert(message);
      if (code === "AF") alert(message);
      if (code === "DBE") alert(message);
      if (code !== "SU") return;

      if (!boardNumber) return;
      getCommentListRequest(boardNumber).then(getCommentListResponse);

      setComment("");
    };

    // event handler : 좋아요 클릭 이벤트 처리
    const onFavoriteClickHandler = () => {
      if (!boardNumber || !loginUser || !cookies.accessToken) return;
      PutFavoriteRequest(boardNumber, cookies.accessToken).then(
        putFavoriteResponse
      );
    };

    // event handler : 좋아요 상자, 댓글 상자 보기 이벤트 처리
    const onShowFavoriteClickHandler = () => {
      setShowFavorite(!showFavorite);
    };
    const onShowCommentClickHandler = () => {
      setShowComment(!showComment);
    };

    // event handler : 댓글 변경 이벤트 처리
    const onCommentChangeHandler = (
      event: ChangeEvent<HTMLTextAreaElement>
    ) => {
      const { value } = event.target;
      setComment(value);
      if (!commentRef.current) return;
      commentRef.current.style.height = "auto";
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    };

    // event handler : 댓글 작성 버튼 클릭 이벤트 처리
    const onCommentSubmitButtonClickHandler = () => {
      if (!comment || !boardNumber || !loginUser || !cookies.accessToken)
        return;
      const requestBody: PostCommentRequestDto = { content: comment };
      PostCommentRequest(boardNumber, requestBody, cookies.accessToken).then(
        postCommentResponse
      );
    };

    // effect : 게시물 번호 path variable이 바뀌면 좋아요, 댓글리스트 불러오기
    useEffect(() => {
      if (!boardNumber) return;
      getFavoriteListRequest(boardNumber).then(getFavoriteListResponse);
      getCommentListRequest(boardNumber).then(getCommentListResponse);
    }, [boardNumber]);
    return (
      <>
        <div id="board-detail-bottom">
          <div className="board-detail-bottom-button-box">
            <div className="board-detail-bottom-button-group">
              <div className="icon-button" onClick={onFavoriteClickHandler}>
                {isFavorite ? (
                  <div className="icon favorite-fill-icon"></div>
                ) : (
                  <div className="icon favorite-light-icon"></div>
                )}
              </div>
              <div className="board-detail-bottom-button-text">{`좋아요 ${favoriteList.length}`}</div>
              <div className="icon-button" onClick={onShowFavoriteClickHandler}>
                {showFavorite ? (
                  <div className="icon up-light-icon"></div>
                ) : (
                  <div className="icon down-light-icon"></div>
                )}
              </div>
            </div>
            <div className="board-detail-bottom-button-group">
              <div className="icon-button">
                <div className="icon comment-icon"></div>
              </div>
              <div className="board-detail-bottom-button-text">{`댓글 ${totalCommentCount}`}</div>
              <div className="icon-button" onClick={onShowCommentClickHandler}>
                {showComment ? (
                  <div className="icon up-light-icon"></div>
                ) : (
                  <div className="icon down-light-icon"></div>
                )}
              </div>
            </div>
          </div>
          {showFavorite && (
            <div className="board-detail-bottom-favorite-box">
              <div className="board-detail-bottom-favorite-container">
                <div className="board-detail-bottom-favorite-title">
                  {"좋아요 "}
                  <span className="emphasis">{favoriteList.length}</span>
                </div>
                <div className="board-detail-bottom-favorite-contents">
                  {favoriteList.map((item) => (
                    <FavoriteItem favoriteItem={item} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {showComment && (
            <div className="board-detail-bottom-comment-box">
              <div className="board-detail-bottom-comment-container">
                <div className="board-detail-bottom-comment-title">
                  {"댓글 "}
                  <span className="emphasis">{totalCommentCount}</span>
                </div>
                <div className="board-detail-bottom-comment-list-container">
                  {viewList.map((item) => (
                    <CommentList commentList={item} />
                  ))}
                </div>
              </div>
              <div className="divider"></div>
              <div className="board-detail-bottom-comment-pagination-box">
                <Pagination
                  currentPage={currentPage}
                  currentSection={currentSection}
                  setCurrentPage={setCurretPage}
                  setCurrentSection={setCurrentSection}
                  viewPageList={viewPageList}
                  totalSection={totalSection}
                />
              </div>
              {loginUser !== null && (
                <div className="board-detail-bottom-comment-input-box">
                  <div className="board-detail-bottom-comment-input-container">
                    <textarea
                      className="board-detail-bottom-comment-textarea"
                      placeholder="댓글을 작성해 주세요"
                      value={comment}
                      onChange={onCommentChangeHandler}
                      ref={commentRef}
                    />
                    <div className="board-detail-bottom-comment-button-box">
                      <div
                        className={
                          comment === "" ? "disable-button" : "black-button"
                        }
                        onClick={onCommentSubmitButtonClickHandler}
                      >
                        {"입력"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  };

  // effect : 게시물 조회수 +1
  let effectFlag = true;
  useEffect(() => {
    if (!boardNumber) return;
    if (effectFlag) {
      effectFlag = false;
      return;
    }
    IncreaseViewCountResponse(boardNumber).then(increaseViewCountResponse);
  }, [boardNumber]);

  // render
  return (
    <div id="board-detail-wrapper">
      <div className="board-detail-container">
        <BoardDetailTop />
        <BoardDetailBottom />
      </div>
    </div>
  );
}
