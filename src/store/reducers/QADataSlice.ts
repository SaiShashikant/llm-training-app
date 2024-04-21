// src/store/reducers/qaDataSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface QADataReducer {
    id: number;
    question: string;
    answer: string;
}

const initialState: QADataReducer[] = [];

const qaDataSlice = createSlice({
    name: 'qaData',
    initialState,
    reducers: {
        setQADataReducer(state, action: PayloadAction<QADataReducer[]>) {
            return action.payload;
        },
        addQADataReducer(state, action: PayloadAction<QADataReducer>) {
            state.push(action.payload);
        },
        // You can add more actions here
    },
});
// console.log(qaDataSlice)
export const {setQADataReducer, addQADataReducer} = qaDataSlice.actions;
export default qaDataSlice.reducer;