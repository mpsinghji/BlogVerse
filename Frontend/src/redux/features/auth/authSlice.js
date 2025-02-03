import { createSlice } from '@reduxjs/toolkit';

// Utility function to check if the token exists in cookies
const isTokenPresentInCookies = () => {
  const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
  return !!token;
};

// Utility function to get the initial state from localStorage
const loadUserFromLocalStorage = () => {
  try {
    // if (!isTokenPresentInCookies()) {
    //   localStorage.removeItem('user');
    //   return { user: null };
    // }

    const serializedState = localStorage.getItem('user');
    if (serializedState === null) return { user: null };
    return { user: JSON.parse(serializedState) };
  } catch (err) {
    return { user: null };
  }
};

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      // Save user state to localStorage
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      // Remove user from localStorage
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;