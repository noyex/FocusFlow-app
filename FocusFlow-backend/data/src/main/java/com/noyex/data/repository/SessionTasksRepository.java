package com.noyex.data.repository;

import com.noyex.data.model.SessionTasks;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionTasksRepository extends JpaRepository<SessionTasks, Long> {
}
