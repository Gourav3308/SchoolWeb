package com.praswkrit.school;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.mongodb.client.MongoDatabase;
import com.praswkrit.school.model.Fee;
import com.praswkrit.school.repository.FeeRepository;

@SpringBootApplication
@EnableScheduling // Enable scheduling for DatabaseHealthMonitor
public class SchoolwebBackendApplication {
    
    private static final Logger logger = LoggerFactory.getLogger(SchoolwebBackendApplication.class);
    
    public static void main(String[] args) {
        SpringApplication.run(SchoolwebBackendApplication.class, args);
    }

    /**
     * Validate database connection on startup
     * This ensures the application can connect to MongoDB before accepting requests
     */
    @Bean
    CommandLineRunner validateDatabaseConnection(MongoTemplate mongoTemplate) {
        return args -> {
            try {
                logger.info("Validating MongoDB connection on startup...");
                MongoDatabase database = mongoTemplate.getDb();
                Document result = database.runCommand(new Document("ping", 1));
                
                if (result != null && result.containsKey("ok")) {
                    logger.info("✓ MongoDB connection validated successfully. Database: {}", database.getName());
                } else {
                    logger.warn("MongoDB ping returned unexpected result: {}", result);
                }
            } catch (Exception e) {
                logger.error("✗ Failed to connect to MongoDB on startup: {}", e.getMessage());
                logger.error("Application will continue but database operations may fail.");
                logger.error("Please check: 1) MongoDB URI is correct, 2) Network access is allowed, 3) Credentials are valid");
                // Don't throw - let the app start, but log the error clearly
            }
        };
    }

    @Bean
    CommandLineRunner seedFees(FeeRepository repo) {
        return args -> {
            try {
                if (repo.findAll(Sort.by(Sort.Direction.ASC, "className")).isEmpty()) {
                    logger.info("Seeding initial fee data...");
                    String[] classes = {"Nursery","LKG","UKG","1","2","3","4","5","6","7","8","9","10"};
                    for (String cls : classes) {
                        Fee f = new Fee();
                        f.setClassName(cls);
                        f.setAdmissionFeePerYear(1500);
                        f.setHostelFeePerMonth(2500);
                        f.setTransportFee(800);
                        f.setTuitionFee(1000);
                        f.setExamFee(300);
                        f.setTotalFee(f.getAdmissionFeePerYear() + f.getTuitionFee() + f.getExamFee());
                        repo.save(f);
                    }
                    logger.info("✓ Fee data seeded successfully");
                } else {
                    logger.info("Fee data already exists, skipping seed");
                }
            } catch (Exception e) {
                logger.error("Failed to seed fee data: {}", e.getMessage());
                // Don't fail startup if seeding fails
            }
        };
    }
}


