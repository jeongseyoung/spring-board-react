import React, { useState } from "react";
import "./App.css";
import BoardListItemRendering from "components/BoardListItem";
import {
  lastestBoardListMock,
  top3Item,
  commentList,
  favoriteListMock,
} from "mocks";
import Top3Item from "components/Top3Item";
import CommentList from "components/CommentItem";
import FavoriteItem from "components/FavoriteItem";
import { InputBox } from "components/InputBox";
import Footer from "layouts/Footer";
import Header from "layouts/Header";
import { Route, Routes } from "react-router-dom";
import Main from "views/Main";
import Authentication from "views/Authentication";
import Search from "views/Seach";
import User from "views/User";
import BoardWrite from "views/Board/Write";
import BoardUpdate from "views/Board/Update";
import BoardDetail from "views/Board/Detail";
import Container from "layouts/Container";
import { BOARD_UPDATE_PATH, MAIN_PATH } from "constant";
import { AUTH_PATH } from "constant";
import { SEARCH_PATH } from "constant";
import { USER_PATH } from "constant";
import { BOARD_PATH } from "constant";
import { BOARD_WRITE_PATH } from "constant";
import { BOARD_DETAIL_PATH } from "constant";

// Application component
function App() {
  const [value, setValue] = useState<string>("");
  // render : Application 컴포넌트 렌더링
  // description : 메인 화면 : '/' -> Main
  // description : 로그인 + 회원가입 화면 : '/auth' -> Authentication
  // description : 검색화면 : '/search/:word -> Search
  // description : 게시물 상세보기 : '/board/detail/:boardNumber -> BoardDetail ex) /board/1
  // description : 게시물 작성하기 : '/board/write -> BoardWrite
  // description : 게시물 수정하기 : '/board/update/:boardNumber -> BoardUpdate ex) /board/update/1
  // description : 유저 페이지 : '/user/:email -> User

  return (
    <>
      {/* {lastestBoardListMock.map((item) => (
        <BoardListItemRendering boardlistItem={item} />
      ))} */}

      {/* <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
        {top3Item.map((item) => (
          <Top3Item top3ListItem={item}></Top3Item>
        ))}

      </div> */}
      {/* <div
        style={{
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        {commentList.map((item) => (
          <CommentList commentList={item} />
        ))}
      </div> */}
      {/* <div style={{ display: "flex", columnGap: "30px", rowGap: "20px" }}>
        {favoriteListMock.map((item) => (
          <FavoriteItem favoriteItem={item} />
        ))}
      </div> */}

      {/* <InputBox
        label="e-mail"
        type="text"
        placeholder="이메일 주소를 입력해 주세요"
        value={value}
        error={true}
        setValue={setValue}
        message="abcdefg"
      /> */}

      {/* <Header />
      <Footer /> */}
      <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH()} element={<Main />}></Route>
          <Route path={AUTH_PATH()} element={<Authentication />}></Route>
          <Route path={SEARCH_PATH(":searchWord")} element={<Search />}></Route>
          <Route path={USER_PATH(":userEmail")} element={<User />}></Route>
          <Route path={BOARD_PATH()}>
            <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />}></Route>
            <Route
              path={BOARD_DETAIL_PATH(":boardNumber")}
              element={<BoardDetail />}
            ></Route>
            <Route
              path={BOARD_UPDATE_PATH(":boardNumber")}
              element={<BoardUpdate />}
            ></Route>
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
