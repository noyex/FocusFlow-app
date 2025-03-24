package com.noyex.data.repository;

import com.noyex.data.model.Session;
import com.noyex.data.model.SessionTasks;
import com.noyex.data.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionTasksRepository extends JpaRepository<SessionTasks, Long> {
    SessionTasks findBySessionAndTask(Session session, Task task);
}
