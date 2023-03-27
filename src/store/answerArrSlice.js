import { createSlice } from '@reduxjs/toolkit';

const answerArrSlice = createSlice({
  name: 'answerArr',
  initialState: { value: [] },
  reducers: {
    setAnswer: (state, action) => {
      state.value = action.value;
    },
  },
});

export { answerArrSlice };
export const { setAnswerArr } = answerArrSlice.ations;
