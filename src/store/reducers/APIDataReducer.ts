

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
    total_qa_count: 0,

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
            state.total_qa_count = action.payload.total_qa_count;
        },

        setQAPerPage(state, action: PayloadAction<number>) {
            state.qa_per_page = action.payload;
        },
        deleteQAPair(state, action: PayloadAction<number>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        checkDuplicates(state) {
            alert('Finding duplicates - Please wait...');

            fetch('/api/duplicate_checker', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Duplicate checker response:', data);
                    alert('Task Completed - ' + data.message);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },


    },
});

export const {setAPIDataReducer,setQAPerPage,deleteQAPair,checkDuplicates} = apiDataSlice.actions;
export default apiDataSlice.reducer;
