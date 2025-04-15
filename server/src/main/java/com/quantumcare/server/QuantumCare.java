package com.quantumcare.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class QuantumCare {
	public static void main(String[] args) {
		SpringApplication.run(QuantumCare.class, args);
	}
}
