import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    settings: localStorage.getItem('mode') ? JSON.parse(localStorage.getItem('mode')) : '(241 245 249)',
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setScreenMode: (state, action) => {
            state.settings = action.payload;
            localStorage.setItem('mode', JSON.stringify(action.payload));
        },
        setClearScreenMode: (state, action) => {
            state.settings = '(241 245 249)';
            localStorage.setItem('mode', JSON.stringify(state.settings));
        }
}
});

export const { setScreenMode, setClearScreenMode } = settingsSlice.actions;

export default settingsSlice.reducer; 