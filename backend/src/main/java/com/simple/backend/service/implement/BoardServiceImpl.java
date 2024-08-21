package com.simple.backend.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.simple.backend.dto.req.board.PostBoardRequestDto;
import com.simple.backend.dto.res.ResponseDto;
import com.simple.backend.dto.res.board.PostBoardResponseDto;
import com.simple.backend.entity.BoardEntity;
import com.simple.backend.entity.ImageEntity;
import com.simple.backend.repository.BoardRepository;
import com.simple.backend.repository.ImageRepository;
import com.simple.backend.repository.UserRepository;
import com.simple.backend.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;

    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {

        try {
            // 이메일 체크
            if (!userRepository.existsByEmail(email))
                return PostBoardResponseDto.notExistUser();

            BoardEntity boardEntity = new BoardEntity(dto, email);

            // 저장(게시물 등록)
            boardRepository.save(boardEntity);

            int boardNumber = boardEntity.getBoardNumber();

            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntities = new ArrayList<>();
            for (String image : boardImageList) {
                ImageEntity imageEntity = new ImageEntity(boardNumber, image);
                imageEntities.add(imageEntity);
            }

            imageRepository.saveAll(imageEntities);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PostBoardResponseDto.success();
    }

}
