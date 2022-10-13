import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const modalsAdapter = createEntityAdapter();
const initialState = modalsAdapter.getInitialState({
  isOpen: false,
  entity: null,
  type: null,
  id: null,
});

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const { type, entity, id } = payload;
      const isOpen = true;
      return {
        ...state, isOpen, entity, type, id: id ?? null,
      };
    },
    closeModal: (state) => {
      const isOpen = false;
      const entity = null;
      const type = null;
      const id = null;
      return {
        ...state, isOpen, entity, type, id,
      };
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

const getModalState = (state) => ({
  isOpen: state.modals.isOpen,
  entity: state.modals.entity,
  type: state.modals.type,
  id: state.modals.id,
});

export { getModalState };

export default modalsSlice.reducer;
