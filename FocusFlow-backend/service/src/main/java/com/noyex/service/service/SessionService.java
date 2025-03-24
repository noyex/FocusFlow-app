package com.noyex.service.service;

import com.noyex.data.model.Session;
import com.noyex.data.model.User;
import com.noyex.data.model.UserFocusDetails;
import com.noyex.data.repository.SessionRepository;
import com.noyex.data.repository.UserFocusDetailsRepository;
import com.noyex.data.repository.UserRepository;
import com.noyex.service.exceptions.SessionNotFoundException;
import com.noyex.service.exceptions.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class SessionService implements ISessionService {

    private final SessionRepository sessionRepository;
    private final UserRepository userRepository;
    private final UserFocusDetailsRepository userFocusDetailsRepository;

    public SessionService(SessionRepository sessionRepository, UserRepository userRepository, UserFocusDetailsRepository userFocusDetailsRepository) {
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
        this.userFocusDetailsRepository = userFocusDetailsRepository;
    }


    @Override
    public Session startSession(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new UserNotFoundException("User not found with id: " + userId);
        }
        UserFocusDetails userFocusDetails = userFocusDetailsRepository.findByUserId(userId);

        Session session = new Session();
        session.setUser(userFocusDetails);
        session.setStartTime(LocalDateTime.now());
        session.setRealStartTime(LocalDateTime.now());
        session.setWorkTime(0L);
        session.setBreakTime(0L);
        session.setTotalTime(0L);
        session.setTasksCompleted(0L);
        session.setActive(true);

        return sessionRepository.save(session);
    }

    @Override
    public Session endSession(Long userId, Long sessionId) {
        Session session = validateSession(userId, sessionId);
        session.setEndTime(LocalDateTime.now());

        long totalTimeMinutes = Duration.between(session.getRealStartTime(), session.getEndTime()).toMinutes();
        session.setTotalTime(totalTimeMinutes);

        long workTimeMinutes = Duration.between(session.getStartTime(), session.getEndTime()).toMinutes();
        session.setWorkTime(session.getWorkTime() + workTimeMinutes);

        session.setBreakTime(0L);
        session.setActive(false);
        return sessionRepository.save(session);
    }

    @Override
    public void pauseSession(Long userId, Long sessionId) {
        Session session = validateSession(userId, sessionId);
        session.setEndTime(LocalDateTime.now());

        long workTimeMinutes = Duration.between(session.getStartTime(), session.getEndTime()).toMinutes();
        session.setWorkTime(session.getWorkTime() + workTimeMinutes);

        sessionRepository.save(session);
    }

    @Override
    public void resumeSession(Long userId, Long sessionId) {
        Session session = validateSession(userId, sessionId);

        session.setStartTime(LocalDateTime.now());
        session.setEndTime(null);

        sessionRepository.save(session);
    }


    @Override
    public Session getSessionById(Long id) {
        Optional<Session> sessionOptional = sessionRepository.findById(id);
        if (sessionOptional.isEmpty()) {
            throw new SessionNotFoundException("Session not found with id: " + id);
        }
        return sessionOptional.get();
    }

    @Override
    public Session getCurrentSessionByUserId(Long userId) {
        return sessionRepository.findByUserIdAndIsActive(userId, true);
    }

    private Session validateSession(Long userId, Long sessionId){
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new UserNotFoundException("User not found with id: " + userId);
        }
        Optional<Session> sessionOptional = sessionRepository.findById(sessionId);
        if (sessionOptional.isEmpty()) {
            throw new SessionNotFoundException("Session not found with id: " + sessionId);
        }
        return sessionOptional.get();
    }
}
