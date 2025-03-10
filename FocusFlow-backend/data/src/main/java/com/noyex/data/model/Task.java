package com.noyex.data.model;

import com.noyex.data.model.enums.Status;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "tasks")
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
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


}
