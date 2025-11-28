package com.example.demo.repository;


import com.example.demo.model.Location;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface LocationRepository extends MongoRepository<Location, String> {
    // This custom query method will allow you to find locations by their category.
    @Query("{ 'name' : ?0 }")
    Location findByName(String name);

     // Find locations by category
     @Query("{ 'category' : ?0 }")
    List<Location> findByCategory(String category);
}

