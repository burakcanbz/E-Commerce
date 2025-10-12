import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthRootState, UserInfo } from '../types/redux';

const storedUserInfo = localStorage.getItem('userInfo');

const initialState: AuthRootState = {
    userInfo: storedUserInfo ? (JSON.parse(storedUserInfo) as UserInfo) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state) => {
             state.userInfo = null;
             localStorage.removeItem('userInfo');
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer; 