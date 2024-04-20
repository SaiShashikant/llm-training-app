import {QADataModel} from "./QADataModel";

export interface APIDataModel {
    items: QADataModel[];
    count: number;
    ans_query_txt:string;
    page_num: number;
    per_page_num : number;
    qa_query_txt:string;
}