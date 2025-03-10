package com.noyex.service.config;

import com.noyex.data.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    private final UserRepository userRepository;

    public AppConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

     @Bean
     public BCrypt passwordEncoder() {
         return new BCrypt();
     }
}
