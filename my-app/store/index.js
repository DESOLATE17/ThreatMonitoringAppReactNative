import { configureStore } from '@reduxjs/toolkit';
import { threatReducer } from './threatSlice';
import { filterReducer } from './filterSlice';

export const store = configureStore({
    reducer: {
        threat: threatReducer,
        filter: filterReducer,
    },
});