package com.travel.travelbe.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        http
                // 1. Tắt CSRF
                .csrf(AbstractHttpConfigurer::disable)

                // 2. Cấu hình Stateless (không lưu session)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 3. Phân quyền Request
                .authorizeHttpRequests(auth -> auth
                        // Bắt buộc permit cho tất cả request OPTIONS (CORS preflight)
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Mở Swagger UI & OpenAPI Docs
                        .requestMatchers(
                                "/v3/api-docs",
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/swagger-resources/**",
                                "/webjars/**"
                        ).permitAll()

                        // Mở công khai các API authentication / user công khai
                        .requestMatchers("/api/v1/users/login", "/api/v1/users/register").permitAll()
                        .requestMatchers("/api/v1/users/**").permitAll() // Thêm dòng này để bypass toàn bộ nhánh /users

                        // Các endpoint còn lại phải authenticated
                        .anyRequest().authenticated()
                )

                // 4. Chèn Filter xác thực JWT
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}