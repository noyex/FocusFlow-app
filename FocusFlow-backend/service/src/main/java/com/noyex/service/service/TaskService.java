package com.noyex.service.service;

import com.noyex.data.model.DTOs.TaskDto;
import com.noyex.data.model.DTOs.UserDto;
import com.noyex.data.model.Project;
import com.noyex.data.model.Task;
import com.noyex.data.model.User;
import com.noyex.data.repository.ProjectRepository;
import com.noyex.data.repository.TaskRepository;
import com.noyex.data.repository.UserRepository;
import com.noyex.service.exceptions.ProjectNotFoundException;
import com.noyex.service.exceptions.TaskNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService implements ITaskService{


    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }


    @Override
    public Task createTask(TaskDto taskDto, Long userId) {
        Optional<User> user = userRepository.findById(userId);

        Optional<Project> project = projectRepository.findById(taskDto.getProjectId());
        if (project.isEmpty()) {
            throw new ProjectNotFoundException("Project not found");
        }
        if(user.isPresent()) {
            Task task = new Task();
            task.setName(taskDto.getName());
            task.setProject(project.get());
            task.setCompleted(false);
            task.setEstimatedTime(taskDto.getEstimatedTime());

            return taskRepository.save(task);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public Task getTaskById(Long taskId) {
        Optional<Task> task = taskRepository.findById(taskId);
        if(task.isEmpty()) {
            throw new TaskNotFoundException("Task not found");
        }
        return task.get();
    }

    @Override
    public Task updateTask(Long taskId, TaskDto taskDto) {
        Optional<Task> task = taskRepository.findById(taskId);
        if(task.isPresent()) {
            Task existingTask = task.get();
            existingTask.setName(taskDto.getName());
            existingTask.setEstimatedTime(taskDto.getEstimatedTime());
            return taskRepository.save(existingTask);
        } else {
            throw new TaskNotFoundException("Task not found");
        }

    }

    @Override
    public void deleteTask(Long taskId) {
        Optional<Task> task = taskRepository.findById(taskId);
        if(task.isPresent()) {
            taskRepository.deleteById(taskId);
        } else {
            throw new TaskNotFoundException("Task not found");
        }
    }

    @Override
    public List<Task> getAllTasksByProjectId(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }
}
