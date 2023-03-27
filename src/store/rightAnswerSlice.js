import { createSlice } from '@reduxjs/toolkit';

const rightAnswerSlice = createSlice({
  name: 'rightAnswer',
  initialState: { value: [] },
  reducers: {
    setRightAnswer: (state, action) => {
      state.value = action.value;
    },
  },
});

export { rightAnswerSlice };
export const { setRightAnswer } = rightAnswerSlice.ations;
