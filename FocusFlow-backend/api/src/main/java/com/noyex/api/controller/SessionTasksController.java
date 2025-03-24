package com.noyex.api.controller;

import com.noyex.auth.service.JwtService;
import com.noyex.data.model.SessionTasks;
import com.noyex.service.service.ISessionTasksService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/session-tasks")
public class SessionTasksController {

    private final ISessionTasksService sessionTasksService;
    private final JwtService jwtService;

    public SessionTasksController(ISessionTasksService sessionTasksService, JwtService jwtService) {
        this.sessionTasksService = sessionTasksService;
        this.jwtService = jwtService;
    }

    @PostMapping("/start/{sessionId}/{taskId}")
    public ResponseEntity<SessionTasks> startTask(HttpServletRequest request, @PathVariable Long sessionId, @PathVariable Long taskId) {
        Long userId = getUserIdFromToken(request);
        SessionTasks sessionTasks = sessionTasksService.startTask(sessionId, taskId);
        return ResponseEntity.ok(sessionTasks);
    }

    @PutMapping("/end/{sessionTasksId}")
    public ResponseEntity<SessionTasks> endTask(HttpServletRequest request, @PathVariable Long sessionTasksId) {
        Long userId = getUserIdFromToken(request);
        SessionTasks sessionTasks = sessionTasksService.endTask(sessionTasksId);
        return ResponseEntity.ok(sessionTasks);
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
