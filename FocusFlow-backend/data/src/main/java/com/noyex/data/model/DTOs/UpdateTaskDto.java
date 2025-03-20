package com.noyex.data.model.DTOs;

public class UpdateTaskDto {

    private String name;
    private Long estimatedTime;
    private String priority;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getEstimatedTime() {
        return estimatedTime;
    }

    public void setEstimatedTime(Long estimatedTime) {
        this.estimatedTime = estimatedTime;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
}
