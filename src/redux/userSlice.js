import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: null,
  token: null,
  id: null,
  photo: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.photo = action.payload.photo;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.photo = "";
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
