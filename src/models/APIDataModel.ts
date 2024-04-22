import {QADataModel} from "./QADataModel";

export interface APIDataModel {
    items: QADataModel[];
    total_qa_count: number;
    answer_search_query: string;
    current_page_number: number;
    qa_per_page: number;
    question_search_query: string;
}