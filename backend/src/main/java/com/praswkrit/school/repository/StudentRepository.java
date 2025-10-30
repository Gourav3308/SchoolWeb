package com.praswkrit.school.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.praswkrit.school.model.Student;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    List<Student> findByStatus(String status);
    List<Student> findByEmail(String email);
    List<Student> findByAadharNumber(String aadharNumber);
}

