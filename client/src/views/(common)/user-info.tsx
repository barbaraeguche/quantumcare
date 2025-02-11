import { useForm, SubmitHandler } from 'react-hook-form';
import Select from 'react-select';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicUserInfoSchema, BasicUserInfoType } from '../../schemas/user-schema.ts';
import FormLayout from '../../layouts/forms.tsx';
import InputWrapper from '../../components/input-wrapper.tsx';
import { Button } from '../../ui/index.ts';
import TailwindSelect from '../../ui/select.tsx';

export default function UserInfo() {
	const {
		register, handleSubmit, formState: { errors }
	} = useForm<BasicUserInfoType>({
		resolver: zodResolver(BasicUserInfoSchema),
		reValidateMode: 'onChange',
		defaultValues: {
			firstName: 'barbara',
      lastName: 'eguche',
      email: 'barbara@gmail.com',
			phoneNumber: '(123) 456-7890',
      gender: 'female'
		}
	});
	
	const onSubmit: SubmitHandler<BasicUserInfoType> = (data) => {
    // submit data
    console.log(data);
  };
	
	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' }
	];
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormLayout>
				{/* first name */}
				<InputWrapper
					{...register('firstName')}
					keyfield={'firstName'}
					label={'First Name'}
					error={errors.firstName}
				/>
				
				{/* last name */}
				<InputWrapper
					{...register('lastName')}
					keyfield={'lastName'}
					label={'Last Name'}
					error={errors.lastName}
				/>
				
				{/* email */}
				<InputWrapper
					{...register('email')}
					keyfield={'email'}
					label={'Email'}
					error={errors.email}
				/>
				
				{/* phone number */}
				<InputWrapper
					{...register('phoneNumber')}
					keyfield={'phoneNumber'}
					label={'Phone number'}
					error={errors.phoneNumber}
				/>
				
				{/* gender */}
				<Select options={options} className={'text-red-500 focus:bg-yellow-500 hover:bg-black'}/>
				<TailwindSelect/>
				
				
				<div className="space-y-2">
					<label htmlFor="gender">Gender</label>
					<select id="gender" {...register('gender')} className="w-full rounded-md p-2 border " defaultValue={'female'}>
						<option value="" className={'p-2 bg-yellow-50 hover:bg-green-100'}>Select Gender</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
				</div>
				
				
				<Button type="submit">Save Changes</Button>
			</FormLayout>
		</form>
	);
}
