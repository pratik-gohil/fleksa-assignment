import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.redux';

/**
 * This slice used for all kind of errors in one place
 * We just needs to add the <Snackbar /> Component at the root level of the page and
 * update the state of error
 */
const SLICE_NAME = 'common';

type ISnackbarType = 'warning' | 'error' | 'info' | 'success';

export interface ICommonSliceState {
  error: {
    message: string;
    severity: ISnackbarType;
    show: boolean;
    duration?: number;
  };
}

const initialState: ICommonSliceState = {
  error: {
    message: 'test error message',
    severity: 'info',
    show: false,
    duration: 3000,
  },
};

export const CommonSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateError: (state, action) => {
      state.error = { ...state.error, ...action.payload };
    },
  },
});

export const { updateError } = CommonSlice.actions;

export const selectError = (state: RootState) => state.common.error;
