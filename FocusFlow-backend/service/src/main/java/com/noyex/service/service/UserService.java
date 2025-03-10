package com.noyex.service.service; // Poprawiona nazwa pakietu

import com.noyex.data.model.DTOs.UserDto;
import com.noyex.data.model.User;
import com.noyex.data.repository.UserRepository;
import com.noyex.service.exceptions.UserAlreadyExistsException; // Nowy wyjątek
import com.noyex.service.exceptions.UserNotFoundException;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

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
        return userRepository.findAll();
    }

    @Override
    public User createUser(UserDto userDto) {
        validateNewUser(userDto);
        User user = new User();
        return createOrUpdateUser(user, userDto);
    }

    @Override
    public User updateUser(Long userId, UserDto userDto) {
        return userRepository.findById(userId)
                .map(user -> {
                    validateUpdateUser(user, userDto);
                    return createOrUpdateUser(user, userDto);
                })
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    @Override
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User not found");
        }
        userRepository.deleteById(userId);
    }

    private User createOrUpdateUser(User user, UserDto userDto) {
        user.setUsername(userDto.getUsername());
        user.setPassword(hashPassword(userDto.getPassword()));
        user.setEmail(userDto.getEmail());
        return userRepository.save(user);
    }

    private void validateNewUser(UserDto userDto) {
        if (userDto.getUsername() == null || userDto.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        if (userDto.getEmail() == null || userDto.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        if (userRepository.existsByUsername(userDto.getUsername())) {
            throw new UserAlreadyExistsException("User with this username already exists");
        }
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new UserAlreadyExistsException("User with this email already exists");
        }
    }

    private void validateUpdateUser(User existingUser, UserDto userDto) {
        if (userDto.getUsername() == null || userDto.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        if (userDto.getEmail() == null || userDto.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        Optional<User> byUsername = userRepository.findByUsername(userDto.getUsername());
        if (byUsername.isPresent() && !byUsername.get().getId().equals(existingUser.getId())) {
            throw new UserAlreadyExistsException("User with this username already exists");
        }
        Optional<User> byEmail = userRepository.findByEmail(userDto.getEmail());
        if (byEmail.isPresent() && !byEmail.get().getId().equals(existingUser.getId())) {
            throw new UserAlreadyExistsException("User with this email already exists");
        }
    }

    private String hashPassword(String password) {
        if (password == null || password.trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be empty");
        }
        return BCrypt.hashpw(password, BCrypt.gensalt(12));
    }
}