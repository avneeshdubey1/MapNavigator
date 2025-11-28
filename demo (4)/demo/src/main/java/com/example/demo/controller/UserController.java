package com.example.demo.controller;



import com.example.demo.model.User;
import com.example.demo.model.UserLocationHistory;
import com.example.demo.service.UserLocationHistoryService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserLocationHistoryService historyService;

    // ✅ 1. Register a new user (Fixed Version)
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        return "User registered successfully with ID: " + savedUser.getId();
    }

    // ✅ 2. Get user details by ID
    @GetMapping("/{userId}")
    public User getUserById(@PathVariable String userId) {
        return userService.getUserById(userId);
    }

    // ✅ 3. Record user location visit
    @PostMapping("/record-visit")
    public String recordUserVisit(@RequestParam String userId, @RequestParam String locationId) {
        historyService.recordVisit(userId, locationId);
        return "User visit recorded successfully!";
    }

    // ✅ 4. Get user location history
    @GetMapping("/history")
    public List<UserLocationHistory> getUserHistory(@RequestParam String userId) {
        return historyService.getUserHistory(userId);
    }
}
