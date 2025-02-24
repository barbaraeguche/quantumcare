import { z } from 'zod';
import { UserSchema } from '@/schemas/userSchema';
import { DoctorSchema } from '@/schemas/doctorSchema';
import { PatientSchema } from '@/schemas/patientSchema';

// for authentication
export const LoginSchema = z.object({
	...(UserSchema.pick({ email: true })).shape,
	password: z.string()
});
export type LoginType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.discriminatedUnion('role', [
	z.object({
		role: z.literal('Doctor'),
		user: UserSchema.omit({ role: true }),
	}).merge(DoctorSchema), // merge doctor schema
	
	z.object({
		role: z.literal('Patient'),
		user: UserSchema.omit({ role: true }),
	}).merge(PatientSchema), // merge patient schema
]);
export type RegisterType = z.infer<typeof RegisterSchema>;