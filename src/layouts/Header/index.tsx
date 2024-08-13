import React, {
  ChangeEvent,
  useRef,
  useState,
  KeyboardEvent,
  useEffect,
} from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
export default function Header() {
  // navigate함수;
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
          <SearchButton />
        </div>
      </div>
    </div>
  );
}
