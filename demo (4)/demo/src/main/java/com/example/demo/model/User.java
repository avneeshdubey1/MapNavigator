package com.example.demo.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
public class User {

    @Id
    private String id;
    
    private String username;
    private String password;
    
    // This list stores the IDs of locations the user has visited
    private List<String> locationHistory;

    // Constructor
    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.locationHistory = new ArrayList<>();
    }
    
    // No-argument constructor for Spring Data
    public User() {
        this.locationHistory = new ArrayList<>();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getLocationHistory() {
        return locationHistory;
    }

    public void setLocationHistory(List<String> locationHistory) {
        this.locationHistory = locationHistory;
    }
}
