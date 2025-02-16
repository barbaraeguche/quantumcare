import { z } from 'zod';
import { numFieldConstraints } from '@/utils/constants.ts';

export const DoctorSchema = z.object({
	licenseNumber: z.string().min(1, { message: 'Enter your license number' }),
	specialization: z.string().min(1, { message: 'Enter your specialization' }),
	yearsOfExperience: z.union([
		z.coerce.number().nullish(),
		z.coerce.number()
			.min(1, { message: `${numFieldConstraints[0]} 1` })
	]),
	languages: z.string().min(1, { message: 'Enter your spoken languages' })
});
export type DoctorType = z.infer<typeof DoctorSchema>;

export const EducationSchema = z.object({
	degree: z.string().min(1, { message: 'Enter your degree name' }),
	institution: z.string().min(1, { message: 'Enter your institution name' }),
	graduationYear: z.string().min(1, { message: 'Enter your graduation year' })
		.optional().or(z.literal(''))
});
export type EducationType = z.infer<typeof EducationSchema>;

// TODO: might not need this, will see
// export const AvailabilitySchema = z.array(z.object({
// 	date: z.string().date('Date cannot be null'),
//   startTime: z.string().min(5, { message: 'Enter a valid start time (e.g., 09:00 AM)' }),
//   endTime: z.string().min(5, { message: 'Enter a valid end time (e.g., 10:00 AM)' })
// }));
// export type AvailabilityType = z.infer<typeof AvailabilitySchema>;