import React, {useState} from "react";
import FileUploadPopup from "./FileUploadPopup";
import {checkDuplicates, convertCSVToJSONL, exportToJSONL, handleExportBackup} from "../models/APIManager";
import BulkRemoveText from "./BulkRemoveText";
import toast from "react-hot-toast";

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showPopup, setShowPopup] = useState<'csv' | 'jsonl' | null>(null);
    const [showBulkRemoveText, setShowBulkRemoveText] = useState(false);

    const handleCSVImportClick = () => {
        setShowPopup('csv');
    };

    const handleJSONLImportClick = () => {
        setShowPopup('jsonl');
    };

    const handleImportClose = () => {
        setShowPopup(null);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleCSVFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0]; // Extract the first File object from the FileList
            convertCSVToJSONL(file)
                .then(data => {
                    console.log('Response body data:', data);
                    toast.success("File uploaded successfully");
                })
                .catch(error => {
                    console.error('Error fetching QA data:', error);
                    toast.error(error);
                });// Pass the file object to the action creator
            // You can perform other file upload logic here if needed
        }
    };

    const handleJSONLFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Handle file upload logic here
        const files = event.target.files;
        if (files && files.length > 0) {
            // Handle file upload logic here
            console.log('File uploaded:', files[0]);
            toast.success("File uploaded successfully");
        }
        else{
            toast.error("File upload failed");
        }
    };


    const handleExportClick = () => {
        // handleExport(); // Call the function to show the export popup
        exportToJSONL();

    };

    function handleExportClickBackup() {
        // handleExportBackup(); //
        handleExportBackup();
    }

    const handleCheckDuplicates = () => {
        checkDuplicates()
            .then(data => {
                console.log('Response body data:', data);
                toast.success(data);

            })
            .catch(error => {
                console.error('Error fetching QA data:', error);
                toast.error(error);
            });
    };

    const bulkTextRemover = () => {
        setShowBulkRemoveText(true);
    };

    return (
        <header className="flex justify-between items-center bg-gray-900 text-black p-4">
            <nav className="max-w-full bg-gray-200 border-gray-200 dark:bg-gray-900 w-full rounded">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <span className="self-center flex items-center">
                        <img src="logo.png" alt="LLM Training Tools Logo" className="h-8 w-8 mr-2"/>
                        <span className="text-2xl text-gray-800 font-semibold whitespace-nowrap dark:text-gray-800">LLM Training Tools </span>
                    </span>
                    <div>
                        <button
                            data-collapse-toggle="navbar-default"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-default"
                            aria-expanded={isOpen ? 'true' : 'false'}
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                        <div
                            className={`${
                                isOpen ? 'block' : 'hidden'
                            } w-full md:block md:w-auto`}
                            id="navbar-default"
                        >
                            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0   dark:border-gray-700">
                                <li>
                                    <a
                                        href="#"
                                        onClick={handleCSVImportClick}
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Import CSV to JSONL
                                    </a>

                                </li>
                                <li>
                                    <a
                                        href="#"
                                        onClick={handleJSONLImportClick}
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Import JSONL to DB
                                    </a>

                                </li>
                                <li>
                                    <a
                                        href="#"
                                        onClick={handleExportClick}
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Export to JSONL
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        onClick={handleExportClickBackup}
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Backup DB
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        onClick={handleCheckDuplicates}
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Check Duplicates
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        onClick={bulkTextRemover}
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Bulk Remove Text
                                    </a>
                                    {showBulkRemoveText && <BulkRemoveText onClose={() => setShowBulkRemoveText(false)} />}
                                </li>
                                <li>
                                    <a
                                        href="#"

                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        AI FAQ Generator
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </nav>
            {showPopup && (
                <FileUploadPopup
                    handleCSVImportClose={handleImportClose}
                    handleCSVFileUpload={handleCSVFileUpload}
                    handleJSONLImportClose={handleImportClose}
                    handleJSONLFileUpload={handleJSONLFileUpload}
                    showCSVPopup={showPopup === 'csv'}
                    showJSONLPopup={showPopup === 'jsonl'}
                />
            )}
        </header>
    );
};

export default Header;
