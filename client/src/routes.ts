import {
	User, BookUser, Cog, // user icons
	BriefcaseMedical, PillBottle, // admin icons
	CalendarClock, ClipboardList, Stethoscope, // doctor icons
	Activity, FilePlus // patient icons
} from 'lucide-react';
import { SidebarRoutes } from '@/lib/types';

// user
import UserInfo from '@/views/(common)/userInfo';
import ContactInfo from '@/views/(common)/contactInfo';
import Settings from '@/views/(common)/settings';
// admin
import AllDoctors from '@/views/admin/AllDoctors';
import AllPatients from '@/views/admin/AllPatients';
// doctor
import Availabilities from '@/views/doctor/availabilities';
import DoctorAppointments from '@/views/doctor/appointments';
import DoctorInfo from '@/views/doctor/doctorInfo';
// patient
import PatientAppointments from '@/views/patient/appointments';
import MedicalHistory from '@/views/patient/medicalHistory';
import PatientInfo from '@/views/patient/patientInfo';
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
		path: '/contacts',
		icon: BookUser,
		name: 'Contacts',
		component: ContactInfo
	},
	{
		path: '/settings',
		icon: Cog,
		name: 'Settings',
		component: Settings
	}
];

const adminRoutes: SidebarRoutes[] = [
	{
		path: '/registered-doctors',
		icon: BriefcaseMedical,
		name: 'Doctors',
		component: AllDoctors
	},
	{
		path: '/registered-patients',
		icon: PillBottle,
		name: 'Patients',
		component: AllPatients
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
		path: '/auth/signin',
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
	authRoutes, adminRoutes, userRoutes, doctorRoutes, patientRoutes, commonRoutes
};