import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: null,
  context: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, { payload: { type, context = null } }) => ({
      ...state,
      isOpen: true,
      type,
      context,
    }),
    close: (state) => ({
      ...state,
      isOpen: false,
    }),
  },
});

export const { actions } = modalSlice;

export const selectors = {
  getModalType: (state) => state.modal.type,
  isModalOpen: (state) => state.modal.isOpen,
  getModalContext: (state) => state.modal.context,
};

export default modalSlice.reducer;
