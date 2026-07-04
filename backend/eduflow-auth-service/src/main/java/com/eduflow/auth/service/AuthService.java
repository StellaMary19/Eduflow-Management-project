package com.eduflow.auth.service;

import com.eduflow.auth.entity.User;
import com.eduflow.auth.repository.UserRepository;
import com.eduflow.auth.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public String login(String email, String password){
        User user =  userRepository.findByEmail(email).orElse(null);
        if(user == null){
            return null;
        }
        if(passwordEncoder.matches(password, user.getPassword())){
            return jwtUtil.generateToken(user.getEmail());
        }
        return null;
    }

    public String register(String email, String password, String role){
        if(userRepository.existsByEmail(email)){
            return "User already exists";
        }

        User user = User.builder().email(email)
                .password(passwordEncoder.encode(password))
                .role(role)
                .build();
        userRepository.save(user);
        return "User Registered Successfully";
    }
}
