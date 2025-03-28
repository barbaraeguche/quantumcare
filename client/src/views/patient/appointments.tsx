import { useAppSelector } from '@/hooks/useAppDispatch';
import { patientApptColumns } from '@/lib/columns';
import AppointmentsTable from '@/components/appointmentsTable';

export default function PatientAppointments() {
	const { appointments } = useAppSelector((state) => state.patientSlice.patient);
	
	return (
		<AppointmentsTable
			appointments={appointments ?? []}
			columns={patientApptColumns}
		/>
	);
}