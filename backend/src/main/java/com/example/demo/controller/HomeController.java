package com.example.demo.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SuppressWarnings("unused")
@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to the Map Navigator!";
    }
}

