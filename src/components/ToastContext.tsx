// ToastContext.tsx
import React, {createContext, useContext, useState} from 'react';

interface ToastContextProps {
    showToast: (message: string) => void;
    handleImport: () => void;
    handleExport: () => void;
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
    const [importToast, setImportToast] = useState<boolean>(false);
    const [exportToast, setExportToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage(null);
        }, 3000); // Hide the toast after 3 seconds
    };

    const handleImport = () => {
        setImportToast(true);
    };

    const handleExport = () => {
        setExportToast(true);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            // Handle file upload logic here
            console.log('Uploaded file:', file);
            setImportToast(false); // Close the import popup after uploading file
        }
    };

    const handleExportClose = () => {
        setExportToast(false);
    };

    return (
        <ToastContext.Provider value={{showToast, handleImport, handleExport}}>
            {children}
            {/* Your toast popup components go here */}
            {importToast && (
                <div
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6 z-50">
                    <button className="absolute top-0 right-0 px-3 py-1 text-gray-600 hover:text-gray-800"
                            onClick={() => setImportToast(false)}>
                        &times;
                    </button>
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
                    <label htmlFor="dropzone-file"
                           className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        {/* Optional content for the label */}
                    </label>
                    <input id="dropzone-file" type="file" className="hidden" accept=".csv, .jsonl"/>
                </div>
            )}
            {/* Your other toasts go here */}
        </ToastContext.Provider>


    );
};


