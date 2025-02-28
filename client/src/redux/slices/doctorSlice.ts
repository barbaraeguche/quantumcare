import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	fetchDoctor, fetchDoctors, saveDoctor, saveEducation, saveAvailability
} from '@/redux/thunks/doctorThunk';
import { Doctor, Practitioner } from '@/lib/definitions';
import { ThunkStatus, ThunkError } from '@/lib/types';
import { doctorInitState } from '@/redux/initialStates';

interface DoctorState {
	doctor: Doctor;
	doctors: Doctor[];
	status: ThunkStatus;
	error: ThunkError;
}

const initialState: DoctorState = {
  doctor: doctorInitState,
  doctors: [],
	status: 'idle',
  error: null
};

const doctorSlice = createSlice({
	name: 'doctor',
	initialState,
	reducers: {
		resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
	},
	extraReducers: (builder) => {
		builder
			// fetchDoctor
			.addCase(fetchDoctor.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(fetchDoctor.fulfilled, (state, action: PayloadAction<{ doctor: Doctor }>) => {
				state.status = 'fulfilled';
				state.doctor = action.payload.doctor;
			})
			.addCase(fetchDoctor.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
			
			// fetchDoctors
			.addCase(fetchDoctors.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(fetchDoctors.fulfilled, (state, action: PayloadAction<{ doctors: Doctor[] }>) => {
				state.status = 'fulfilled';
				state.doctors = action.payload.doctors;
			})
			.addCase(fetchDoctors.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
			
			// saveDoctor
			.addCase(saveDoctor.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(saveDoctor.fulfilled, (state, action: PayloadAction<Partial<Practitioner>>) => {
				state.status = 'fulfilled';
				state.doctor.practitioner = {
					...state.doctor.practitioner,
          ...action.payload
				}
			})
			.addCase(saveDoctor.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
			
			// saveEducation
			.addCase(saveEducation.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(saveEducation.fulfilled, (state, action: PayloadAction<NonNullable<Practitioner['education']>>) => {
				state.status = 'fulfilled';
				state.doctor.practitioner.education = {
					...state.doctor.practitioner.education,
					...action.payload
				}
			})
			.addCase(saveEducation.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
			
			// saveAvailability
			.addCase(saveAvailability.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(saveAvailability.fulfilled, (state, action: PayloadAction<NonNullable<Doctor['availabilities']>>) => {
				state.status = 'fulfilled';
				state.doctor.availabilities = {
					...state.doctor.availabilities,
					...action.payload
				}
			})
			.addCase(saveAvailability.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
	}
});

export const { resetStatus } = doctorSlice.actions;
export default doctorSlice.reducer;