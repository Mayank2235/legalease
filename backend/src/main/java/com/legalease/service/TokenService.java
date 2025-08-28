package com.legalease.service;

import com.legalease.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenService {
    private static final String SECRET_KEY = "your_secret_key_here"; // TODO: move to application.properties
    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour
    
    // In-memory storage for refresh tokens and blacklisted tokens
    // In production, use Redis or database
    private final Map<String, String> refreshToUser = new ConcurrentHashMap<>();
    private final Map<String, Boolean> blacklistedTokens = new ConcurrentHashMap<>();

    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public String validateToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    
    public String createRefreshToken(String userId) {
        String refreshToken = UUID.randomUUID().toString();
        refreshToUser.put(refreshToken, userId);
        return refreshToken;
    }
    
    public String getUserIdFromRefreshToken(String refreshToken) {
        return refreshToUser.get(refreshToken);
    }
    
    public void revokeRefreshToken(String refreshToken) {
        refreshToUser.remove(refreshToken);
    }
    
    public void blacklistAccessToken(String token) {
        blacklistedTokens.put(token, true);
    }
    
    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.getOrDefault(token, false);
    }
}
