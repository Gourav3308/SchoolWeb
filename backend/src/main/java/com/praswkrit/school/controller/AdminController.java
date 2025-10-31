package com.praswkrit.school.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    
    @Value("${admin.username}")
    private String adminUsername;
    
    @Value("${admin.password}")
    private String adminPassword;
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        
        Map<String, Object> response = new HashMap<>();
        
        if (adminUsername.equals(username) && adminPassword.equals(password)) {
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("token", "admin-session-token"); // Simple token for demo
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(401).body(response);
        }
    }
    
    @GetMapping("/verify")
    public ResponseEntity<Map<String, Boolean>> verify() {
        Map<String, Boolean> response = new HashMap<>();
        response.put("authenticated", true);
        return ResponseEntity.ok(response);
    }
}

