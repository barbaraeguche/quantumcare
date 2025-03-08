package com.quantumcare.server.controllers;

import com.quantumcare.server.exceptions.EntityNotFound;
import com.quantumcare.server.models.Patient;
import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.services.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/patients")
public class PatientController {
	
	private final PatientService patientService;
	
	@Autowired
	public PatientController(PatientService patientService) {
    this.patientService = patientService;
  }
	
	@GetMapping("/{id}")
	public Patient getPatientById(@PathVariable UUID id) {
		// if id is null or id does not exist in doctor db, send a 404 error
		validatePatientId(id);
		return patientService.getPatientById(id);
	}
	
	@GetMapping
	public List<Patient> getAllPatients() {
		return patientService.getAllPatients();
	}
	
	@PostMapping("/{id}/appointment")
	public ResponseEntity<?> createAppointment(
		@PathVariable UUID id, @Valid @RequestBody Appointments appointment
	) {
		try {
			Patient patient = patientService.getPatientById(id);
			Appointments currAppointment = patientService.postAppointment(patient, appointment);
			
			return ResponseEntity.ok(Map.of(
				"appointment", currAppointment,
				"message", "Appointment created successfully"
			));
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to create appointment: " + exp.getMessage());
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updatePatient(
		@PathVariable UUID id, @RequestBody Patient patient
	) {
		try {
			Patient prevPatient = getPatientById(id);
			Patient currPatient = patientService.putPatient(prevPatient, patient);
			
			return ResponseEntity.ok(Map.of(
				"patient", currPatient,
				"message", "Patient updated successfully"
			));
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to update patient: " + exp.getMessage());
		}
	}
	
	@PutMapping("/{id}/appointment")
	public ResponseEntity<?> updateAppointment(
		@PathVariable UUID id, @Valid @RequestBody Appointments appointment
	) {
		try {
			Patient patient = patientService.getPatientById(id);
			List<Appointments> currAppointments = patientService.putAppointment(patient, appointment);
			
			return ResponseEntity.ok(Map.of(
				"appointment", currAppointments,
				"message", "Appointment updated successfully"
			));
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to update appointment: " + exp.getMessage());
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deletePatient(@PathVariable UUID id) {
		try {
			Patient currPatient = getPatientById(id);
			patientService.deletePatient(currPatient);
			return ResponseEntity.ok("Patient deleted successfully");
		} catch (Exception exp) {
			return ResponseEntity.internalServerError().body("Failed to delete patient: " + exp.getMessage());
		}
	}
	
	
	// ------------------------ HELPERS ------------------------ //
	/**
	 * validates the given patient ID to ensure it is not empty and exists in the system.
	 * @param id the unique identifier of the patient to validate
	 * @throws EntityNotFound if the patient ID is not valid
	 */
	public void validatePatientId(UUID id) {
		if (String.valueOf(id).isEmpty() || patientService.getPatientById(id) == null) {
			throw new EntityNotFound("Invalid Patient ID");
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
