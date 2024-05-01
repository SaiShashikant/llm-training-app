import React from 'react';

interface FileUploadPopupProps {
    handleCSVImportClose: () => void;
    handleCSVFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleJSONLImportClose: () => void;
    handleJSONLFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    showCSVPopup: boolean;
    showJSONLPopup: boolean;
}

const FileUploadPopup: React.FC<FileUploadPopupProps> = ({handleCSVImportClose, handleCSVFileUpload, handleJSONLImportClose, handleJSONLFileUpload, showCSVPopup, showJSONLPopup }) => {
    return (
        <div>
            {showCSVPopup && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6 z-50">
                    <button className="absolute top-0 right-0 px-3 py-1 text-gray-600 hover:text-gray-800" onClick={handleCSVImportClose}>
                        &times;
                    </button>
                    <label htmlFor="dropzone-file" className="flex flex-col p-5 items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                        {/* Optional content for the label */}
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">CSV/JSONL</p>
                        </div>
                    </label>
                    <input id="dropzone-file" type="file" className="hidden" accept=".csv" onChange={handleCSVFileUpload} />
                </div>
            )}
            {showJSONLPopup && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6 z-50">
                    <button className="absolute top-0 right-0 px-3 py-1 text-gray-600 hover:text-gray-800" onClick={handleJSONLImportClose}>
                        &times;
                    </button>
                    <label htmlFor="dropzone-file" className="flex flex-col p-5 items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                        {/* Optional content for the label */}
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">JSONL/CSV</p>
                        </div>
                    </label>
                    <input id="dropzone-file" type="file" className="hidden" accept=".jsonl" onChange={handleJSONLFileUpload} />
                </div>
            )}
        </div>
    );
};

export default FileUploadPopup;
