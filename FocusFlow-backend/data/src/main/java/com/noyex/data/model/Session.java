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
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne
    @JoinColumn(name = "user_details_id", nullable = false)
    private UserFocusDetails user;

    @Column(name = "tasks_completed")
    private Long tasksCompleted = 0L;

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

    @Column(name = "is_pomodoro_used")
    private boolean isPomodoroUsed;

    @Column(name = "pomodoro_time")
    private Long pomodoroTime;

    @Column(name = "is_ninety_used")
    private boolean isNinetyUsed;

    @Column(name = "ninety_time")
    private Long ninetyTime;

    @Column(name = "is_fifty_used")
    private boolean isFiftyUsed;

    @Column(name = "fifty_time")
    private Long fiftyTime;

    @Column(name = "is_no_method_used")
    private boolean isNoMethodUsed;

    @Column(name = "no_method_time")
    private Long noMethodTime;

    public Session() {
    }

    public Session(Long id, Project project, UserFocusDetails user, Long tasksCompleted, LocalDateTime startTime, LocalDateTime endTime, Long totalTime, Long workTime, Long breakTime, boolean isPomodoroUsed, Long pomodoroTime, boolean isNinetyUsed, Long ninetyTime, boolean isFiftyUsed, Long fiftyTime, boolean isNoMethodUsed, Long noMethodTime) {
        this.id = id;
        this.project = project;
        this.user = user;
        this.tasksCompleted = tasksCompleted;
        this.startTime = startTime;
        this.endTime = endTime;
        this.totalTime = totalTime;
        this.workTime = workTime;
        this.breakTime = breakTime;
        this.isPomodoroUsed = isPomodoroUsed;
        this.pomodoroTime = pomodoroTime;
        this.isNinetyUsed = isNinetyUsed;
        this.ninetyTime = ninetyTime;
        this.isFiftyUsed = isFiftyUsed;
        this.fiftyTime = fiftyTime;
        this.isNoMethodUsed = isNoMethodUsed;
        this.noMethodTime = noMethodTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
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

    public boolean isPomodoroUsed() {
        return isPomodoroUsed;
    }

    public void setPomodoroUsed(boolean pomodoroUsed) {
        isPomodoroUsed = pomodoroUsed;
    }

    public Long getPomodoroTime() {
        return pomodoroTime;
    }

    public void setPomodoroTime(Long pomodoroTime) {
        this.pomodoroTime = pomodoroTime;
    }

    public boolean isNinetyUsed() {
        return isNinetyUsed;
    }

    public void setNinetyUsed(boolean ninetyUsed) {
        isNinetyUsed = ninetyUsed;
    }

    public Long getNinetyTime() {
        return ninetyTime;
    }

    public void setNinetyTime(Long ninetyTime) {
        this.ninetyTime = ninetyTime;
    }

    public boolean isFiftyUsed() {
        return isFiftyUsed;
    }

    public void setFiftyUsed(boolean fiftyUsed) {
        isFiftyUsed = fiftyUsed;
    }

    public Long getFiftyTime() {
        return fiftyTime;
    }

    public void setFiftyTime(Long fiftyTime) {
        this.fiftyTime = fiftyTime;
    }

    public boolean isNoMethodUsed() {
        return isNoMethodUsed;
    }

    public void setNoMethodUsed(boolean noMethodUsed) {
        isNoMethodUsed = noMethodUsed;
    }

    public Long getNoMethodTime() {
        return noMethodTime;
    }

    public void setNoMethodTime(Long noMethodTime) {
        this.noMethodTime = noMethodTime;
    }

    public UserFocusDetails getUser() {
        return user;
    }

    public void setUser(UserFocusDetails user) {
        this.user = user;
    }
}
