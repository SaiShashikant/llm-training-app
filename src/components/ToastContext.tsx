import React, {createContext, useContext, useState} from 'react';
import axios, {AxiosResponse} from "axios";
import {APIDataModel} from "../models/APIDataModel";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export interface ToastContextProps {
    showToast: (message: string) => void;
    handleCSVImport: () => void;
    handleJSONLImport: () => void;
    handleExport: () => void;
    handleExportBackup: () => void;
    addqaPair: () => void;

}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

interface ToastProviderProps {
    children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({children}) => {
    const [importCSVToast, setImportCSVToast] = useState<boolean>(false);
    const [importJSONLToast, setImportJSONLToast] = useState<boolean>(false);
    const [exportToast, setExportToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [addqaPairToast, setaddqaPairToast] = useState<boolean>(false);


    const addqaPair = () => {
        setaddqaPairToast(true);
    }
    const addQAPairClose = () => {
        setaddqaPairToast(false);
    }

    const showToast = (message: string) => {
        setToastMessage(message);
        setImportCSVToast(true); // Set the import toast state to true
        setTimeout(() => {
            setToastMessage(null);
            setImportCSVToast(false); // Hide the import toast after 3 seconds
        }, 3000);
    };

    const showJSONLToast = (message: string) => {
        setToastMessage(message);
        setImportJSONLToast(true); // Set the import toast state to true
        setTimeout(() => {
            setToastMessage(null);
            setImportJSONLToast(false); // Hide the import toast after 3 seconds
        }, 3000);
    };

    const handleCSVImport = () => {
        setImportCSVToast(true);
    };

    const handleCSVImportClose = () => {
        setImportCSVToast(false);
    };

    const handleJSONLImport = () => {
        setImportJSONLToast(true);
    };

    const handleJSONLImportClose = () => {
        setImportJSONLToast(false);
    };

    const handleExport = async () => {
        try {
            // Make a GET request to your API endpoint
            const response: AxiosResponse<APIDataModel> = await axios.get<APIDataModel>('http://localhost:5000/api/data');

            // Extract the data from the response
            const data = response.data;

            // Create a blob object containing the data
            const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});

            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a link element
            const link = document.createElement('a');
            link.href = url;
            link.download = 'exported_data.json'; // Set the filename

            // Append the link to the body and click it to start the download
            document.body.appendChild(link);
            link.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCSVFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            // Handle file upload logic here
            console.log('Uploaded file:', file);
            setImportCSVToast(false); // Close the import popup after uploading file
        }
    };

    const handleJSONLFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            // Handle file upload logic here
            console.log('Uploaded file:', file);
            setImportCSVToast(false); // Close the import popup after uploading file
        }
    };

    function handleExportClose() {
        setExportToast(false);

    }


    const handleExportBackup = async () => {
        try {
            const response = await axios.get('/api/backup_db', {responseType: 'blob'});
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'backup.db'); // Set the filename
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <ToastContext.Provider value={{showToast, handleCSVImport, handleJSONLImport, handleExport, handleExportBackup, addqaPair}}>
            {children}
            {/* Your toast popup components go here */}
            {importCSVToast && (
                <div
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6 z-50">
                    <button className="absolute top-0 right-0 px-3 py-1 text-gray-600 hover:text-gray-800"
                            onClick={handleCSVImportClose}>
                        &times;
                    </button>
                    <label htmlFor="dropzone-file"
                           className="flex flex-col p-5 items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                        {/* Optional content for the label */}
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">CSV / JSONL</p>
                        </div>
                    </label>
                    <input id="dropzone-file" type="file" className="hidden" accept=".csv, .jsonl"
                           onChange={handleCSVFileUpload}/>
                </div>
            )}
            {importJSONLToast && (
                <div
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6 z-50">
                    <button className="absolute top-0 right-0 px-3 py-1 text-gray-600 hover:text-gray-800"
                            onClick={handleJSONLImportClose}>
                        &times;
                    </button>
                    <label htmlFor="dropzone-file"
                           className="flex flex-col p-5 items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                        {/* Optional content for the label */}
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">JSONL / DB</p>
                        </div>
                    </label>
                    <input id="dropzone-file" type="file" className="hidden" accept=".csv, .jsonl"
                           onChange={handleJSONLFileUpload}/>
                </div>
            )}
            {exportToast && (
                <div
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6 z-50">
                    <button className="absolute top-0 right-0 px-3 py-1 text-gray-600 hover:text-gray-800"
                            onClick={handleExportClose}>
                        &times;
                    </button>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor"
                                  d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            Click to download the exported data.
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">CSV / JSONL</p>
                    </div>
                    <button
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        onClick={handleExport}
                    >
                        Export Data
                    </button>
                </div>
            )}
            {addqaPairToast && (
                <div
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6 z-50">
                    <button className="absolute top-0 right-0 px-3 py-1 text-gray-600 hover:text-gray-800"
                            onClick={addQAPairClose}>
                        &times;
                    </button>
                    <h2 className="text-xl font-semibold mb-2">Add New QA Pair</h2>
                    <label className="block mb-4">
                        Question:
                        <input type="text" className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                    </label>
                    <CKEditor
                        editor={ClassicEditor}
                        data=""
                        config={{
                            // Your CKEditor configuration options
                        }}
                        onChange={(event: any, editor: any) => {
                            const data = editor.getData();
                            console.log(data);
                        }}
                    />
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        onClick={addQAPairClose}
                    >
                        Submit
                    </button>
                </div>

            )}
            {/* Your other toasts go here */}
        </ToastContext.Provider>
    );
};
