import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { NotFound } from '@/components/errors/error-screens';
import AppointmentsForm from '@/components/booking-form';

export default function EditAppointment() {
	const { id } = useParams();
	const navigate = useNavigate();
	
	const { appointments } = useAppSelector((state) => state.patientSlice.patient);
	const appointmentToEdit = useMemo(() => {
		return appointments?.find((apt) => apt._id === Number(id));
	}, [appointments, id]);
	
	if (!appointmentToEdit) {
		return (<NotFound/>);
	}
	
	return (
		<AppointmentsForm
			mode={'edit'}
			data={appointmentToEdit}
			id={appointmentToEdit._id}
			onCancel={() => navigate(-1)}
		/>
	);
}