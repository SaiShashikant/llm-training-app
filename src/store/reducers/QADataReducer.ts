// src/store/reducers/QADataModelSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {QADataModel} from "../../models/QADataModel";


const initialState: QADataModel[] = [];

const QADataModelSlice = createSlice({
    name: 'QADataModel',
    initialState,
    reducers: {
        setQADataModelReducer(state, action: PayloadAction<QADataModel[]>) {
            return action.payload;
        },
        addQADataModelReducer(state, action: PayloadAction<QADataModel>) {
            state.push(action.payload);
        },
        // You can add more actions here
    },
});

export const {setQADataModelReducer, addQADataModelReducer} = QADataModelSlice.actions;
export default QADataModelSlice.reducer;
