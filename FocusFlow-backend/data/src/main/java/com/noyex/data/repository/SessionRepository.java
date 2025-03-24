package com.noyex.data.repository;

import com.noyex.data.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface SessionRepository extends JpaRepository<Session, Long> {
    Session findByUserIdAndIsActive(Long userId, boolean active);
}
