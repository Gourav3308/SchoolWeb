package com.praswkrit.school.service;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.mongodb.client.MongoDatabase;

/**
 * Database Health Monitor Service
 * 
 * This service periodically pings the MongoDB database to:
 * 1. Keep connections alive and prevent timeouts
 * 2. Detect connection issues early
 * 3. Automatically reconnect if connection is lost
 * 4. Log connection health for monitoring
 * 
 * Runs every 30 seconds to maintain healthy connections
 */
@Service
public class DatabaseHealthMonitor {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseHealthMonitor.class);
    
    @Autowired
    private MongoTemplate mongoTemplate;
    
    private volatile boolean isConnected = true;
    private volatile long lastSuccessfulPing = System.currentTimeMillis();
    private volatile int consecutiveFailures = 0;

    /**
     * Ping database every 30 seconds to keep connections alive
     * This prevents idle connections from timing out on Render
     */
    @Scheduled(fixedRate = 30000) // 30 seconds
    public void pingDatabase() {
        try {
            MongoDatabase database = mongoTemplate.getDb();
            Document result = database.runCommand(new Document("ping", 1));
            
            if (result != null && result.containsKey("ok")) {
                isConnected = true;
                lastSuccessfulPing = System.currentTimeMillis();
                
                if (consecutiveFailures > 0) {
                    logger.info("Database connection restored. Consecutive failures: {}", consecutiveFailures);
                    consecutiveFailures = 0;
                }
            }
        } catch (Exception e) {
            consecutiveFailures++;
            isConnected = false;
            
            logger.warn("Database ping failed (failure #{}): {}", consecutiveFailures, e.getMessage());
            
            if (consecutiveFailures >= 3) {
                logger.error("Database connection appears to be down. Last successful ping: {} ms ago", 
                    System.currentTimeMillis() - lastSuccessfulPing);
            }
        }
    }

    /**
     * Check database connection health
     * Used by health endpoint
     */
    public boolean isDatabaseHealthy() {
        try {
            if (!isConnected) {
                // Try to reconnect
                pingDatabase();
            }
            return isConnected && (System.currentTimeMillis() - lastSuccessfulPing) < 120000; // 2 minutes
        } catch (Exception e) {
            logger.error("Error checking database health: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Get connection status details
     */
    public String getConnectionStatus() {
        if (isConnected) {
            long timeSinceLastPing = System.currentTimeMillis() - lastSuccessfulPing;
            return String.format("Connected - Last ping: %d seconds ago", timeSinceLastPing / 1000);
        } else {
            return String.format("Disconnected - Failures: %d", consecutiveFailures);
        }
    }

    /**
     * Force immediate connection check
     */
    public void forceHealthCheck() {
        pingDatabase();
    }
}

