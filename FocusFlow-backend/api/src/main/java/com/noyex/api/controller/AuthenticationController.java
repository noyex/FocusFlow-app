package com.noyex.api.controller;

import com.noyex.api.responses.LoginResponse;
import com.noyex.auth.service.AuthenticationService;
import com.noyex.auth.service.JwtService;
import com.noyex.data.model.DTOs.LoginUserDto;
import com.noyex.data.model.DTOs.RegisterUserDto;
import com.noyex.data.model.DTOs.VerifyUserDto;
import com.noyex.data.model.User;
import com.noyex.data.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signUp(@RequestBody RegisterUserDto registerUserDto) {
        User user = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDTO){
        User authenticatedUser = authenticationService.authenticate(loginUserDTO);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
//        authenticatedUser.setLastLoginDate(LocalDateTime.now());
//        userRepository.save(authenticatedUser);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto){
        try{
            authenticationService.verifyUser(verifyUserDto);
            return ResponseEntity.ok("Account verified succefully");
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestBody String email){
        try{
            authenticationService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
