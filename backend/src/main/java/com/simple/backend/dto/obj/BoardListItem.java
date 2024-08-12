package com.simple.backend.dto.obj;

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
    private String writeDatetim;
    private String writerNickname;
    private String writerProfileImage;
}
