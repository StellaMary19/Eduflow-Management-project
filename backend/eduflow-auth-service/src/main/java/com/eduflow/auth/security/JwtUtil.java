package com.eduflow.auth.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {
    private final SecretKey secretKey =
            Keys.hmacShaKeyFor(
                    "eduflow-secret-key-eduflow-secret-key".getBytes()
            );
    public String generateToken(String email){
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()+1000*60*60
                        )
                )
                .signWith(secretKey)
                .compact();
    }
}
