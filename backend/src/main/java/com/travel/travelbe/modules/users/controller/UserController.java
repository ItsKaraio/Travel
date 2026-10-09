package com.travel.travelbe.modules.users.controller;


import com.travel.travelbe.modules.users.dto.AuthResponse;
import com.travel.travelbe.modules.users.dto.CreateUserRequest;
import com.travel.travelbe.modules.users.dto.LoginRequest;
import com.travel.travelbe.modules.users.dto.UserResponse;
import com.travel.travelbe.modules.users.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody CreateUserRequest userRequest) {
        UserResponse createdUser = userService.createUser(userRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest){
        AuthResponse authResponse = userService.login(loginRequest);
        return ResponseEntity.ok(authResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Integer id){
        UserResponse userResponse = userService.getUserById(id);
        return ResponseEntity.ok(userResponse);
    }
}
