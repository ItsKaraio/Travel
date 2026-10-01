package com.travel.travelbe.modules.users.service;

import com.travel.travelbe.modules.users.dto.CreateUserRequest;
import com.travel.travelbe.modules.users.dto.UserResponse;

public interface UserService {
    UserResponse createUser(CreateUserRequest request);
    UserResponse getUserById(Integer id);
}
