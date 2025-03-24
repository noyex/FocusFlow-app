package com.noyex.data.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "sessions")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_details_id", nullable = false)
    private UserFocusDetails user;

    @Column(name = "tasks_completed")
    private Long tasksCompleted = 0L;

    @Column(name = "real_start_time")
    private LocalDateTime realStartTime;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "total_time", nullable = false)
    private Long totalTime = 0L;

    @Column(name = "work_time", nullable = false)
    private Long workTime;

    @Column(name = "break_time", nullable = false)
    private Long breakTime;

    boolean isActive;


    public Session() {
    }

    public Session(Long id, UserFocusDetails user, Long tasksCompleted, LocalDateTime realStartTime, LocalDateTime startTime, LocalDateTime endTime, Long totalTime, Long workTime, Long breakTime, boolean isActive) {
        this.id = id;
        this.user = user;
        this.tasksCompleted = tasksCompleted;
        this.realStartTime = realStartTime;
        this.startTime = startTime;
        this.endTime = endTime;
        this.totalTime = totalTime;
        this.workTime = workTime;
        this.breakTime = breakTime;
        this.isActive = isActive;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Long getTasksCompleted() {
        return tasksCompleted;
    }

    public void setTasksCompleted(Long tasksCompleted) {
        this.tasksCompleted = tasksCompleted;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public Long getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(Long totalTime) {
        this.totalTime = totalTime;
    }

    public Long getWorkTime() {
        return workTime;
    }

    public void setWorkTime(Long workTime) {
        this.workTime = workTime;
    }

    public Long getBreakTime() {
        return breakTime;
    }

    public void setBreakTime(Long breakTime) {
        this.breakTime = breakTime;
    }


    public UserFocusDetails getUser() {
        return user;
    }

    public void setUser(UserFocusDetails user) {
        this.user = user;
    }

    public LocalDateTime getRealStartTime() {
        return realStartTime;
    }

    public void setRealStartTime(LocalDateTime realStartTime) {
        this.realStartTime = realStartTime;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
