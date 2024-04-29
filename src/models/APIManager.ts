import {APIDataModel} from "./APIDataModel";
import axios, {AxiosResponse} from "axios";


export async function qaData(): Promise<APIDataModel> {
    try {
        const response: AxiosResponse<APIDataModel> = await axios.get<APIDataModel>('http://localhost:5000/api/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching QA data:', error);
        throw error;
    }
}

export async function fetchPageData(pageNumber: string, rowsPerPage: number): Promise<APIDataModel> {
    try {
        const response: AxiosResponse<APIDataModel> = await axios.get<APIDataModel>(`http://localhost:5000/api/data?page=${pageNumber}&limit=${rowsPerPage}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching QA data:', error);
        throw error;
    }
}