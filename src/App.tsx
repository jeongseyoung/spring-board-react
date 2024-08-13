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
function App() {
  const [value, setValue] = useState<string>("");
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

      <Header />
      <Footer />
    </>
  );
}

export default App;
