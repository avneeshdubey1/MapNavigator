package com.example.demo.service;


import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Add a new user
    public User addUser(User user) {
        return userRepository.save(user);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    //  Fix: Register user and return the saved User object
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    //  Get user by ID
    public User getUserById(String userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElseThrow(() -> new RuntimeException("User not found!"));
    }

    // Get user by username
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Update user details
    public User updateUser(String id, User updatedUser) {
        if (userRepository.existsById(id)) {
            updatedUser.setId(id);
            return userRepository.save(updatedUser);
        }
        return null;
    }

    // Delete user
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    // Add a location to user’s location history
    public User addUserLocationHistory(String userId, String locationId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.getLocationHistory().add(locationId);
            return userRepository.save(user);
        }
        return null;
    }
}

