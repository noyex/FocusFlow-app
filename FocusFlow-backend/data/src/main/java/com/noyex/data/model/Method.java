package com.noyex.data.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "methods")
@Data
public class Method {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(name = "focus_time", nullable = false)
    private Integer focusTime;

    @Column(name = "break_time", nullable = false)
    private Integer breakTime;

    @Column(name = "cycles", nullable = false)
    private Integer cycles;

    @Column(name = "long_break_time", nullable = false)
    private Integer longBreakTime;

}
