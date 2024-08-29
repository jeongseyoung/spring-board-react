package com.simple.backend.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.simple.backend.dto.req.board.PostBoardRequestDto;
import com.simple.backend.dto.req.board.PostCommentRequestDto;
import com.simple.backend.dto.res.ResponseDto;
import com.simple.backend.dto.res.board.DeleteBoardResponseDto;
import com.simple.backend.dto.res.board.GetBoardResponseDto;
import com.simple.backend.dto.res.board.GetCommentListResponseDto;
import com.simple.backend.dto.res.board.GetFavoriteListResponseDto;
import com.simple.backend.dto.res.board.IncreaseViewCountResponseDto;
import com.simple.backend.dto.res.board.PostBoardResponseDto;
import com.simple.backend.dto.res.board.PostCommentResponseDto;
import com.simple.backend.dto.res.board.PutFavoriteResponseDto;
import com.simple.backend.entity.BoardEntity;
import com.simple.backend.entity.CommentEntity;
import com.simple.backend.entity.FavoriteEntity;
import com.simple.backend.entity.ImageEntity;
import com.simple.backend.repository.BoardRepository;
import com.simple.backend.repository.CommentRepository;
import com.simple.backend.repository.FavoriteRepository;
import com.simple.backend.repository.ImageRepository;
import com.simple.backend.repository.UserRepository;
import com.simple.backend.repository.resultSet.GetBoardResultSet;
import com.simple.backend.repository.resultSet.GetCommentListResultSet;
import com.simple.backend.repository.resultSet.GetFavoriteListResultSet;
import com.simple.backend.service.BoardService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;
    private final FavoriteRepository favoriteRepository;
    private final CommentRepository commentRepository;

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

    @Override
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber) {
        List<GetFavoriteListResultSet> resultSets = new ArrayList<>();
        try {
            if (!boardRepository.existsByBoardNumber(boardNumber))
                return GetFavoriteListResponseDto.noExistsBoard();
            resultSets = favoriteRepository.getFavoriteList(boardNumber);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetFavoriteListResponseDto.success(resultSets);
    }

    @Override
    public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {
        GetBoardResultSet resultSet = null;
        List<ImageEntity> imageEntitis = new ArrayList<>();
        try {
            // BoardEntity에는 user테이블의 nickname, profile_image가 없기 때문에
            // GetBoardResultSet(interface)를 따로 만들어서 받아와야 함.
            resultSet = boardRepository.getBoard(boardNumber);
            if (resultSet == null)
                return GetBoardResponseDto.noExistBoard();
            imageEntitis = imageRepository.findByBoardNumber(boardNumber);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetBoardResponseDto.success(resultSet, imageEntitis);
    }

    @Override
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email) {
        try {

            if (!userRepository.existsByEmail(email))
                return PutFavoriteResponseDto.notExistUser();
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if (boardEntity == null)
                return PutFavoriteResponseDto.notExistBoard();

            // 좋아요
            FavoriteEntity favoriteEntity = favoriteRepository.findByBoardNumberAndUserEmail(boardNumber, email);
            if (favoriteEntity == null) {
                favoriteEntity = new FavoriteEntity(email, boardNumber);
                favoriteRepository.save(favoriteEntity);
                boardEntity.increaseFavoriteCount();
            } else {
                favoriteRepository.delete(favoriteEntity);
                boardEntity.decreaseFavoriteCount();
            }
            boardRepository.save(boardEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PutFavoriteResponseDto.success();
    }

    @Override
    public ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber,
            String email) {
        try {
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if (boardEntity == null)
                return PostCommentResponseDto.noExistBoard();
            if (!userRepository.existsByEmail(email))
                return PostCommentResponseDto.noExistUser();

            CommentEntity commentEntity = new CommentEntity(dto, boardNumber, email);
            System.out.println("num :" + commentEntity.getCommentNumber());
            commentRepository.save(commentEntity);

            // commentcount +1
            boardEntity.increaseCommnetCount();
            boardRepository.save(boardEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PostCommentResponseDto.succes();
    }

    @Override
    public ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber) {
        List<GetCommentListResultSet> resultSets = new ArrayList<>();
        try {
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if (boardEntity == null)
                return GetCommentListResponseDto.noExistBoard();
            resultSets = commentRepository.getCommentList(boardNumber);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetCommentListResponseDto.success(resultSets);
    }

    @Override
    public ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(Integer boardNumber) {
        try {
            // 조회수 +1
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if (boardEntity == null)
                return IncreaseViewCountResponseDto.noExistBoard();

            boardEntity.increaseViewCount();
            boardRepository.save(boardEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return IncreaseViewCountResponseDto.success();
    }

    @Override
    public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email) {
        try {
            if (!userRepository.existsByEmail(email))
                return DeleteBoardResponseDto.noExistUser();

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if (boardEntity == null)
                return DeleteBoardResponseDto.noExistBoard();

            String writerEmail = boardEntity.getWriterEmail();
            if (!writerEmail.equals(email))
                return DeleteBoardResponseDto.noPermission();

            imageRepository.deleteByBoardNumber(boardNumber);
            commentRepository.deleteByBoardNumber(boardNumber);
            favoriteRepository.deleteByBoardNumber(boardNumber);

            boardRepository.delete(boardEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return DeleteBoardResponseDto.success();
    }

}
