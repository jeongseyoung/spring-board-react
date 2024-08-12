package com.simple.backend.dto.obj;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentListItem {
    private String nickname;
    private String profileImage;
    private String writeDateTime;
    private String content;
}