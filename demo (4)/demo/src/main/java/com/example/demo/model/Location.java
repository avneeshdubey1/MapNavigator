package com.example.demo.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Map;

@Document(collection = "locations")
public class Location {

    @Id
    private String id;
    private String name;
    private String category;
    
    // Distance to neighboring locations (key: neighbor location ID, value: distance)
    private Map<String, Double> distances = new HashMap<>();

    private double latitude;
    private double longitude;

    // Constructors, Getters, and Setters
    public Location() {}

    public Location(String name, String category) {
        this.name = name;
        this.category = category;
        this.distances = new HashMap<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }

    public void setCategory(String category) { this.category = category; }

    public Map<String, Double> getDistances() { return distances; }

    public void setDistances(Map<String, Double> distances) { this.distances = distances; }

    public void addNeighbor(String locationId, double distance) {
        this.distances.put(locationId, distance);
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}
