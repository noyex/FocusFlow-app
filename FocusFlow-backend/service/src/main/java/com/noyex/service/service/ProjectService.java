package com.noyex.service.service;

import com.noyex.auth.service.JwtService;
import com.noyex.data.model.DTOs.ProjectDto;
import com.noyex.data.model.Project;
import com.noyex.data.model.User;
import com.noyex.data.repository.ProjectRepository;
import com.noyex.data.repository.UserRepository;
import com.noyex.service.exceptions.ProjectNotFoundException;
import com.noyex.service.exceptions.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService implements IProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Project createProject(ProjectDto projectDto, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            Project project = new Project();
            project.setName(projectDto.getName());
            project.setDescription(projectDto.getDescription());
            project.setUser(user.get());
            project.setCreatedAt(LocalDateTime.now());
            project.setStartDate(null);
            project.setEndDate(projectDto.getEndDate());
            project.setCompleted(false);
            return projectRepository.save(project);
        } else {
            throw new UserNotFoundException("User not found");
        }

    }

    @Override
    public Project getProjectById(Long id) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isPresent()) {
            return project.get();
        } else {
            throw new ProjectNotFoundException("Project not found");
        }
    }

    @Override
    public Project updateProject(Long projectId, ProjectDto projectDto) {
        Optional<Project> project = projectRepository.findById(projectId);
        if (project.isPresent()) {
            Project existingProject = project.get();
            existingProject.setName(projectDto.getName());
            existingProject.setDescription(projectDto.getDescription());
            existingProject.setEndDate(projectDto.getEndDate());
            return projectRepository.save(existingProject);
        } else {
            throw new ProjectNotFoundException("Project not found");
        }
    }

    @Override
    public void deleteProject(Long projectId) {
        Optional<Project> project = projectRepository.findById(projectId);
        if (project.isPresent()) {
            projectRepository.delete(project.get());
        } else {
            throw new ProjectNotFoundException("Project not found");
        }
    }

    @Override
    public List<Project> getAllProjectsByUserId(Long userId) {
        return projectRepository.findByUserId(userId);
    }
}
