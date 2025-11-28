package com.example.demo.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "user_location_history")
public class UserLocationHistory {

    @Id
    private String id;
    private String userId;
    private String locationId;
    private LocalDateTime timestamp;

    // Constructors
    public UserLocationHistory() {}

    public UserLocationHistory(String userId, String locationId, LocalDateTime timestamp) {
        this.userId = userId;
        this.locationId = locationId;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getLocationId() { return locationId; }
    public void setLocationId(String locationId) { this.locationId = locationId; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
