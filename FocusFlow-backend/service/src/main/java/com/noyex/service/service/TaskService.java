package com.noyex.service.service;

import com.noyex.data.model.DTOs.TaskDto;
import com.noyex.data.model.DTOs.UpdateTaskDto;
import com.noyex.data.model.DTOs.UserDto;
import com.noyex.data.model.Project;
import com.noyex.data.model.Task;
import com.noyex.data.model.User;
import com.noyex.data.model.UserFocusDetails;
import com.noyex.data.model.enums.Priority;
import com.noyex.data.model.enums.Status;
import com.noyex.data.repository.ProjectRepository;
import com.noyex.data.repository.TaskRepository;
import com.noyex.data.repository.UserFocusDetailsRepository;
import com.noyex.data.repository.UserRepository;
import com.noyex.service.exceptions.ProjectNotFoundException;
import com.noyex.service.exceptions.TaskNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService implements ITaskService{


    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final UserFocusDetailsRepository userFocusDetailsRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository, ProjectRepository projectRepository, UserFocusDetailsRepository userFocusDetailsRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.userFocusDetailsRepository = userFocusDetailsRepository;
    }


    @Override
    public Task createTask(TaskDto taskDto, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        UserFocusDetails userFocusDetails =  userFocusDetailsRepository.findByUserId(userId);

        Optional<Project> project = projectRepository.findById(taskDto.getProjectId());
        if (project.isEmpty()) {
            throw new ProjectNotFoundException("Project not found");
        }
        if(user.isPresent()) {
            Task task = new Task();
            Project existingProject = project.get();
            task.setName(taskDto.getName());

            String priority = taskDto.getPriority();
            setPriority(task, priority);

            task.setProject(existingProject);
            task.setCompleted(false);
            task.setEstimatedTime(taskDto.getEstimatedTime());
            task.setActualStartTime(LocalDateTime.now());
            task.setActualEndTime(null);

            existingProject.setTotalTasks(existingProject.getTotalTasks() + 1);
            projectRepository.save(existingProject);

            userFocusDetails.setTotalTasksOngoing(userFocusDetails.getTotalTasksOngoing() + 1);
            userFocusDetailsRepository.save(userFocusDetails);

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
    public Task updateTask(Long taskId, UpdateTaskDto taskDto) {
        Optional<Task> task = taskRepository.findById(taskId);
        if(task.isPresent()) {
            Task existingTask = task.get();
            String priority = taskDto.getPriority();
            setPriority(existingTask, priority);
            existingTask.setName(taskDto.getName());
            existingTask.setEstimatedTime(taskDto.getEstimatedTime());

            return taskRepository.save(existingTask);
        } else {
            throw new TaskNotFoundException("Task not found");
        }

    }

    @Override
    public void deleteTask(Long taskId, Long userId) {
        Optional<Task> task = taskRepository.findById(taskId);
        if(task.isEmpty()) {
            throw new TaskNotFoundException("Task not found");
        }
        UserFocusDetails userFocusDetails = userFocusDetailsRepository.findByUserId(userId);
        String taskStatus = task.get().getStatus().toString();
        if(taskStatus.equals("IN_PROGRESS") || taskStatus.equals("TO_DO")) {
            userFocusDetails.setTotalTasksOngoing(userFocusDetails.getTotalTasksOngoing() - 1);
            userFocusDetailsRepository.save(userFocusDetails);
        }
        taskRepository.deleteById(taskId);
    }

    @Override
    public List<Task> getAllTasksByProjectId(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    @Override
    public void statusInProgress(Long taskId) {
        Optional<Task> task = taskRepository.findById(taskId);
        if(task.isPresent()) {
            Task existingTask = task.get();
            existingTask.setStatus(Status.IN_PROGRESS);
            taskRepository.save(existingTask);
        } else {
            throw new TaskNotFoundException("Task not found");
        }
    }

    @Override
    public void statusDone(Long taskId) {
        Optional<Task> task = taskRepository.findById(taskId);
        if(task.isPresent()) {
            Task existingTask = task.get();
            existingTask.setStatus(Status.DONE);
            existingTask.setActualEndTime(LocalDateTime.now());
            taskRepository.save(existingTask);
        } else {
            throw new TaskNotFoundException("Task not found");
        }
    }

    private void setPriority(Task task, String priority) {
        if (priority.equalsIgnoreCase("HIGH")) {
            task.setPriority(Priority.HIGH);
        } else if (priority.equalsIgnoreCase("MEDIUM")) {
            task.setPriority(Priority.MEDIUM);
        } else if (priority.equalsIgnoreCase("LOW")) {
            task.setPriority(Priority.LOW);
        } else {
            throw new RuntimeException("Invalid priority");
        }
    }
}
