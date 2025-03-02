import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	noBloodTypeSchema, NoBloodType, healthMetricsSchema, HealthMetricsType
} from '@/schemas/patientSchema';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { useEditableState } from '@/hooks/useEditableState';
import { formatDate } from '@/utils/utils';
import { yyyy_MM_dd } from '@/utils/constants';
import { Patient } from '@/lib/definitions';
import InputWrapper from '@/components/inputWrapper';
import FormActionButtons from '@/components/formActionButtons';
import { Card } from '@/ui/index';

export default function PatientInfo() {
	const patient = useAppSelector((state) => state.patientSlice.patient);
	
	return (
		<div className={'space-y-12 md:space-y-16'}>
			<RoleInfo patient={patient}/>
			<HealthMetrics patient={patient}/>
		</div>
	);
}

function RoleInfo({ patient }: {
	patient: Patient
}) {
	const { isEditing, setIsEditing } = useEditableState();
	const {
		register, handleSubmit, formState: { errors }, reset
	} = useForm<NoBloodType>({
		resolver: zodResolver(noBloodTypeSchema),
		reValidateMode: 'onBlur',
		values: {
			...patient,
			dateOfBirth: formatDate(patient.dateOfBirth, yyyy_MM_dd)
		}
	});
	
	const onSubmit: SubmitHandler<NoBloodType> = (data) => {
		console.log(data);
		setIsEditing(false);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<Card.Header title={'Role Information'}/>

				<Card.Content>
					{/* date of birth */}
					<InputWrapper
						{...register('dateOfBirth')}
						readOnly={!isEditing}
						conf={{
							label: 'Date of Birth',
							placeholder: '1900-01-01'
						}}
						name={'dateOfBirth'}
						error={errors.dateOfBirth}
					/>
	
					{/* allergies */}
					<InputWrapper
						{...register('allergies')}
						readOnly={!isEditing}
						conf={{
							label: 'Allergies (Optional)',
							placeholder: 'Peanuts, Milk'
						}}
						name={'allergies'}
						error={errors.allergies}
					/>
	
					{/* blood type */}
					<InputWrapper
						disabled
						readOnly={!isEditing}
						conf={{
							label: 'Blood Type',
							placeholder: 'AB+'
						}}
						name={'bloodType'}
					/>
	
					{/* insurance provider */}
					<InputWrapper
						{...register('insuranceProvider')}
						readOnly={!isEditing}
						conf={{
							label: 'Insurance Provider (Optional)',
							placeholder: 'Sentinel Assurance Inc.'
						}}
						name={'insuranceProvider'}
						error={errors.insuranceProvider}
					/>
	
					{/* insurance policy number */}
					<InputWrapper
						{...register('insurancePolicyNumber')}
						readOnly={!isEditing}
						conf={{
							label: 'Insurance Policy Number (Optional)',
							placeholder: 'SA-9876543210'
						}}
						name={'insurancePolicyNumber'}
						error={errors.insurancePolicyNumber}
					/>
	
					{/* chronic conditions */}
					<InputWrapper
						{...register('chronicConditions')}
						readOnly={!isEditing}
						conf={{
							label: 'Chronic Conditions (Optional)',
							placeholder: 'Diabetes, Asthma'
						}}
						name={'chronicConditions'}
						error={errors.chronicConditions}
					/>
				</Card.Content>
				
				<Card.Footer>
					<FormActionButtons isEditing={isEditing} setIsEditing={setIsEditing} reset={reset}/>
				</Card.Footer>
			</Card>
		</form>
	);
}

function HealthMetrics({ patient }: {
	patient: Patient
}) {
	const { isEditing, setIsEditing } = useEditableState();
	const {
		register, handleSubmit, formState: { errors }, reset
	} = useForm<HealthMetricsType>({
		resolver: zodResolver(healthMetricsSchema),
		reValidateMode: 'onBlur',
		values: patient.healthMetrics
	});

	const onSubmit: SubmitHandler<HealthMetricsType> = (data) => {
		console.log(data);
		setIsEditing(false);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<Card.Header title={'Health Metrics'}/>
				
				<Card.Content>
					{/* height */}
					<InputWrapper
						{...register('height')}
						type={'number'}
						readOnly={!isEditing}
						conf={{
							label: 'Height (cm)',
							placeholder: '175'
						}}
						name={'height'}
						error={errors.height}
					/>
	
					{/* weight */}
					<InputWrapper
						{...register('weight')}
						type={'number'}
						readOnly={!isEditing}
						conf={{
							label: 'Weight (lbs)',
							placeholder: '75' // todo: this was in kg, should be in lbs
						}}
						name={'weight'}
						error={errors.weight}
					/>
	
					{/* heart rate */}
					<InputWrapper
						{...register('heartRate')}
						type={'number'}
						readOnly={!isEditing}
						conf={{
							label: 'Heart Rate (bpm)',
							placeholder: '75'
						}}
						name={'heartRate'}
						error={errors.heartRate}
					/>
				</Card.Content>
			
				<Card.Footer>
					<FormActionButtons isEditing={isEditing} setIsEditing={setIsEditing} reset={reset}/>
				</Card.Footer>
			</Card>
		</form>
	);
}