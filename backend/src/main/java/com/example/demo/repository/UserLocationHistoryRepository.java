package com.example.demo.repository;


import com.example.demo.model.UserLocationHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserLocationHistoryRepository extends MongoRepository<UserLocationHistory, String> {
    List<UserLocationHistory> findByUserId(String userId);
}
