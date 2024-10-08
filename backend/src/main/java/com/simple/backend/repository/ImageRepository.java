package com.simple.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;
import com.simple.backend.entity.ImageEntity;

import jakarta.transaction.Transactional;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {
    List<ImageEntity> findByBoardNumber(Integer boardNumber);

    @Transactional
    void deleteByBoardNumber(Integer boardNumber);
}