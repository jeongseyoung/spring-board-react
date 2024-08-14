import React, {
  ChangeEvent,
  useRef,
  useState,
  KeyboardEvent,
  useEffect,
} from "react";
import "./style.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AUTH_PATH,
  BOARD_DETAIL_PATH,
  BOARD_PATH,
  BOARD_UPDATE_PATH,
  BOARD_WRITE_PATH,
  MAIN_PATH,
  SEARCH_PATH,
  USER_PATH,
} from "constant";
import { useCookies } from "react-cookie";
import { useBoardStore, useLoginUserStore } from "stores";
import path from "path";

// component : 헤더 레이아웃
export default function Header() {
  // state : 로그인 유저 상태 (zustand)
  const { loginUser, resetLoginUser, setLoginUser } = useLoginUserStore();
  // state : path 상태
  const { pathname } = useLocation();
  // state : cookie 상태
  const [cookies, setCookie] = useCookies();
  // state : 로그인 상태
  const [isLogin, setLogin] = useState<boolean>(false);
  // state : 인증 페이지 상태
  const [isAuthPage, setAuthPage] = useState<boolean>(false);
  // state : 메인 페이지 상태
  const [isMainPage, setMainPage] = useState<boolean>(false);

  // state : 검색 페이지 상태
  const [isSearchPage, setSearchPage] = useState<boolean>(false);

  // state : 게시물 디테일 페이지 상태
  const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);

  // state : 게시물 작성 페이지 상태
  const [isBoardWrietePage, setBoardWrietePage] = useState<boolean>(false);

  // state : 게시물 업데이트 페이지 상태
  const [isBoardUpdatePage, setBoardUpdatePage] = useState<boolean>(false);

  // state : 유저 페이지 상태
  const [isUserPage, setUserPage] = useState<boolean>(false);

  // function : navigate함수;
  const navigate = useNavigate();
  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  };

  //component - 검색버튼
  const SearchButton = () => {
    // state 검색어 입력요소 참조 상태
    const searchButtonRef = useRef<HTMLDivElement | null>(null);

    // state 검색버튼, 검색어 상태
    const [status, setStatus] = useState<boolean>(false); //초기값 - false
    const [word, setWord] = useState<string | number>("");
    // state 검색어 경로 variable 상태
    const { searchWord } = useParams();

    // event handler - 검색어 변경 이벤트
    const onSearchWordHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setWord(value);
    };
    // event handler -  검색어 키 이벤트
    const onSearchWordKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      if (!searchButtonRef.current) return;
      searchButtonRef.current.click();
    };
    // event handler - 검색버튼 클릭 이벤트
    const onSearchButtonClickHandler = () => {
      if (!status) {
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
    };

    // effect - 검색어 경로가 바뀔때 마다 실행되는 함수
    useEffect(() => {
      if (searchWord) {
        setWord(searchWord);
        setStatus(true);
      }
    }, [searchWord]);

    if (!status) {
      // 클릭 false 상태
      return (
        <div className="icon-button" onClick={onSearchButtonClickHandler}>
          <div className="icon search-light-icon"></div>
        </div>
      );
    }
    return (
      // 클릭 true 상태
      <div className="header-search-input-box">
        <input
          className="header-search-input"
          type="text"
          placeholder="검색어를 입력하세요"
          value={word}
          onChange={onSearchWordHandler}
          onKeyDown={onSearchWordKeyDownHandler}
        />
        <div
          ref={searchButtonRef}
          className="icon-button"
          onClick={onSearchButtonClickHandler}
        >
          <div className="icon search-light-icon"></div>
        </div>
      </div>
    );
  };
  //component - 로그인 or 마이페이지
  const MyPageButton = () => {
    // state : userEmail path variable 상태
    const { userEmail } = useParams();
    // event handler : 마이페이지 버튼 클릭 이벤트
    const onMyPageButtonClickHandler = () => {
      if (!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(""));
    };
    // event handler : 로그인 버튼 클릭 이벤트
    const onLoginButtonClickHandler = () => {
      navigate(AUTH_PATH());
    };
    // event handler : 로그아웃 버튼 클릭 이벤트
    const onSingOutButtonClickHandler = () => {
      navigate(MAIN_PATH());
    };
    if (isLogin) {
      // render : 마이페이지
      return (
        <div className="white-button" onClick={onMyPageButtonClickHandler}>
          {"마이페이지"}
        </div>
      );
    }
    // render : 로그아웃
    if (isLogin && userEmail === loginUser?.email)
      return (
        <div className="white-button" onClick={onSingOutButtonClickHandler}>
          {"로그아웃"}
        </div>
      );
    // render : 로그인
    return (
      <div className="black-button" onClick={onLoginButtonClickHandler}>
        {"로그인"}
      </div>
    );
  };
  // component : 업로드 버튼 컴포넌트
  const UploadButton = () => {
    // state : 게시물 상태
    const { title, content, boardImageFileList, resetBoard } = useBoardStore();
    // event handler : 업로드 버튼 클릭 이벤트
    const onUploadButtonClickHand = () => {};
    // render : 업로드 렌더링
    if (title && content.length >= 10)
      return (
        <div className="black-button" onClick={onUploadButtonClickHand}>
          {"업로드"}
        </div>
      );
    // render : 업로드 비활성화
    return <div className="black-button">{"업로드"}</div>;
  };

  // effect : path가 변경될 때 마다 실행
  useEffect(() => {
    const isAuthPage = pathname.startsWith(AUTH_PATH());
    setAuthPage(isAuthPage);
    const isMainPage = pathname.startsWith(MAIN_PATH());
    setMainPage(isMainPage);
    const isSearchPage = pathname.startsWith(SEARCH_PATH(""));
    setSearchPage(isSearchPage);
    const isBoardDetailPage = pathname.startsWith(
      BOARD_PATH() + "/" + BOARD_DETAIL_PATH("")
    );
    setBoardDetailPage(isBoardDetailPage);
    const isBoardWrietePage = pathname.startsWith(
      BOARD_PATH() + "/" + BOARD_WRITE_PATH()
    );
    setBoardWrietePage(isBoardWrietePage);
    const isBoardUpdatePage = pathname.startsWith(
      BOARD_PATH() + "/" + BOARD_UPDATE_PATH("")
    );
    setBoardUpdatePage(isBoardUpdatePage);
    const isUserPage = pathname.startsWith(USER_PATH(""));
    setUserPage(isUserPage);
  }, [pathname]);

  return (
    <div id="header">
      <div className="header-container">
        <div className="header-left-box" onClick={onLogoClickHandler}>
          <div className="icon-box">
            <div className="icon logo-dark-icon"></div>
          </div>
          <div className="header-logo">{"hihi board"}</div>
        </div>
        <div className="header-right-box">
          {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && (
            <SearchButton />
          )}
          {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && (
            <MyPageButton />
          )}
          {(isBoardWrietePage || isBoardUpdatePage) && <UploadButton />}
        </div>
      </div>
    </div>
  );
}
