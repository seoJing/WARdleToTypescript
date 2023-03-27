import { createSlice } from '@reduxjs/toolkit';

const checkSlice = createSlice({
  name: 'checkArr',
  initialState: { value: [] },
  reducers: {
    setCheckArr: (state, action) => {
      state.value = action.value;
    },
  },
});

export { checkSlice };
export const { setCheckArr } = checkSlice.ations;
