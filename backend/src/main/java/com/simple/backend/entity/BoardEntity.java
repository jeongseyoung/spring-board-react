package com.simple.backend.entity;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

import com.simple.backend.dto.req.board.PatchBoardRequestDto;
import com.simple.backend.dto.req.board.PostBoardRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "board")
@Table(name = "board")
public class BoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardNumber;
    private String title;
    private String content;
    private String writeDatetime;
    private int favoriteCount;
    private int commentCount;
    private int viewCount;
    private String writerEmail;

    public BoardEntity(PostBoardRequestDto dto, String email) {

        Date now = Date.from(Instant.now());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String writeDatetime = simpleDateFormat.format(now);

        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.writeDatetime = writeDatetime;
        this.favoriteCount = 0;
        this.commentCount = 0;
        this.viewCount = 0;
        this.writerEmail = email;

    }

    public void increaseViewCount() {
        this.viewCount += 1;
    }

    public void increaseFavoriteCount() {
        this.favoriteCount++;
        System.out.println("f 1증가");
    }

    public void decreaseFavoriteCount() {
        this.favoriteCount--;
        System.out.println("f 1감소");

    }

    public void increaseCommnetCount() {
        this.commentCount++;
    }

    public void decreaseCommnetCount() {
        this.commentCount--;
    }

    public void patchBoard(PatchBoardRequestDto dto) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
    }
}
