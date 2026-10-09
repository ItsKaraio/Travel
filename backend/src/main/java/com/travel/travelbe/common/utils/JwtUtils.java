    package com.travel.travelbe.common.utils;


    import io.jsonwebtoken.Claims;
    import io.jsonwebtoken.JwtException;
    import io.jsonwebtoken.Jwts;
    import io.jsonwebtoken.security.Keys;
    import org.springframework.stereotype.Component;

    import javax.crypto.SecretKey;
    import java.nio.charset.StandardCharsets;
    import java.util.Date;

    @Component
    public class JwtUtils {
        private final String JWT_SECRET = "c3VwZXItc2VjcmV0LWtleS1mb3ItdHJhdmVsLWFwcGxpY2F0aW9uLTIwMjY=";
        private final long JWT_EXPIRATION = 86400000L; // 24 giờ

        private SecretKey getSigningKey() {
            return Keys.hmacShaKeyFor(JWT_SECRET.getBytes(StandardCharsets.UTF_8));
        }

        public String generateToken(String username) {
            Date now = new Date();
            Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);

            return Jwts.builder()
                    .subject(username)
                    .issuedAt(now)
                    .expiration(expiryDate)
                    .signWith(getSigningKey())
                    .compact();
        }

        // 1. Lấy Username từ Token
        public String getUsernameFromToken(String token) {
            Claims claims = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return claims.getSubject();
        }

        // 2. Validate Token hợp lệ hay không
        public boolean validateToken(String token) {
            try {
                Jwts.parser()
                        .verifyWith(getSigningKey())
                        .build()
                        .parseSignedClaims(token);
                return true;
            } catch (JwtException | IllegalArgumentException e) {
                return false;
            }
        }
    }
