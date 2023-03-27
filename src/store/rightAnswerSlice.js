import { createSlice } from '@reduxjs/toolkit';

const rightSlice = createSlice({
  name: 'rightAnswer',
  initialState: { value: [] },
  reducers: {
    setRightAnswer: (state, action) => {
      state.value = action.value;
    },
  },
});

export { rightSlice };
export const { setRightAnswer } = rightSlice.ations;
