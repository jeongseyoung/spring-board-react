package com.simple.backend.repository.resultSet;

public interface GetCommentListResultSet {
    // SELECT U.nickname AS nickname, U.profile_image AS profile_image,
    // C.write_datetime AS write_datetime, C.content AS content
    String getNickname();

    String getProfileImage();

    String getWriteDatetime();

    String getContent();
}
