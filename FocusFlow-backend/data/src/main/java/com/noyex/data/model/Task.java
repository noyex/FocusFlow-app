package com.noyex.data.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.noyex.data.model.enums.Priority;
import com.noyex.data.model.enums.Status;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
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

    @Enumerated
    @Column(nullable = false)
    private Priority priority;

    private boolean completed;

    @Column(name = "estimated_time")
    private Long estimatedTime;

    @Column(name = "actual_start_time")
    private LocalDateTime actualStartTime;

    @Column(name = "actual_end_time")
    private LocalDateTime actualEndTime;

    @Column(name = "total_time", nullable = false)
    private Long totalTime = 0L;

    public Task() {
    }

    public Task(Long id, String name, Project project, Status status, Priority priority, boolean completed, Long estimatedTime, LocalDateTime actualStartTime, LocalDateTime actualEndTime,Long totalTime) {
        this.id = id;
        this.name = name;
        this.project = project;
        this.status = status;
        this.priority = priority;
        this.completed = completed;
        this.estimatedTime = estimatedTime;
        this.actualStartTime = actualStartTime;
        this.actualEndTime = actualEndTime;
        this.totalTime = totalTime;
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

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
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

    public LocalDateTime getActualStartTime() {
        return actualStartTime;
    }

    public void setActualStartTime(LocalDateTime actualStartTime) {
        this.actualStartTime = actualStartTime;
    }

    public LocalDateTime getActualEndTime() {
        return actualEndTime;
    }

    public void setActualEndTime(LocalDateTime actualEndTime) {
        this.actualEndTime = actualEndTime;
    }

    public Long getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(Long totalTime) {
        this.totalTime = totalTime;
    }
}
