package com.noyex.data.repository;

import com.noyex.data.model.UserFocusDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserFocusDetailsRepository extends JpaRepository<UserFocusDetails, Long> {
    UserFocusDetails findByUserId(Long userId);

    void deleteByUserId(Long userId);
}
