package com.example.demo.service;


import com.example.demo.model.Location;
import com.example.demo.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    // Add a new location
    public Location addLocation(Location location) {
        return locationRepository.save(location);
    }

    // Get all locations
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
        
    }

    // Get location by ID
    public Optional<Location> getLocationById(String id) {
        return locationRepository.findById(id);
    }

    // Get locations by category (e.g., all restaurants)
    public List<Location> getLocationsByCategory(String category) {
        return locationRepository.findByCategory(category);
    }

    // Update a location
    public Location updateLocation(String id, Location updatedLocation) {
        if (locationRepository.existsById(id)) {
            updatedLocation.setId(id);
            return locationRepository.save(updatedLocation);
        }
        return null;
    }

    // Delete a location
    public void deleteLocation(String id) {
        locationRepository.deleteById(id);
    }

    //Get location by name
    public Location getLocationByName(String name) {
        return locationRepository.findByName(name);
    }
}
