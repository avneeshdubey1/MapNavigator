package com.example.demo.service;

import com.example.demo.model.Location;
import com.example.demo.model.PathResult;
import com.example.demo.repository.LocationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class DijkstraService {

    @Autowired
    private LocationRepository locationRepository;

    private static final Logger logger = LoggerFactory.getLogger(DijkstraService.class);

    // Method to find the shortest path using Dijkstra's algorithm by IDs
    public PathResult findShortestPath(String startId, String endId) {
        logger.info("Finding shortest path from ID {} to ID {}", startId, endId);
        
        // Get all locations to build the graph
        List<Location> allLocations = locationRepository.findAll();
        
        // Create a map of locations by ID
        Map<String, Location> locationsById = new HashMap<>();
        for (Location loc : allLocations) {
            locationsById.put(loc.getId(), loc);
        }
        
        // Also create a map of locations by name (for neighbor lookups)
        Map<String, Location> locationsByName = new HashMap<>();
        for (Location loc : allLocations) {
            locationsByName.put(loc.getName(), loc);
        }
        
        // Initialize distance and previous maps
        Map<String, Double> distances = new HashMap<>();
        Map<String, String> previous = new HashMap<>();
        
        for (String id : locationsById.keySet()) {
            distances.put(id, Double.MAX_VALUE);
            previous.put(id, null);
        }
        distances.put(startId, 0.0);
        
        // Priority queue to process locations in order of shortest known distance
        PriorityQueue<String> queue = new PriorityQueue<>(Comparator.comparing(distances::get));
        queue.add(startId);
        
        // Dijkstra's algorithm logic
        while (!queue.isEmpty()) {
            String currentId = queue.poll();
            
            if (currentId.equals(endId)) break;
            
            Location current = locationsById.get(currentId);
            if (current == null) continue;
            
            // Process each neighbor
            for (Map.Entry<String, Double> entry : current.getDistances().entrySet()) {
                String neighborName = entry.getKey();
                Double distance = entry.getValue();
                
                // Convert neighbor name to ID if necessary
                String neighborId;
                if (locationsById.containsKey(neighborName)) {
                    // If the key is already an ID
                    neighborId = neighborName;
                } else {
                    // If the key is a name, find the corresponding location
                    Location neighborLoc = locationsByName.get(neighborName);
                    if (neighborLoc == null) {
                        logger.warn("Neighbor '{}' not found in the database", neighborName);
                        continue;
                    }
                    neighborId = neighborLoc.getId();
                }
                
                // Calculate new distance
                double newDistance = distances.get(currentId) + distance;
                
                // If we found a shorter path
                if (newDistance < distances.getOrDefault(neighborId, Double.MAX_VALUE)) {
                    distances.put(neighborId, newDistance);
                    previous.put(neighborId, currentId);
                    
                    // Remove and add to update priority
                    queue.remove(neighborId);
                    queue.add(neighborId);
                }
            }
        }
        
        // Reconstruct the path
        List<Location> path = new ArrayList<>();
        for (String at = endId; at != null; at = previous.get(at)) {
            path.add(locationsById.get(at));
        }
        Collections.reverse(path);
        
        // Get the total distance
        double totalDistance = distances.getOrDefault(endId, 0.0);
        
        return new PathResult(path, totalDistance);
    }
}