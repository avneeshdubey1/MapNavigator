package com.example.demo.controller;

import com.example.demo.model.Location;
import com.example.demo.model.PathResult;
import com.example.demo.service.DijkstraService;
import com.example.demo.service.LocationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/locations")
public class LocationController {
    
    private static final Logger logger = LoggerFactory.getLogger(LocationController.class);
    
    @Autowired
    private LocationService locationService;
    
    @Autowired
    private DijkstraService dijkstraService;
    
    // ✅ 1. Add a new location
    @PostMapping("/add")
    public String addLocation(@RequestBody Location location) {
        locationService.addLocation(location);
        return "Location added successfully!";
    }
    
    // ✅ 2. Get all locations
    @GetMapping("/all")
    public List<Location> getAllLocations() {
        return locationService.getAllLocations();
    }
    
    // ✅ 3. Get locations by category
    @GetMapping("/category")
    public List<Location> getLocationsByCategory(@RequestParam String category) {
        return locationService.getLocationsByCategory(category);
    }
    
    // ✅ 4. Get shortest path between two locations
    @GetMapping("/shortest-path")
    public ResponseEntity<Object> getShortestPath(
            @RequestParam String startName, 
            @RequestParam String endName) {
        try {
            Location startLocation = locationService.getLocationByName(startName);
            Location endLocation = locationService.getLocationByName(endName);
            
            if (startLocation == null || endLocation == null) {
                return ResponseEntity.badRequest()
                    .body(Map.of(
                        "error", "Location not found", 
                        "startFound", startLocation != null,
                        "endFound", endLocation != null
                    ));
            }
            
            PathResult result = dijkstraService.findShortestPath(
                startLocation.getId(), endLocation.getId());
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            logger.error("Error finding shortest path", e);
            return ResponseEntity.status(500)
                .body(Map.of("error", "Failed to find shortest path: " + e.getMessage()));
        }
    }
}