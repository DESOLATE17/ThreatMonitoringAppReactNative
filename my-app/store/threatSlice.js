import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    threats: [],
    threat: {name : ""},
};

export const threatSlice = createSlice({
    name: 'threat',
    initialState,
    reducers: {
        setThreats: (state, { payload }) => {
            state.threats = payload.threats;
        },
        setThreat: (state, { payload }) => {
            console.log(payload)
            state.threat = payload;
        },
        resetThreat: (state) => {
            state.threat = {};
        },
    },
});

export const threatReducer = threatSlice.reducer;

export const { setThreats, setThreat, resetThreat } = threatSlice.actions;