package com.quantumcare.server.models;

import com.quantumcare.server.models.helpers.MedicalHistory;
//import jakarta.persistence.*;

import java.util.List;

//@Entity
//@Table(name = "patient")
public class Patient {

//	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
//	@OneToOne
//	@JoinColumn(name = "userId", nullable = false)
	User user;
	
	List<String> allergies;
	
//	@Column(nullable = false)
//	@Enumerated(EnumType.STRING)
	BloodType bloodType;
	
	String insuranceProvider, insurancePolicyNumber;
	
//	Appointments appointments

//	@OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<MedicalHistory> medicalHistory;
	
//	@Embedded
//	@Column(nullable = false)
	HealthMetrics healthMetrics;
	
	//getters and setters
	public int getId() { return this.id; }
	public void setId(int id) {
		this.id = id;
	}
	
	public User getUser() { return this.user; }
	public void setUser(User user) {
		this.user = user;
	}
	
	public List<String> getAllergies() { return this.allergies; }
	public void setAllergies(List<String> allergies) {
		this.allergies = allergies;
	}
	
	public BloodType getBloodType() { return this.bloodType; }
	public void setBloodType(BloodType bloodType) {
		this.bloodType = bloodType;
	}
	
	public String getInsuranceProvider() { return this.insuranceProvider; }
	public void setInsuranceProvider(String insuranceProvider) {
		this.insuranceProvider = insuranceProvider;
	}
	
	public String getInsurancePolicyNumber() { return this.insurancePolicyNumber; }
	public void setInsurancePolicyNumber(String insurancePolicyNumber) {
		this.insurancePolicyNumber = insurancePolicyNumber;
	}
	
	public List<MedicalHistory> getMedicalHistory() { return this.medicalHistory; }
	public void setMedicalHistory(List<MedicalHistory> medicalHistory) {
		this.medicalHistory = medicalHistory;
	}
	
	public HealthMetrics getHealthMetrics() { return this.healthMetrics; }
	public void setHealthMetrics(HealthMetrics healthMetrics) {
		this.healthMetrics = healthMetrics;
	}
	
	
	// ------------------------ HELPERS ------------------------ //
	public enum BloodType {
		a_plus("A+"), a_minus("A-"), b_plus("B+"), b_minus("B-"),
		ab_plus("AB+"), ab_minus("AB-"), o_plus("O+"), o_minus("O-");
		
		private final String bloodType;
		
		BloodType(String bloodType) { this.bloodType = bloodType; }
		public String displayBloodType() { return this.bloodType; }
	}
	
	public static class HealthMetrics {
		private long height, weight;
		private String bloodPressure;
		private long bloodSugar;
		
		public long getHeight() { return this.height; }
		public void setHeight(long height) {
			this.height = height;
		}
		
		public long getWeight() { return this.weight; }
		public void setWeight(long weight) {
			this.weight = weight;
		}
		
		public String getBloodPressure() { return this.bloodPressure; }
		public void setBloodPressure(String bloodPressure) {
			this.bloodPressure = bloodPressure;
		}
		
		public long getBloodSugar() { return this.bloodSugar; }
		public void setBloodSugar(long bloodSugar) {
			this.bloodSugar = bloodSugar;
		}
	}
	// ---------------------- END HELPERS ---------------------- //
}
