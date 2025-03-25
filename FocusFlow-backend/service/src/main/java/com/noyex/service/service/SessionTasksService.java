package com.noyex.service.service;

import com.noyex.data.model.Session;
import com.noyex.data.model.SessionTasks;
import com.noyex.data.model.Task;
import com.noyex.data.model.enums.Status;
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
    private final ISessionService sessionService;

    public SessionTasksService(SessionRepository sessionRepository, TaskRepository taskRepository, SessionTasksRepository sessionTasksRepository, ISessionService sessionService) {
        this.sessionRepository = sessionRepository;
        this.taskRepository = taskRepository;
        this.sessionTasksRepository = sessionTasksRepository;
        this.sessionService = sessionService;
    }


    @Override
    public SessionTasks startTask(Long taskId, Long userId) {
        SessionTasks sessionTasks = new SessionTasks();

        // sprawdzamy czy task istnieje i ustawiamy
        Optional<Task> taskOptional = taskRepository.findById(taskId);
        if (taskOptional.isEmpty()) {
            throw new TaskNotFoundException("Task not found with id: " + taskId);
        }
        Task task = taskOptional.get();
        task.setStatus(Status.IN_PROGRESS);
        sessionTasks.setTask(task);
        sessionTasks.setActive(true);

        sessionTasks.setStartTime(LocalDateTime.now());
        sessionTasks.setTotalTime(0L);

        // sprawdzamy czy jest juz aktywna sesja i ustawiamy sesje do sessionTasks
        Session session = sessionService.getCurrentSessionByUserId(userId);
        if (session == null) {
            Session newSession = sessionService.startSession(userId);
            sessionTasks.setSession(newSession);
            return sessionTasksRepository.save(sessionTasks);
        }
        sessionTasks.setSession(session);

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
        sessionTasks.setActive(false);
        return sessionTasksRepository.save(sessionTasks);
    }

    @Override
    public SessionTasks getActiveSessionTasksByUserId(Long userId) {
        Session session = sessionService.getCurrentSessionByUserId(userId);
        if(session == null) {
            return null;
        }
        SessionTasks sessionTasks = sessionTasksRepository.findBySessionIdAndIsActive(session.getId(), true);
        if(sessionTasks == null) {
            return null;
        }
        return sessionTasks;
    }


}
