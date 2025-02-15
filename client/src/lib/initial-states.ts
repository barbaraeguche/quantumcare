import { User, Doctor, Patient, Practitioner, MedicalHistory, Appointments } from './definitions.ts';

export const userInitState: User = {
	_id: 'a1-b2-c3',
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	phoneNumber: '',
	gender: 'Female',
	role: 'Patient',
	address: {
		street: '',
		city: '',
		province: '',
		postalCode: '',
		country: ''
	},
	emergencyContact: {
		name: '',
		relationship: '',
		email: ''
	}
};

export const practitionerInitState: Practitioner = {
	_id: 0,
	licenseNumber: '',
	specialization: '',
	yearsOfExperience: 0,
	languages: '',
	education: []
};

export const doctorInitState: Doctor = {
	_id: 'a1-b2-c3',
  user: userInitState,
  practitioner: practitionerInitState,
  doctorAvailabilities: [],
  appointments: []
};

export const patientInitState: Patient = {
	_id: 'a1-b2-c3',
	user: userInitState,
	dateOfBirth: new Date('1900-01-01'),
  allergies: '',
  bloodType: '',
  insuranceProvider: '',
  insurancePolicyNumber: '',
	appointments: [],
	medicalHistory: [],
	chronicConditions: '',
  healthMetrics: {
		height: 0,
    weight: 0,
	  heartRate: 0
  }
};

export const medicalHistInitState: MedicalHistory = {
	_id: 0,
  diagnosis: '',
  diagnosisDate: new Date('1900-01-01'),
  medications: [],
	patientId: ''
};

export const appointmentInitState: Appointments = {
	_id: 0,
  day: new Date('1900-01-01'),
  startTime: (new Date('1900-01-01T00:00:00')).toLocaleTimeString(),
  endTime: (new Date('1900-01-01T23:59:59')).toLocaleTimeString(),
  type: 'Consultation',
  status: 'Scheduled',
  notes: '',
  doctorId: '',
  patientId: ''
};