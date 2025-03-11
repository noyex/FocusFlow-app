package com.noyex.service.service;

import com.noyex.data.model.DTOs.ProjectDto;
import com.noyex.data.model.Project;

import java.util.List;

public interface IProjectService {
    Project createProject(ProjectDto projectDto, Long userId);
    Project getProjectById(Long id);
    Project updateProject(Long projectId, ProjectDto projectDto);
    void deleteProject(Long projectId);
    List<Project> getAllProjectsByUserId(Long userId);
}
