// src/store/reducers.ts

import { combineReducers } from '@reduxjs/toolkit';
import QADataReducer from "./reducers/QADataReducer";

const rootReducer = combineReducers({
    qaData: QADataReducer,
    // Add more reducers as needed
});

export default rootReducer;
