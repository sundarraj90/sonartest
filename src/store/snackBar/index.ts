import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SnackBarState {
  snackBar: {
    snackBarOpen: boolean;
    snackBarMessage: string;
    severity: unknown;
  };
}


const initialState: SnackBarState = {
  snackBar: {
    snackBarOpen: false,
    snackBarMessage: '',
    severity: '',
  },
};
interface SnackBarPayload {
  snackBarMessage: string;
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackBarSuccess: (state, { payload }: PayloadAction<SnackBarPayload>) => {
      const { snackBarMessage } = payload;
      return {
        ...state,
        snackBar: {
          ...state.snackBar,
          snackBarMessage,
          snackBarOpen: true,
          severity: 'success',
        },
      };
    },
    setSnackBarFailed: (state, { payload }: PayloadAction<SnackBarPayload>) => {
      const { snackBarMessage } = payload;
      return {
        ...state,
        snackBar: {
          ...state.snackBar,
          snackBarMessage,
          snackBarOpen: true,
          severity: 'error',
        },
      };
    },
    setSnackBarWarning: (state, { payload }: PayloadAction<SnackBarPayload>) => {
      const { snackBarMessage } = payload;
      return {
        ...state,
        snackBar: {
          ...state.snackBar,
          snackBarMessage,
          snackBarOpen: true,
          severity: 'warning',
        },
      };
    },

    setClearSnackBar: (state) => ({
      ...state,
      snackBar: {
        ...state.snackBar,
        snackBarMessage: '',
        snackBarOpen: false,
        severity: '',
      },
    }),
  },
});

export const {
  setSnackBarSuccess,
  setClearSnackBar,
  setSnackBarFailed,
  setSnackBarWarning,
} = snackbarSlice.actions;

export default snackbarSlice.reducer;
