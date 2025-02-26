import {
	User, BookUser, Cog,
	CalendarClock, ClipboardList, Stethoscope,
	Activity, FilePlus
} from 'lucide-react';
import { SidebarRoutes } from '@/lib/types';

// user
import UserInfo from '@/views/(common)/userInfo';
import ContactInfo from '@/views/(common)/contactInfo';
import Settings from '@/views/(common)/settings';
// doctor
import Availabilities from '@/views/doctor/availabilities';
import DoctorAppointments from '@/views/doctor/appointments';
import DoctorInfo from '@/views/doctor/doctorInfo';
// patient
import PatientAppointments from '@/views/patient/appointments';
import MedicalHistory from '@/views/patient/medicalHistory';
import PatientInfo from '@/views/patient/patient-info';
// authorization
import SignInForm from '@/views/auth/signIn';
import RegisterForm from '@/views/auth/register';
// general

const userRoutes: SidebarRoutes[] = [
	{
		path: '/profile',
		icon: User,
		name: 'Profile',
		component: UserInfo
	},
	{
		path: '/contact-details',
		icon: BookUser,
		name: 'Contact Details',
		component: ContactInfo
	},
	{
		path: '/settings',
		icon: Cog,
		name: 'Settings',
		component: Settings
	}
];

const doctorRoutes: SidebarRoutes[] = [
	{
		path: '/availability',
		icon: CalendarClock,
		name: 'Availability',
		component: Availabilities
	},
	{
		path: '/doctor/appointments',
		icon: ClipboardList,
		name: 'Appointments',
		component: DoctorAppointments
	},
	{
		path: '/doctor/role-info',
		icon: Stethoscope,
		name: 'Role Information',
		component: DoctorInfo
	}
];

const patientRoutes: SidebarRoutes[] = [
	{
		path: '/patient/appointments',
		icon: ClipboardList,
		name: 'Appointments',
		component: PatientAppointments
	},
	{
		path: '/medical-history',
		icon: Activity,
		name: 'Medical History',
		component: MedicalHistory
	},
	{
		path: '/patient/role-info',
		icon: FilePlus,
		name: 'Role Information',
		component: PatientInfo
	}
];

const authRoutes: SidebarRoutes[] = [
	{
		path: '/auth/sign-in',
		component: SignInForm
	},
	{
		path: '/auth/register',
		component: RegisterForm
	}
];

const commonRoutes: SidebarRoutes[] = [
	// todo: not in use
	
	// services
	// how it works
	// our doctors
	// contact
];

export {
	userRoutes, doctorRoutes, patientRoutes, authRoutes, commonRoutes
};