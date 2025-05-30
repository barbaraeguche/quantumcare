import { z } from 'zod';
import { numFieldConstraints } from '@/utils/constants';

export const doctorSchema = z.object({
	licenseNumber: z.string().min(5, { message: 'Enter your license number' }),
	specialization: z.string().min(5, { message: 'Enter your specialization' }),
	yearsOfExperience: z.union([
		z.literal('').transform(() => 0),
		z.coerce.number()
			.min(3, { message: `${numFieldConstraints[0]} 3` })
			.max(50, { message: `${numFieldConstraints[1]} 50` })
	]),
	languages: z.string().min(1, { message: 'Enter your spoken languages' })
});
export type DoctorType = z.infer<typeof doctorSchema>;

export const educationSchema = z.object({
	degree: z.string().min(1, { message: 'Enter your degree name' }),
	institution: z.string().min(1, { message: 'Enter your institution name' }),
	graduationYear: z.string().length(4, { message: 'Enter your 4-digit graduation year' })
		.or(z.literal(''))
});
export type EducationType = z.infer<typeof educationSchema>;