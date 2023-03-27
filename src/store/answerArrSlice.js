import { createSlice } from '@reduxjs/toolkit';

const answerSlice = createSlice({
  name: 'answerArr',
  initialState: { value: [] },
  reducers: {
    setAnswer: (state, action) => {
      state.value = action.value;
    },
  },
});

export { answerSlice };
export const { setAnswerArr } = answerSlice.ations;
