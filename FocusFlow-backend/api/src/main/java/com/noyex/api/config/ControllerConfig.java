package com.noyex.api.config;

import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = {
        "com.noyex.data",
        "com.noyex.service",
        "com.noyex.api"
})
public class ControllerConfig {
}
