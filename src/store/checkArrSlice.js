import { createSlice } from '@reduxjs/toolkit';

const checkArrSlice = createSlice({
  name: 'checkArr',
  initialState: { value: [] },
  reducers: {
    setCheckArr: (state, action) => {
      state.value = action.value;
    },
  },
});

export { checkArrSlice };
export const { setCheckArr } = checkArrSlice.ations;
