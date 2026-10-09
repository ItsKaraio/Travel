package com.travel.travelbe.modules.users.service;

import com.travel.travelbe.common.exception.BadRequestException;
import com.travel.travelbe.common.exception.ResourceNotFoundException;
import com.travel.travelbe.common.utils.JwtUtils;
import com.travel.travelbe.modules.users.dto.AuthResponse;
import com.travel.travelbe.modules.users.dto.CreateUserRequest;
import com.travel.travelbe.modules.users.dto.LoginRequest;
import com.travel.travelbe.modules.users.dto.UserResponse;
import com.travel.travelbe.modules.users.entity.UserEntity;
import com.travel.travelbe.modules.users.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public UserResponse mapToResponse(UserEntity userEntity){
        UserResponse response = new UserResponse();
        if (userEntity == null) return null;
        response.setId(String.valueOf(userEntity.getId()));
        response.setUsername(userEntity.getUsername());
        response.setFullName(userEntity.getFullName());
        response.setBirthday(userEntity.getBirthday());
        response.setAddress(userEntity.getAddress());
        response.setEmail(userEntity.getEmail());
        response.setPhoneNumber(userEntity.getPhoneNumber());
        response.setRole(userEntity.getRole());
        response.setCreatedAt(userEntity.getCreatedAt());
        response.setUpdatedAt(userEntity.getUpdatedAt());
        response.setAvatar(userEntity.getAvatar());
        response.setIsActive(userEntity.getActive());
        return response;
    }
    @Override
    public UserResponse createUser(CreateUserRequest request) {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(request.getUsername());
        userEntity.setFullName(request.getFullName());
        userEntity.setBirthday(request.getBirthday());
        userEntity.setAddress(request.getAddress());
        userEntity.setEmail(request.getEmail());
        userEntity.setPhoneNumber(request.getPhoneNumber());
        userEntity.setPassword(passwordEncoder.encode(request.getPassword()));
        userEntity.setAvatar(request.getAvatar());
        userEntity.setRole("USER");
        userEntity.setActive(false);
        UserEntity savedUser = userRepository.save(userEntity);

        return mapToResponse(savedUser);
    }

    @Override
    public UserResponse getUserById(Integer id){
        UserEntity userEntity =  userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User does not exist!"));
        return  mapToResponse(userEntity);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        UserEntity userEntity = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadRequestException("Username or password incorrect!"));

        System.out.println("===> Raw password input: [" + request.getPassword() + "]");
        System.out.println("===> Encoded password in DB: [" + userEntity.getPassword() + "]");
        System.out.println("===> Matches result: " + passwordEncoder.matches(request.getPassword(), userEntity.getPassword()));
        if(!passwordEncoder.matches(request.getPassword(), userEntity.getPassword())){
            throw new BadRequestException("Password incorrect!");
        }

        String token = jwtUtils.generateToken(userEntity.getUsername());

        return AuthResponse.builder().token(token).type("Bearer").username(userEntity.getUsername()).build();
    }

}
