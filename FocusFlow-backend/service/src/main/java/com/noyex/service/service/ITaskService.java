package com.noyex.service.service;

import com.noyex.data.model.DTOs.TaskDto;
import com.noyex.data.model.DTOs.UpdateTaskDto;
import com.noyex.data.model.Task;

import java.util.List;

public interface ITaskService {
    Task createTask(TaskDto taskDto, Long userId);
    Task getTaskById(Long taskId);
    Task updateTask(Long taskId, UpdateTaskDto taskDto);
    void deleteTask(Long taskId, Long userId);
    List<Task> getAllTasksByProjectId(Long projectId);
}
