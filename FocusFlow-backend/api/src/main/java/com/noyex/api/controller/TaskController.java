package com.noyex.api.controller;

import com.noyex.auth.service.JwtService;
import com.noyex.data.model.DTOs.TaskDto;
import com.noyex.data.model.Task;
import com.noyex.service.exceptions.TaskNotFoundException;
import com.noyex.service.service.ITaskService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final ITaskService taskService;
    private final JwtService jwtService;

    public TaskController(ITaskService taskService, JwtService jwtService) {
        this.taskService = taskService;
        this.jwtService = jwtService;
    }

    @PostMapping("/create")
    public ResponseEntity<Task> createTask(@RequestBody TaskDto taskDto, HttpServletRequest request) {
        Long userId = getUserIdFromToken(request);
        Task task = taskService.createTask(taskDto, userId);
        return ResponseEntity.ok(task);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id, HttpServletRequest request) {
        Long userId = getUserIdFromToken(request);

        Task task = taskService.getTaskById(id);
        Long taskUserId = task.getProject().getUser().getId();
        if(userId != taskUserId) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(task);
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
