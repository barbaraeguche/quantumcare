package com.quantumcare.server.controllers;

import com.quantumcare.server.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doctor")
public class PatientController {
	
	PatientService patientService;
	
	@Autowired
	public PatientController(PatientService patientService) {
    this.patientService = patientService;
  }
}
