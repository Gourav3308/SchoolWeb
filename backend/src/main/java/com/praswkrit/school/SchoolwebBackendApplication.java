package com.praswkrit.school;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Sort;

import com.praswkrit.school.model.Fee;
import com.praswkrit.school.repository.FeeRepository;

@SpringBootApplication
public class SchoolwebBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(SchoolwebBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner seedFees(FeeRepository repo) {
        return args -> {
            if (repo.findAll(Sort.by(Sort.Direction.ASC, "className")).isEmpty()) {
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
            }
        };
    }
}


