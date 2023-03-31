import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface OnboardingState {
  emailToken: string;
  emailOTP: number;
  emailVerified: boolean;
  verifiedEmail: string;
  firstName: string;
  lastName: string;
  empId: number;
  profileImage: string;
}

const initialState: OnboardingState = {
  emailToken: '',
  emailOTP: 1,
  emailVerified: false,
  verifiedEmail: 'string',
  firstName: '',
  lastName: '',
  empId: 0,
  profileImage: '',
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setEmailToken: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      emailToken: payload,
    }),
    setEmailVerified: (state, { payload }: PayloadAction<boolean>) => ({
      ...state,
      emailVerified: payload,
    }),
    setVerifiedEmail: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      verifiedEmail: payload,
    }),
    setFirstName: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      firstName: payload,
    }),
    setLastName: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      lastName: payload,
    }),
    setEmpId: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      empId: payload,
    }),
    setProfileIamge: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      profileImage: payload,
    }),
  },
});

export const {
  setEmailToken,
  setEmailVerified,
  setVerifiedEmail,
  setFirstName,
  setLastName,
  setEmpId,
  setProfileIamge,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
