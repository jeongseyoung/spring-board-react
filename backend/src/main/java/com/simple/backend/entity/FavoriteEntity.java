package com.simple.backend.entity;

import com.simple.backend.entity.primaryKey.FavoritePk;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "favorite")
@Table(name = "favorite")
// @Id가 두 개 이상? -> JpaRepository에 두개 다 맵핑 하기위해 FavoritePk를 만들고 IdClass에 ㄱㄱ~,
// FavoritePk에 implements Serializable 필수
@IdClass(FavoritePk.class)
public class FavoriteEntity {
    @Id
    private String userEmail;
    @Id
    private int boardNumber;
}
