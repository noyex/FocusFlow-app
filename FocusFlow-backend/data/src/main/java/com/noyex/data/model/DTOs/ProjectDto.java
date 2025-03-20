package com.noyex.data.model.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ProjectDto {
    private String name;
    private String description;
    @JsonProperty("due_to")
    private LocalDate dueTo;

    public LocalDate getDueTo() {
        return dueTo;
    }

    public void setDueTo(LocalDate dueTo) {
        this.dueTo = dueTo;
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
}
