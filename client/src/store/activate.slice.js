import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: "",
  avtar: ""
}


export const activateSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setAvtar(state, action) {
      state.avtar = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setName, setAvtar } = activateSlice.actions

export default activateSlice.reducer