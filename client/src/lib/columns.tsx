import { ColumnDef } from '@tanstack/react-table';
import { isAfter, isToday } from 'date-fns';
import { formatDate } from '@/utils/utils';
import { MMM_point_dd_yyyy } from '@/utils/constants';
import { Appointments, User } from '@/lib/definitions';
import AppointmentStatus from '@/ui/appointments/status';
import { DeleteAppointment, EditAppointment } from '@/ui/appointments/action-buttons';

const baseApptColumns: ColumnDef<Appointments>[] = [
	{
		accessorKey: '_id',
		header: 'ID',
		cell: ({ row }) => {
			const aptId = String(row.getValue('_id'));
			return <div>{aptId.padStart(5, '0')}</div>
		}
	},
	{
		accessorKey: 'date',
		header: 'Date',
		cell: ({ row }) => {
			return <div>{formatDate(row.getValue('date'), MMM_point_dd_yyyy)}</div>
		}
	},
	{
		accessorKey: 'time',
		header: 'Time',
	},
	{
		accessorKey: 'type',
		header: 'Type',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => (
			<AppointmentStatus status={row.getValue('status')}/>
		)
	}
];

export const patientApptColumns: ColumnDef<Appointments>[] = [...baseApptColumns];
patientApptColumns.splice(patientApptColumns.length, 0,
	{
		accessorKey: 'statusNote',
		header: 'Status Note',
		cell: ({ row }) => {
			return <div className={'truncate max-w-[250px]'}>{row.getValue('statusNote')}</div>
		}
	},
	{
		accessorKey: 'doctorName',
		header: 'Doctor',
		cell: ({ row }) => {
			return <div>{row.getValue('doctorName') || 'Unidentified'}</div>;
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const { _id, date } = row.original;
			const upcomingAppointment = !isToday(date) && isAfter(date, new Date());
			
			return (
				<>
					{upcomingAppointment && (
						<div className={'flex gap-x-1 items-center'}>
							<EditAppointment id={_id}/>
							<DeleteAppointment aptId={_id}/>
						</div>
					)}
				</>
			);
		}
	}
);

export const doctorApptColumns: ColumnDef<Appointments>[] = [...baseApptColumns];
doctorApptColumns.splice(1, 0, {
	accessorKey: 'patientName',
	header: 'Patient',
	cell: ({ row }) => {
		return <div>{row.getValue('patientName') || 'Unidentified'}</div>;
	}
});
doctorApptColumns.splice(doctorApptColumns.length, 0, {
	accessorKey: 'noteToDoctor',
	header: 'Notes',
	cell: ({ row }) => {
		return <div className={'truncate max-w-[250px]'}>{row.getValue('noteToDoctor')}</div>
	}
});

// --------------------- ADMIN COLUMN   --------------------- //

export const entityColumns: ColumnDef<User>[] = [
	{
		accessorKey: '_id',
		header: 'ID'
	},
	{
		accessorKey: 'firstName',
		header: 'First Name'
	},
	{
		accessorKey: 'lastName',
		header: 'Last Name'
	},
	{
		accessorKey: 'email',
		header: 'Email'
	},
	{
		accessorKey: 'phoneNumber',
		header: 'Phone Number'
	},
	{
		accessorKey: 'gender',
		header: 'Gender'
	}
];