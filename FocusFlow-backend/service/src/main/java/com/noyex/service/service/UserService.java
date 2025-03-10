package com.noyex.service.service;

import com.noyex.data.model.DTOs.UserDto;
import com.noyex.data.model.User;
import com.noyex.data.repository.UserRepository;
import com.noyex.service.exceptions.UserNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService{

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        if(users.isEmpty()) {
            throw new UserNotFoundException("No users found");
        }
        return users;
    }

    @Override
    public User createUser(UserDto userDto) {
        User user = new User();
        return createOrUpdateUser(user, userDto);
    }

    @Override
    public User updateUser(Long userId, UserDto userDto) {
        return userRepository.findById(userId)
                .map(user -> createOrUpdateUser(user, userDto))
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    @Override
    public void deleteUser(Long userId) {
        if(!userRepository.existsById(userId)){
            throw new UserNotFoundException("User not found");
        }
        userRepository.deleteById(userId);
    }

    private User createOrUpdateUser(User user, UserDto userDto){
        validateUser(userDto);
        user.setUsername(userDto.getUsername());
        user.setPassword(hashPassword(userDto.getPassword()));
        user.setEmail(userDto.getEmail());
        return userRepository.save(user);
    }

    private void validateUser(UserDto userDto) {
        boolean existsByUsername = userRepository.existsByUsername(userDto.getUsername());
        boolean existsByEmail = userRepository.existsByEmail(userDto.getEmail());
        if(existsByEmail) {
            throw new UserNotFoundException("User with this email already exists");
        }
        if(existsByUsername) {
            throw new UserNotFoundException("User with this username already exists");
        }
    }

    private String hashPassword(String password) {
        if(password == null || password.trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be empty");
        }
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }
}
