import React, {useState} from "react";
import {useToast} from './ToastContext';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
    const {showToast, handleImport, handleExport} = useToast();

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleImportClick = () => {
        handleImport(); // Call the function to show the import popup
    };

    const handleExportClick = () => {
        handleExport(); // Call the function to show the export popup
    };

    return (
        <header className="flex justify-between items-center bg-gray-900 text-white p-4">
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
                                        onClick={handleImportClick}
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Import CSV to JSONL
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        onClick={handleImportClick}
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
                                        onClick={handleExportClick}
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Backup DB
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        onClick={handleExportClick}
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Check Duplicates
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        onClick={handleExportClick}
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Bulk Remove Text
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </nav>
        </header>
    );
};

export default Header;
