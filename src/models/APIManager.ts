import {APIDataModel} from "./APIDataModel";
import axios, {AxiosResponse} from "axios";
import toast from "react-hot-toast";

export const base_url = "http://localhost:5000/"

export async function qaData(page_num: number, rows_per_page: number, query_qa: string, query_ans: string): Promise<APIDataModel> {
    try {
        const queryParams = [];

        if (page_num) queryParams.push(`page=${page_num}`);
        if (rows_per_page) queryParams.push(`per_page=${rows_per_page}`);
        if (query_qa) queryParams.push(`query_qa=${query_qa}`);
        if (query_ans) queryParams.push(`query_ans=${query_ans}`);

        const query_str = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
        // console.log(query_str);
        const finalUrl = base_url + 'api/data' + query_str
        const response: AxiosResponse<APIDataModel> = await axios.get<APIDataModel>(finalUrl);
        // console.log("Final Url --", finalUrl)
        return response.data;
    } catch (error) {
        console.error('Error fetching QA data:', error);
        throw error;
    }
}


export async function checkDuplicates(): Promise<any> {
    fetch(base_url + '/api/duplicate_checker', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Duplicate checker response:', data);
            toast.success('Task completed successfully')
        })
        .catch(error => {
            console.error('Error:', error);
            toast.error('Task unsuccessful')
        });
}

export async function updateAnswer(itemId: string, editedAnswer: string): Promise<any> {

    fetch(base_url + '/api/update_answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({item_id: itemId, new_answer: editedAnswer}),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Updated Answer ', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export async function updateQuestion(itemId: string, editedQuestion: string): Promise<any> {

    // Save the edited question
    fetch(base_url + '/api/update_question', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({item_id: itemId, new_question: editedQuestion}),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Updated Question' + data);
        })
        .catch(error => {
            console.log('Error updating question : ' + error); // Handle success or error message
        });


}

export async function convertCSVToJSONL(file: any): Promise<any> {
    // Assuming action.payload is the CSV file
    const formData = new FormData();
    // const file = await fetch(filepath).then((res) => res.blob());
    formData.append('file', file);

    axios.post(`${base_url}/api/convert_csv_to_jsonl`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(response => {
            // Handle successful response
            console.log('Conversion response:', response.data, ", response ", response);
            // You can dispatch another action to update state if needed
            toast.success("JSONL file created");
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error.response ? error.response.data : error.message);
            // You can dispatch another action to handle the error if needed
        });
}

export async function addNewQAPair(newQuestion: string, newAnswer: string): Promise<any> {

    // Send Axios request to update the first item
    if (newQuestion && newAnswer) {
        axios.post(base_url + '/api/add_question', {question: newQuestion, answer: newAnswer})
            .then(response => {
                // If the request is successful, update the state with the new data
                console.log("AddNewQaPair:: ", response);
                toast.success("New Q&A pair added");
            })
            .catch(error => {
                console.error('Error updating Q&A pair:', error);
                // Handle error if needed
                toast.error("Error updating Q&A pair");
            });

    }
}


export const exportToJSONL = async () => {
    try {
        const response = await axios.get(base_url + '/api/export_jsonl_from_sqlite', {
            responseType: 'blob' // Specify response type as blob to handle binary data
        });
        // Create a blob URL for the JSONL file
        const blob = new Blob([response.data], {type: 'application/json'});
        const url = window.URL.createObjectURL(blob);
        // Create a temporary link element to trigger download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'qa_data.jsonl');
        document.body.appendChild(link);
        link.click();
        // Clean up
        link.remove();
        toast.success("Download successful");
    } catch (error) {
        console.error('Error exporting data to JSONL:', error);
        toast.error("Error exporting data to JSONL");
    }
};

export const handleExportBackup = async () => {
    try {
        const response = await axios.get(base_url + '/api/backup_db', {responseType: 'blob'});
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'backup.db'); // Set the filename
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        toast.success("Download successful");
    } catch (error) {
        console.error('Error:', error);
        toast.error("Error Download");
    }
};

export async function cleanItemsApi(text: string, isQuestion: boolean): Promise<any> {
    const post_body = JSON.stringify({
        'wrong_string': text,
        'isQuestion': isQuestion,
    });

    return fetch(base_url + '/api/clean_items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: post_body,
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Error cleaning text:', error);
            toast.error("Error cleaning text");
        });
}

export async function deleteItem(itemId: string): Promise<any> {

    fetch(base_url + '/api/delete_question/<int:item_id>', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({item_id: itemId}),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Updated Question' + data);
            toast.success('Question deleted');
        })
        .catch(error => {
            console.log('Error updating question : ' + error); // Handle success or error message
            toast.error('Error deleting question');
        });


}
