package com.eduflow.auth.controller;

import com.eduflow.auth.dto.LoginRequest;
import com.eduflow.auth.dto.LoginResponse;
import com.eduflow.auth.dto.RegisterRequest;
import com.eduflow.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
//@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    public AuthController( AuthService authService){
        this.authService = authService;
    }
    @PostMapping("/test")
    public String test(){
        return "Hello World";
    }
    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request){
        String token = authService.login(
                request.getEmail(),
                request.getPassword()
        );
        if(token != null){
            return new LoginResponse(
                    token,
                    "Login Success");
        }
        return new LoginResponse(null, "Login Failed");
    }

    @PostMapping("register")
    public String register(@Valid @RequestBody RegisterRequest registerRequest){
        return authService.register(
                registerRequest.getEmail(),
                registerRequest.getPassword(),
                registerRequest.getRole()
        );
    }

}
