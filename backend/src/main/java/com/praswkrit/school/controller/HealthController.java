package com.praswkrit.school.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.praswkrit.school.service.DatabaseHealthMonitor;

@RestController
public class HealthController {
    
    @Autowired
    private DatabaseHealthMonitor databaseHealthMonitor;
    
    @GetMapping("/api/health")
    public String health() {
        return "OK";
    }
    
    /**
     * Enhanced health endpoint that includes database connection status
     * This helps monitor database connectivity issues
     */
    @GetMapping("/api/health/detailed")
    public ResponseEntity<Map<String, Object>> detailedHealth() {
        Map<String, Object> health = new HashMap<>();
        
        boolean dbHealthy = databaseHealthMonitor.isDatabaseHealthy();
        String dbStatus = databaseHealthMonitor.getConnectionStatus();
        
        health.put("status", dbHealthy ? "UP" : "DOWN");
        health.put("database", dbHealthy ? "CONNECTED" : "DISCONNECTED");
        health.put("databaseDetails", dbStatus);
        health.put("timestamp", System.currentTimeMillis());
        
        if (dbHealthy) {
            return ResponseEntity.ok(health);
        } else {
            return ResponseEntity.status(503).body(health); // Service Unavailable
        }
    }
}


