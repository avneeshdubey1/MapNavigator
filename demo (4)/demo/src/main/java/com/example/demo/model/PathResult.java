package com.example.demo.model;

import java.util.List;

public class PathResult {
    private List<Location> path;
    private double totalDistance;

    public PathResult(List<Location> path, double totalDistance) {
        this.path = path;
        this.totalDistance = totalDistance;
    }

    public List<Location> getPath() {
        return path;
    }

    public void setPath(List<Location> path) {
        this.path = path;
    }

    public double getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(double totalDistance) {
        this.totalDistance = totalDistance;
    }
}