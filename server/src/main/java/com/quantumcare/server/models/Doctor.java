package com.quantumcare.server.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.quantumcare.server.models.helpers.Appointments;
import com.quantumcare.server.models.helpers.Practitioner;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@Table(name = "doctors")
@RequiredArgsConstructor
public class Doctor {
	
	@Id
	@Column(name = "user_id")
	private UUID _id;
	
	@MapsId
	@NonNull
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", nullable = false)
	@NotNull(message = "Basic details must be provided")
	private User user;
	
	@NonNull
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "practitioner_id", nullable = false)
	@NotNull(message = "Practitioner details must be provided")
	private Practitioner practitioner;
	
	@OrderBy("date, startTime, endTime")
	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "availabilities", joinColumns = @JoinColumn(name = "doctor_id"))
	private List<Availabilities> availabilities;
	
	@OrderBy("date, time")
	@OneToMany(mappedBy = "doctorId", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Appointments> appointments;
	
	
	// ------------------------ HELPERS ------------------------ //
	@Data
	@Embeddable
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Availabilities {
		private LocalDate date;
		
		@JsonFormat(pattern = "HH:mm")
		private LocalTime startTime, endTime;
	}
	// ---------------------- END HELPERS ---------------------- //
}
