package com.praswkrit.school.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.praswkrit.school.model.Fee;

public interface FeeRepository extends MongoRepository<Fee, String> {
    List<Fee> findAll(Sort sort);
    List<Fee> findByClassName(String className);
}


