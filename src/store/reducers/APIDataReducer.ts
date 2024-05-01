import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {APIDataModel} from "../../models/APIDataModel";


interface APISliceState extends APIDataModel {
}


const initialState: APISliceState = {
    items: [],
    answer_search_query: '',
    question_search_query: '',
    current_page_number: 1,
    qa_per_page: 50,
    total_results_count: 0,

};

const apiDataSlice = createSlice({
    name: 'apiData',
    initialState,
    reducers: {
        setAPIDataReducer(state, action: PayloadAction<APIDataModel>) {
            state.items = action.payload.items;
            state.answer_search_query = action.payload.answer_search_query;
            state.question_search_query = action.payload.question_search_query;
            state.current_page_number = action.payload.current_page_number;
            state.qa_per_page = action.payload.qa_per_page;
            state.total_results_count = action.payload.total_results_count;
        },

        setRowsPerPage(state, action: PayloadAction<number>) {
            state.qa_per_page = action.payload;
        },
        deleteQAPair(state, action: PayloadAction<number>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },

    }
});

export const {setAPIDataReducer,} = apiDataSlice.actions;
export default apiDataSlice.reducer;
