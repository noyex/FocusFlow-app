package com.noyex.service.service;

import com.noyex.data.model.Session;
import com.noyex.data.model.SessionTasks;
import com.noyex.data.model.Task;
import com.noyex.data.repository.SessionRepository;
import com.noyex.data.repository.SessionTasksRepository;
import com.noyex.data.repository.TaskRepository;
import com.noyex.service.exceptions.SessionNotFoundException;
import com.noyex.service.exceptions.TaskNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class SessionTasksService implements ISessionTasksService {

    private final SessionRepository sessionRepository;
    private final TaskRepository taskRepository;
    private final SessionTasksRepository sessionTasksRepository;

    public SessionTasksService(SessionRepository sessionRepository, TaskRepository taskRepository, SessionTasksRepository sessionTasksRepository) {
        this.sessionRepository = sessionRepository;
        this.taskRepository = taskRepository;
        this.sessionTasksRepository = sessionTasksRepository;
    }


    @Override
    public SessionTasks startTask(Long sessionId, Long taskId) {
        Optional<Session> sessionOptional = sessionRepository.findById(sessionId);
        if (sessionOptional.isEmpty()) {
            throw new SessionNotFoundException("Session not found with id: " + sessionId);
        }
        Session session = sessionOptional.get();
        SessionTasks sessionTasks = new SessionTasks();
        sessionTasks.setSession(session);
        Optional<Task> taskOptional = taskRepository.findById(taskId);
        if (taskOptional.isEmpty()) {
            throw new TaskNotFoundException("Task not found with id: " + taskId);
        }
        sessionTasks.setTask(taskOptional.get());
        sessionTasks.setStartTime(LocalDateTime.now());
        sessionTasks.setTotalTime(0L);
        return sessionTasksRepository.save(sessionTasks);
    }

    @Override
    public SessionTasks endTask(Long sessionTasksId) {
        Optional<SessionTasks> sessionTasksOptional = sessionTasksRepository.findById(sessionTasksId);
        if (sessionTasksOptional.isEmpty()) {
            throw new SessionNotFoundException("Session task not found with id: " + sessionTasksId);
        }
        SessionTasks sessionTasks = sessionTasksOptional.get();
        sessionTasks.setEndTime(LocalDateTime.now());
        Long duration = Duration.between(sessionTasks.getStartTime(), sessionTasks.getEndTime()).toMinutes();
        sessionTasks.setTotalTime(duration);
        return sessionTasksRepository.save(sessionTasks);
    }
}
