package com.simple.backend.dto.res.board;

import lombok.Getter;
import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.simple.backend.common.ResponseCode;
import com.simple.backend.common.ResponseMessage;
import com.simple.backend.dto.res.ResponseDto;
import com.simple.backend.entity.ImageEntity;
import com.simple.backend.repository.resultSet.GetBoardResultSet;

@Getter
public class GetBoardResponseDto extends ResponseDto {
    private int boardNumber;
    private String title;
    private String content;
    private List<String> boardImageList;
    private String writeDatetime;
    private String writerEmail;
    private String writerNickname;
    private String writerProfileImage;

    private GetBoardResponseDto(GetBoardResultSet resultSet, List<ImageEntity> imageEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        List<String> boardImageList = new ArrayList<>();
        for (ImageEntity imageEntity : imageEntities) {
            boardImageList.add(imageEntity.getImage());
        }

        this.boardNumber = resultSet.getBoardNumber();
        this.title = resultSet.getTitle();
        this.content = resultSet.getContent();
        this.boardImageList = boardImageList;
        this.writeDatetime = resultSet.getWriteDatetime();
        this.writerEmail = resultSet.getWriterEmail();
        this.writerNickname = resultSet.getWriterNickname();
        this.writerProfileImage = resultSet.getWriterProfileImage();
    }

    // 게시물 등록 성공
    public static ResponseEntity<GetBoardResponseDto> success(GetBoardResultSet resultSet,
            List<ImageEntity> imageEntities) {
        return ResponseEntity.ok().body(new GetBoardResponseDto(resultSet, imageEntities));
    }

    // 존재하지 않는 게시물
    public static ResponseEntity<ResponseDto> noExistBoard() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ResponseDto(ResponseCode.NOT_FOUND_BOARD, ResponseMessage.NOT_FOUND_BOARD));
    }
}
