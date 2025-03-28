package com.noyex.data.repository;

import com.noyex.data.model.Session;
import com.noyex.data.model.SessionTasks;
import com.noyex.data.model.Task;
import com.noyex.data.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionTasksRepository extends JpaRepository<SessionTasks, Long> {
    SessionTasks findBySessionAndTask(Session session, Task task);
    SessionTasks findBySessionIdAndIsActive(Long sessionId, boolean isActive);
}
