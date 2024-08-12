import React from "react";
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
function App() {
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
      {favoriteListMock.map((item) => (
        <FavoriteItem favoriteItem={item} />
      ))}
    </>
  );
}

export default App;
