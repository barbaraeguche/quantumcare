import {
	addressSchema, emergencyContactSchema, AddressType, EmergencyContactType
} from '@/schemas/userSchema';
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch';
import { saveUser } from '@/redux/thunks/userThunk';
import { resetStatus } from '@/redux/slices/userSlice';
import { provinceOptions } from '@/utils/constants';
import { User } from '@/lib/definitions';
import { FieldConfig } from '@/lib/types';
import GenericEditableForm from '@/components/genericEditableForm';

export default function ContactInfo() {
	const { user } = useAppSelector((state) => state.userSlice);
	
	return (
		<div className={'space-y-12 md:space-y-16'}>
			<Address user={user}/>
			<EmergencyContact user={user}/>
		</div>
	);
}

function Address({ user }: {
	user: User
}) {
	const dispatch = useAppDispatch();
	
	const handleSubmit = (data: AddressType) => {
		dispatch(saveUser({
			id: user._id,
			userInfo: { 'address': data }
		}));
		dispatch(resetStatus());
	};
	
	const addressFields: FieldConfig[] = [
		{
			name: 'street',
			label: 'Street (Optional)',
			placeholder: '123 Main St'
		},
		{
			name: 'city',
			label: 'City (Optional)',
			placeholder: 'Vancouver'
		},
		{
			name: 'province',
			label: 'Province',
			placeholder: 'Select your province',
			isSelect: true,
			options: provinceOptions
		},
		{
			name: 'postalCode',
			label: 'Postal Code',
			placeholder: 'V6B 2K8'
		},
		{
			name: 'country',
			label: 'Country',
			placeholder: 'Canada',
		}
	];
	
	return (
		<GenericEditableForm
			slice={'user'}
			title={'Address'}
			schema={addressSchema}
			fields={addressFields}
			onSubmit={handleSubmit}
			initialValues={user.address}
		/>
	);
}

function EmergencyContact({ user }: {
	user: User
}) {
	const dispatch = useAppDispatch();
	
	const handleSubmit = (data: EmergencyContactType) => {
		dispatch(saveUser({
			id: user._id,
			userInfo: { 'emergencyContact': data }
		}));
		dispatch(resetStatus());
	};
	
	const contactFields: FieldConfig[] = [
		{
			name: 'name',
			label: 'Contact Name',
			placeholder: 'Steve Dave'
		},
		{
			name: 'relationship',
			label: 'Relationship to User (Optional)',
			placeholder: 'Spouse'
		},
		{
			name: 'email',
			label: 'Contact Email',
			placeholder: 'steve.dave@example.com'
		}
	];
	
	return (
		<GenericEditableForm
			slice={'user'}
			fields={contactFields}
			onSubmit={handleSubmit}
			title={'Emergency Contact'}
			schema={emergencyContactSchema}
			initialValues={user.emergencyContact}
		/>
	);
}