package com.noyex.service.service;

import com.noyex.data.model.DTOs.UserDto;
import com.noyex.data.model.User;

import java.util.List;

public interface IUserService {
    User getUserById(Long userId);
    List<User> getAllUsers();
    User createUser(UserDto userDto);
    User updateUser(Long userId, UserDto userDto);
    void deleteUser(Long userId);
}
