// src/store/reducers/qaDataSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {APIDataModel} from "../../models/APIDataModel";




const initialState: APIDataModel[] = [];

const apiDataSlice = createSlice({
    name: 'qaData',
    initialState,
    reducers: {
        setAPIDataReducer(state, action: PayloadAction<APIDataModel[]>) {
            return action.payload;
        },
        addAPIDataReducer(state, action: PayloadAction<APIDataModel>) {
            state.push(action.payload);
        },
        // You can add more actions here
    },
});

export const { setAPIDataReducer, addAPIDataReducer } = apiDataSlice.actions;
export default apiDataSlice.reducer;
