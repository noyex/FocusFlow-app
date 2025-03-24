package com.noyex.service.service;

import com.noyex.data.model.Session;

public interface ISessionService {
    Session startSession(Long userId);

    Session endSession(Long userId, Long sessionId);

    void pauseSession(Long userId, Long sessionId);

    void resumeSession(Long userId, Long sessionId);

    Session getSessionById(Long id);

    Session getCurrentSessionByUserId(Long userId);
}
