package com.noyex.data.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user_focus_details")
public class UserFocusDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "total_projects_done")
    private Long totalProjectsDone = 0L;

    @Column(name = "total_projects_ongoing")
    private Long totalProjectsOngoing = 0L;

    @Column(name = "total_tasks_done")
    private Long totalTasksDone = 0L;

    @Column(name = "total_tasks_ongoing")
    private Long totalTasksOngoing = 0L;

    @Column(name = "total_focus_time", nullable = false)
    private Long totalWorkTime = 0L;

    @Column(name = "total_break_time", nullable = false)
    private Long totalBreakTime = 0L;

    @Column(name = "total_sessions_done", nullable = false)
    private Long totalSessionsDone = 0L;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Session> sessions = new ArrayList<>();

    public UserFocusDetails() {
    }

    public UserFocusDetails(Long id, User user, Long totalProjectsDone, Long totalProjectsOngoing, Long totalTasksDone, Long totalTasksOngoing, Long totalWorkTime, Long totalBreakTime, Long totalSessionsDone, List<Session> sessions) {
        this.id = id;
        this.user = user;
        this.totalProjectsDone = totalProjectsDone;
        this.totalProjectsOngoing = totalProjectsOngoing;
        this.totalTasksDone = totalTasksDone;
        this.totalTasksOngoing = totalTasksOngoing;
        this.totalWorkTime = totalWorkTime;
        this.totalBreakTime = totalBreakTime;
        this.totalSessionsDone = totalSessionsDone;
        this.sessions = sessions;
    }

    public Long getTotalSessionsDone() {
        return totalSessionsDone;
    }

    public void setTotalSessionsDone(Long totalSessionsDone) {
        this.totalSessionsDone = totalSessionsDone;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getTotalProjectsDone() {
        return totalProjectsDone;
    }

    public void setTotalProjectsDone(Long totalProjectsDone) {
        this.totalProjectsDone = totalProjectsDone;
    }

    public Long getTotalProjectsOngoing() {
        return totalProjectsOngoing;
    }

    public void setTotalProjectsOngoing(Long totalProjectsOngoing) {
        this.totalProjectsOngoing = totalProjectsOngoing;
    }

    public Long getTotalTasksDone() {
        return totalTasksDone;
    }

    public void setTotalTasksDone(Long totalTasksDone) {
        this.totalTasksDone = totalTasksDone;
    }

    public Long getTotalTasksOngoing() {
        return totalTasksOngoing;
    }

    public void setTotalTasksOngoing(Long totalTasksOngoing) {
        this.totalTasksOngoing = totalTasksOngoing;
    }

    public Long getTotalWorkTime() {
        return totalWorkTime;
    }

    public void setTotalWorkTime(Long totalWorkTime) {
        this.totalWorkTime = totalWorkTime;
    }

    public Long getTotalBreakTime() {
        return totalBreakTime;
    }

    public void setTotalBreakTime(Long totalBreakTime) {
        this.totalBreakTime = totalBreakTime;
    }

    public List<Session> getSessions() {
        return sessions;
    }

    public void setSessions(List<Session> sessions) {
        this.sessions = sessions;
    }
}
