package com.noyex.service.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = {
        "com.noyex.data",
        "com.noyex.service"
})
public class ServiceConfig {
}
