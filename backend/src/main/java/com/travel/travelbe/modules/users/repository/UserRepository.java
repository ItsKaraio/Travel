package com.travel.travelbe.modules.users.repository;

import com.travel.travelbe.modules.users.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByPhoneNumber(String phoneNumber);

    Optional<UserEntity>findByUsername(String username);
}
