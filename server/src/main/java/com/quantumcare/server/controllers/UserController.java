package com.quantumcare.server.controllers;

import com.quantumcare.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	UserService userService;
	
	@Autowired
	public UserController(UserService userService) {
    this.userService = userService;
  }
}
