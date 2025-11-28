package com.example.demo.service;


import com.example.demo.model.UserLocationHistory;
import com.example.demo.repository.UserLocationHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserLocationHistoryService {

    @Autowired
    private UserLocationHistoryRepository historyRepository;

    // Save user's visited location
    public void recordVisit(String userId, String locationId) {
        UserLocationHistory history = new UserLocationHistory(userId, locationId, LocalDateTime.now());
        historyRepository.save(history);
    }

    // Retrieve user location history
    public List<UserLocationHistory> getUserHistory(String userId) {
        return historyRepository.findByUserId(userId);
    }
}
