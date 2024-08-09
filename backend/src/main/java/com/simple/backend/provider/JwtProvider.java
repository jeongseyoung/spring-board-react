package com.simple.backend.provider;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtProvider {

    private String secretKey = "SS2S333";

    public String create(String email) {

        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        return Jwts.builder().signWith(SignatureAlgorithm.HS256, secretKey)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(expiredDate)
                .compact();
    }

    public String validtae(String jwt) {
        Claims claims = null;
        claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwt).getBody();
        return claims.getSubject();
    }
}