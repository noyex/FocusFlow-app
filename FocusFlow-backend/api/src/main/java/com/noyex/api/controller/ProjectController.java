package com.noyex.api.controller;

import com.noyex.auth.service.JwtService;
import com.noyex.data.model.DTOs.ProjectDto;
import com.noyex.data.model.Project;
import com.noyex.service.service.IProjectService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final IProjectService projectService;
    private final JwtService jwtService;

    public ProjectController(IProjectService projectService, JwtService jwtService) {
        this.projectService = projectService;
        this.jwtService = jwtService;
    }

    @PostMapping("/create")
    public ResponseEntity<Project> createProject(@RequestBody ProjectDto projectDto, HttpServletRequest request){
        Long userId = getUserIdFromToken(request);
        Project project = projectService.createProject(projectDto, userId);
        return ResponseEntity.ok(project);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id, HttpServletRequest request) {
        Long currentUserId = getUserIdFromToken(request);

        Project project = projectService.getProjectById(id);
        Long projectUserId = project.getUser().getId();

        if(currentUserId != projectUserId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(project);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Project>> getAllProjectsByUserId(HttpServletRequest request) {
        Long userId = getUserIdFromToken(request);
        List<Project> projects = projectService.getAllProjectsByUserId(userId);
        return ResponseEntity.ok(projects);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody ProjectDto projectDto, HttpServletRequest request) {
        Long userId = getUserIdFromToken(request);
        Project project = projectService.getProjectById(id);
        Long projectUserId = project.getUser().getId();
        if(userId != projectUserId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Project updatedProject = projectService.updateProject(id, projectDto);
        return ResponseEntity.ok(updatedProject);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id, HttpServletRequest request) {
        Long userId = getUserIdFromToken(request);
        Project project = projectService.getProjectById(id);
        Long projectUserId = project.getUser().getId();
        if(userId != projectUserId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        projectService.deleteProject(id);
        return ResponseEntity.ok("Project deleted successfully");
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
