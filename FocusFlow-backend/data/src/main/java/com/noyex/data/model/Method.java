package com.noyex.data.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "methods")
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

    public Method() {
    }

    public Method(String name, String description, Integer focusTime, Integer breakTime, Integer cycles, Integer longBreakTime) {
        this.name = name;
        this.description = description;
        this.focusTime = focusTime;
        this.breakTime = breakTime;
        this.cycles = cycles;
        this.longBreakTime = longBreakTime;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getFocusTime() {
        return focusTime;
    }

    public void setFocusTime(Integer focusTime) {
        this.focusTime = focusTime;
    }

    public Integer getBreakTime() {
        return breakTime;
    }

    public void setBreakTime(Integer breakTime) {
        this.breakTime = breakTime;
    }

    public Integer getCycles() {
        return cycles;
    }

    public void setCycles(Integer cycles) {
        this.cycles = cycles;
    }

    public Integer getLongBreakTime() {
        return longBreakTime;
    }

    public void setLongBreakTime(Integer longBreakTime) {
        this.longBreakTime = longBreakTime;
    }
}
