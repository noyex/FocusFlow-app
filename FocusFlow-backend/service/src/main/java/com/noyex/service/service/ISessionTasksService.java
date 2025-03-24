package com.noyex.service.service;

import com.noyex.data.model.SessionTasks;

public interface ISessionTasksService {
    SessionTasks startTask(Long taskId, Long userId);
    SessionTasks endTask(Long sessionTasksId);
}
