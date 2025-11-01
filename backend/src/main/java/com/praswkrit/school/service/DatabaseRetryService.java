package com.praswkrit.school.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.function.Supplier;

/**
 * Database Retry Service
 * 
 * Provides retry logic for database operations to handle transient failures.
 * This service automatically retries failed operations with exponential backoff,
 * which is crucial for maintaining reliability on cloud platforms like Render.
 */
@Service
public class DatabaseRetryService {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseRetryService.class);
    
    private static final int MAX_RETRIES = 3;
    private static final long INITIAL_DELAY_MS = 100;
    
    /**
     * Execute a database operation with retry logic
     * 
     * @param operation The database operation to execute
     * @param operationName Name of the operation (for logging)
     * @return Result of the operation
     * @throws Exception If operation fails after all retries
     */
    public <T> T executeWithRetry(Supplier<T> operation, String operationName) throws Exception {
        int attempt = 0;
        Exception lastException = null;
        
        while (attempt < MAX_RETRIES) {
            try {
                return operation.get();
            } catch (Exception e) {
                lastException = e;
                attempt++;
                
                if (attempt < MAX_RETRIES) {
                    long delay = INITIAL_DELAY_MS * (long) Math.pow(2, attempt - 1); // Exponential backoff
                    logger.warn("Database operation '{}' failed (attempt {}/{}). Retrying in {} ms...", 
                        operationName, attempt, MAX_RETRIES, delay);
                    
                    try {
                        Thread.sleep(delay);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        throw new RuntimeException("Retry interrupted", ie);
                    }
                } else {
                    logger.error("Database operation '{}' failed after {} attempts", operationName, MAX_RETRIES);
                }
            }
        }
        
        throw lastException != null ? lastException : new RuntimeException("Operation failed: " + operationName);
    }

    /**
     * Execute a database operation that returns void
     */
    public void executeWithRetry(Runnable operation, String operationName) throws Exception {
        executeWithRetry(() -> {
            operation.run();
            return null;
        }, operationName);
    }
}

