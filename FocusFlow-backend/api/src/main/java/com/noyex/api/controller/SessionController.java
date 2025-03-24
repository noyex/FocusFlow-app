package com.noyex.api.controller;

import com.noyex.auth.service.JwtService;
import com.noyex.data.model.Session;
import com.noyex.service.service.ISessionService;
import com.noyex.service.service.SessionService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final ISessionService sessionService;
    private final JwtService jwtService;

    public SessionController(ISessionService sessionService, JwtService jwtService) {
        this.sessionService = sessionService;
        this.jwtService = jwtService;
    }

    @PostMapping("/start")
    public ResponseEntity<Session> startSession(HttpServletRequest request) {
        Long userId = getUserIdFromToken(request);
        Session session = sessionService.startSession(userId);
        return ResponseEntity.ok(session);
    }

    @PutMapping("/end/{sessionId}")
    public Session endSession(HttpServletRequest request, @PathVariable Long sessionId) {
        Long userId = getUserIdFromToken(request);
        return sessionService.endSession(userId, sessionId);
    }

    @PutMapping("/pause/{sessionId}")
    public void pauseSession(HttpServletRequest request, @PathVariable Long sessionId) {
        Long userId = getUserIdFromToken(request);
        sessionService.pauseSession(userId, sessionId);
    }

    @PutMapping("/resume/{sessionId}")
    public void resumeSession(HttpServletRequest request, @PathVariable Long sessionId) {
        Long userId = getUserIdFromToken(request);
        sessionService.resumeSession(userId, sessionId);
    }

    @GetMapping("/{sessionId}")
    public Session getSessionById(@PathVariable Long sessionId, HttpServletRequest request) {
        Long userId = getUserIdFromToken(request);
        return sessionService.getSessionById(sessionId);
    }




    private Long getUserIdFromToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Authorization header is missing or invalid");
        }

        String jwt = authHeader.substring(7);
        return jwtService.extractClaim(jwt, claims -> claims.get("userId", Long.class));
    }
}
