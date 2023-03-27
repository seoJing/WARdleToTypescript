import { createSlice } from '@reduxjs/toolkit';

const scoreSlice = createSlice({
  name: 'score',
  initialState: { value: 0 },
  reducers: {
    setScore: (state, action) => {
      state.value = action.value;
    },
  },
});

export { scoreSlice };
export const { setScore } = scoreSlice.ations;
