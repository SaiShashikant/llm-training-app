// src/store/reducers.ts

import {combineReducers} from '@reduxjs/toolkit';
import APIDataReducer from "./reducers/APIDataReducer";

const rootReducer = combineReducers({
    apiData: APIDataReducer,
    // Add more reducers as needed
});
// console.log(rootReducer)
export default rootReducer;
