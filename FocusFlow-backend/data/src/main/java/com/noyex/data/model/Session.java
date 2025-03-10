package com.noyex.data.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "sessions")
@Data
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    @ManyToOne
    @JoinColumn(name = "method_id", nullable = false)
    private Method method;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private Long duration;
}
