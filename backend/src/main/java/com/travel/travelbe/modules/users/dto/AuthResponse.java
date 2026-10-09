package com.travel.travelbe.modules.users.dto;

import java.util.Objects;

public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private String username;

    public AuthResponse() {
    }

    public AuthResponse(String token, String type, String username) {
        this.token = token;
        this.type = type != null ? type : "Bearer";
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public static AuthResponseBuilder builder() {
        return new AuthResponseBuilder();
    }

    public static class AuthResponseBuilder {
        private String token;
        private String type = "Bearer";
        private String username;

        AuthResponseBuilder() {
        }

        public AuthResponseBuilder token(String token) {
            this.token = token;
            return this;
        }

        public AuthResponseBuilder type(String type) {
            this.type = type;
            return this;
        }

        public AuthResponseBuilder username(String username) {
            this.username = username;
            return this;
        }

        public AuthResponse build() {
            return new AuthResponse(this.token, this.type, this.username);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AuthResponse that = (AuthResponse) o;
        return Objects.equals(token, that.token) &&
                Objects.equals(type, that.type) &&
                Objects.equals(username, that.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(token, type, username);
    }

    @Override
    public String toString() {
        return "AuthResponse{" +
                "token='" + token + '\'' +
                ", type='" + type + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
