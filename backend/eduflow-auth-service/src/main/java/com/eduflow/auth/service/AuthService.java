package com.eduflow.auth.service;

import com.eduflow.auth.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtUtil jwtUtil;
    public String login(String email, String password){
        if(email.equals("admin@gmail.com") && password.equals("12345")){
            return jwtUtil.generateToken(email);
        }
        return null;
    }
}
