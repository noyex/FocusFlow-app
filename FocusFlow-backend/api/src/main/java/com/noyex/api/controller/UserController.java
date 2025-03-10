package com.noyex.api.controller;

import com.noyex.auth.service.JwtService;
import com.noyex.data.model.DTOs.UserDto;
import com.noyex.data.model.DTOs.UserViewDto;
import com.noyex.data.model.User;
import com.noyex.service.service.IUserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final IUserService userService;
    private final JwtService jwtService;

    public UserController(IUserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserViewDto> authenticatedUser(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String jwt = authHeader.substring(7);
        String username = jwtService.extractUsername(jwt);

        UserViewDto userDTO = new UserViewDto();
        userDTO.setUsername(username);

        try {
            Long userId = jwtService.extractClaim(jwt, claims -> claims.get("userId", Long.class));
            String email = jwtService.extractClaim(jwt, claims -> claims.get("email", String.class));
            String role = jwtService.extractClaim(jwt, claims -> claims.get("role", String.class));

            if (userId != null) userDTO.setId(userId);
            if (email != null) userDTO.setEmail(email);
            if (role != null) userDTO.setRole(role);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody UserDto user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserDto user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}
