package com.simple.backend.dto.obj;

import java.util.ArrayList;
import java.util.List;

import com.simple.backend.repository.resultSet.GetCommentListResultSet;

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

    public CommentListItem(GetCommentListResultSet resultSets) {
        this.nickname = resultSets.getNickname();
        this.profileImage = resultSets.getProfileImage();
        this.writeDateTime = resultSets.getWriteDatetime();
        this.content = resultSets.getContent();
    }

    public static List<CommentListItem> copyList(List<GetCommentListResultSet> resultSets) {
        List<CommentListItem> list = new ArrayList<>();
        for (GetCommentListResultSet c : resultSets) {
            list.add(new CommentListItem(c));
        }
        return list;
    }
}
