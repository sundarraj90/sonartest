import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth';
import onboarding from './onboarding';
import snackbar from './snackBar';

const rootReducer = combineReducers({
  auth,
  onboarding,
  snackbar,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
