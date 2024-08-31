package com.simple.backend.dto.obj;

import java.util.ArrayList;
import java.util.List;

import com.simple.backend.entity.BoardListViewEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BoardListItem {
    private int boardNumber;
    private String title;
    private String content;
    private String boardTitleImage;
    private int favoriteCnt;
    private int viewCnt;
    private String writeDatetime;
    private String writerNickname;
    private String writerProfileImage;

    public BoardListItem(BoardListViewEntity boardListViewEntities) {
        this.boardNumber = boardListViewEntities.getBoardNumber();
        this.title = boardListViewEntities.getTitle();
        this.content = boardListViewEntities.getContent();
        this.boardTitleImage = boardListViewEntities.getTitleImage();
        this.favoriteCnt = boardListViewEntities.getFavoriteCount();
        this.viewCnt = boardListViewEntities.getViewCount();
        this.writeDatetime = boardListViewEntities.getWriteDatetime();
        this.writerNickname = boardListViewEntities.getWriterNickname();
        this.writerProfileImage = boardListViewEntities.getWriterProfileImage();
    }

    public static List<BoardListItem> getList(List<BoardListViewEntity> boardListViewEntities) {
        List<BoardListItem> list = new ArrayList<>();
        for (BoardListViewEntity b : boardListViewEntities) {
            list.add(new BoardListItem(b));
        }
        return list;
    }
}
