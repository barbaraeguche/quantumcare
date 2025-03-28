import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEditableState } from '@/hooks/useEditableState';
import { FieldConfig } from '@/lib/types';
import InputWrapper from '@/components/inputWrapper';
import FormActionButtons from '@/components/formActionButtons';
import { Card, Select } from '@/ui/index';
import { ZodSchema } from 'zod';
import { useRequestStatus } from '@/hooks/useRequestStatus';

interface GenericEditableFormProps<T extends Record<string, any>> {
	title: string;
	slice: 'user' | 'doctor' | 'patient';
	initialValues?: T;
	schema: ZodSchema;
	fields: FieldConfig[];
	onSubmit: (data: T) => void;
	readOnlyFields?: string[];
}

export default function GenericEditableForm<T extends Record<string, any>>(
	{ title, slice, initialValues, schema, fields, onSubmit, readOnlyFields = [] }: GenericEditableFormProps<T>
) {
	const isPending = useRequestStatus(slice);
	const { isEditing, setIsEditing } = useEditableState();
	
	const {
		register, handleSubmit, formState: { errors, isDirty }, control, reset
	} = useForm<T>({
		resolver: zodResolver(schema),
		reValidateMode: 'onBlur',
		values: initialValues
	});
	
	const formSubmit: SubmitHandler<T> = (data) => {
		if (isDirty) {
			onSubmit(data);
			reset();
		}
		setIsEditing(false);
	};
	
	return (
		<form onSubmit={handleSubmit(formSubmit)}>
			<Card>
				<Card.Header title={title}/>
				
				<Card.Content>
					{fields.map((field) => (
						field.isSelect ? (
							<Select
								key={field.name}
								disabled={!isEditing}
								conf={{
									label: field.label,
                  placeholder: field.placeholder,
                  readOnly: !isEditing
								}}
								name={field.name as any}
								control={control}
								options={field.options!}
								error={errors[field.name] as FieldError | undefined}
							/>
						) : (
							<InputWrapper
								key={field.name}
								type={field.type}
								{...register(field.name as any)}
								readOnly={!isEditing || readOnlyFields?.includes(field.name)}
								disabled={field.disabled}
								conf={{
									label: field.label,
									placeholder: field.placeholder
								}}
								name={field.name}
								error={errors[field.name] as FieldError | undefined}
							/>
						)
					))}
				</Card.Content>
				
				<Card.Footer>
					<FormActionButtons<T>
						isPending={isPending}
						reset={reset}
						isEditing={isEditing}
						setIsEditing={setIsEditing}
					/>
				</Card.Footer>
			</Card>
		</form>
	);
}