package com.noyex.data.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.noyex.data.model.enums.Status;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    @JsonIgnoreProperties({"tasks", "status", "createdAt", "startDate", "endDate", "totalTasks", "completedTasks", "completed", "totalTime", "description"})
    private Project project;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.TO_DO;

    private boolean completed;

    @Column(name = "estimated_time")
    private Long estimatedTime;

    @Column(name = "time_worked", nullable = false)
    private Long timeWorked = 0L;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Session> sessions;

    public Task() {
    }

    public Task(Long id, String name, Project project, Status status, boolean completed, Long estimatedTime, Long timeWorked, List<Session> sessions) {
        this.id = id;
        this.name = name;
        this.project = project;
        this.status = status;
        this.completed = completed;
        this.estimatedTime = estimatedTime;
        this.timeWorked = timeWorked;
        this.sessions = sessions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Long getEstimatedTime() {
        return estimatedTime;
    }

    public void setEstimatedTime(Long estimatedTime) {
        this.estimatedTime = estimatedTime;
    }

    public Long getTimeWorked() {
        return timeWorked;
    }

    public void setTimeWorked(Long timeWorked) {
        this.timeWorked = timeWorked;
    }

    public List<Session> getSessions() {
        return sessions;
    }

    public void setSessions(List<Session> sessions) {
        this.sessions = sessions;
    }
}
