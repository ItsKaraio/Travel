package com.travel.travelbe.modules.users.service;

import com.travel.travelbe.common.exception.ResourceNotFoundException;
import com.travel.travelbe.modules.users.dto.CreateUserRequest;
import com.travel.travelbe.modules.users.dto.UserResponse;
import com.travel.travelbe.modules.users.entity.UserEntity;
import com.travel.travelbe.modules.users.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
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
        // Gán dữ liệu từ DTO sang Entity
        userEntity.setUsername(request.getUsername());
        userEntity.setFullName(request.getFullName());
        userEntity.setBirthday(request.getBirthday());
        userEntity.setAddress(request.getAddress());
        userEntity.setEmail(request.getEmail());
        userEntity.setPhoneNumber(request.getPhoneNumber());
        userEntity.setPassword(request.getPassword()); // Lưu ý: Nên mã hóa password (ví dụ: PasswordEncoder) nếu có Security
        userEntity.setAvatar(request.getAvatar());

        // Gán các giá trị mặc định (nếu có)
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

}
