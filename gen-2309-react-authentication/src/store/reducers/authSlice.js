import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: "",
  user: {
    id: "",
    email: "",
    username: "",
    role: "",
  },
};

function getStoredAuthState() {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer" + token;
    return {
      token: token,
      user: JSON.parse(userString),
    };
  }

  return { ...initialState };
}

const authSlice = createSlice({
  name: "auth",
  initialState: getStoredAuthState,
  reducers: {
    setToken(state, action) {
      const token = action.payload;
      state.token = token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer" + token;
    },
    setUser(state, action) {
      const { id, email, username, role } = action.payload;
      state.user.id = id;
      state.user.email = email;
      state.user.username = username;
      state.user.role = role;
      localStorage.setItem(
        "user",
        JSON.stringify({ id, email, username, role })
      );
    },
    resetAuthData() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      return { ...initialState };
    },
  },
});

export const { setToken, setUser, resetAuthData } = authSlice.actions;
export const selectRole = (state) => state.auth.user.role;
export default authSlice.reducer;
