package com.quantumcare.server.models.factories;

import com.quantumcare.server.models.Doctor;
import com.quantumcare.server.models.Patient;
import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.models.helpers.Practitioner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class HelperFactory {
  public Practitioner createPractitioner(String licenseNumber, String department, String specialization,
																				 int yearsOfExperience, String languages
	) {
		return new Practitioner(licenseNumber, department, specialization, yearsOfExperience, languages);
	}
	
	public Practitioner.Education createEducation(String degree, String institution, int graduationYear) {
		return new Practitioner.Education(degree, institution, graduationYear);
	}
	
	public Appointments createAppointment(LocalDate day, LocalTime startTime, LocalTime endTime, Appointments.Type type,
																				Appointments.Status status, String notes, Doctor doctorId, Patient patientId
	) {
    return new Appointments(day, startTime, endTime, type, status, notes, doctorId, patientId);
  }
}
