package com.praswkrit.school.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.praswkrit.school.model.Notice;

@Repository
public interface NoticeRepository extends MongoRepository<Notice, String> {
    List<Notice> findByActiveTrue(Sort sort);
}


