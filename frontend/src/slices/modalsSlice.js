import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  data: {},
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    open: (state, { payload }) => {
      const { type, data } = payload;
      return {
        ...state, type, data: data ?? {},
      };
    },
    close: (state) => ({
      ...state, type: null, data: {},
    }),
  },
});

export const modalsActions = { ...modalsSlice.actions };

export const modalsSelectors = {
  selectTypeAndData: (state) => ({
    type: state.modals.type,
    data: state.modals.data,
  }),
  isOpen: (state) => !!state.modals.type,
};

export default modalsSlice.reducer;
