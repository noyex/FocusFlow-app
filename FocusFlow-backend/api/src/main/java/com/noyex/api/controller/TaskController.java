package com.noyex.api.controller;

import com.noyex.auth.service.JwtService;
import com.noyex.data.model.DTOs.TaskDto;
import com.noyex.data.model.DTOs.UpdateTaskDto;
import com.noyex.data.model.Task;
import com.noyex.service.service.ITaskService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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
        validateUser(id, request);
        Task task = taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody UpdateTaskDto taskDto, HttpServletRequest request) {
        validateUser(id, request);

        Task updatedTask = taskService.updateTask(id, taskDto);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id, HttpServletRequest request) {
        Long userId = getUserIdFromToken(request);
        validateUser(id, request);
        taskService.deleteTask(id, userId);
        return ResponseEntity.ok("Task deleted successfully");
    }

    @GetMapping("/all/{projectId}")
    public ResponseEntity<List<Task>> getAllTasksByProjectId(@PathVariable Long projectId, HttpServletRequest request) {
        validateUser(projectId, request);
        List<Task> tasks = taskService.getAllTasksByProjectId(projectId);
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/status/done/{taskId}")
    public ResponseEntity.BodyBuilder statusDone(@PathVariable Long taskId, HttpServletRequest request) {
        Long userId = getUserIdFromToken(request);
        taskService.statusDone(taskId, userId);
        return ResponseEntity.ok();
    }

    private Long getUserIdFromToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Authorization header is missing or invalid");
        }

        String jwt = authHeader.substring(7);
        return jwtService.extractClaim(jwt, claims -> claims.get("userId", Long.class));
    }

    private void validateUser(Long taskId, HttpServletRequest request) {
        Long userId = getUserIdFromToken(request);
        Task task = taskService.getTaskById(taskId);
        Long taskUserId = task.getProject().getUser().getId();
        if(userId != taskUserId) {
            throw new RuntimeException("User not authorized to access this task");
        }
    }


}
