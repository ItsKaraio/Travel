package com.travel.travelbe.modules.users.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class UserResponse {
    private String id;
    private String username;
    private String fullName;
    private LocalDate birthday;
    private String address;
    private String email;
    private String phoneNumber;
    private String role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String avatar;
    private Boolean isActive;

    public UserResponse(){
    }

    public UserResponse(String id, String username, String fullName, LocalDate birthday, String address, String email, String phoneNumber, String role, LocalDateTime createdAt, LocalDateTime updatedAt, String avatar, Boolean isActive) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.birthday = birthday;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.avatar = avatar;
        this.isActive = isActive;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getFullName() {
        return fullName;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public String getAddress() {
        return address;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getRole() {
        return role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public String getAvatar() {
        return avatar;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
