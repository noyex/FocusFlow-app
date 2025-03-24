package com.noyex.service.service;

import com.noyex.data.model.SessionTasks;

public interface ISessionTasksService {
    SessionTasks startTask(Long sessionId, Long taskId);
    SessionTasks endTask(Long sessionTasksId);
}
