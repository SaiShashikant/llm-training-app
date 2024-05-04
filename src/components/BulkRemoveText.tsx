import React, { useState } from "react";
import { cleanItemsApi } from "../models/APIManager";
import toast from "react-hot-toast"; // Import the API function for cleaning items

interface BulkRemoveTextPopupProps {
    onClose: () => void; // Function to handle closing of the popup
}

const BulkRemoveText: React.FC<BulkRemoveTextPopupProps> = ({ onClose }) => {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('questions'); // Default category
    const [statusMessage, setStatusMessage] = useState('');

    const processCleanText = () => {
        // Call the API to clean the items
        // console.log('Processing' , category, statusMessage ,text);
        cleanItemsApi(text, category === 'questions')
            .then(data => {
                setStatusMessage(`${data.message}\nCleaned ${data.total_items}. Found text in ${data.items_with_text} items.`);
                toast.success("Removed successfully")
            })
            .catch(error => {
                console.error('Error cleaning text:', error);
                setStatusMessage('Error occurred while cleaning text.');
                toast.error("Error occurred while cleaning text.")
            });
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

    return (
        <div id="bulk-remove-text-popup" className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6 z-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Bulk Remove Text</h3>
            <div className="mt-3 text-center">
                <label htmlFor="bulk-remove-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Text to be removed</label>
                <input
                    type="text"
                    placeholder="Enter the Text to be removed"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="mb-3 px-2 py-1 border rounded w-full text-black" // Change 'text-black' to your desired color class
                />                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From</label>
                    <select id="category" value={category} onChange={handleCategoryChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option value="questions">All Questions</option>
                        <option value="answers">All Answers</option>
                    </select>
                </div>
            </div>
            <div className="items-center px-4 py-3">
                <button id="bulk-remove-cancel-btn" onClick={onClose} className="px-4 py-1 text-white bg-gray-500 rounded hover:bg-gray-600 mr-2">Cancel</button>
                <button id="bulk-remove-run-btn" onClick={processCleanText} className="px-4 py-1 text-green-500 bg-blue-500 rounded hover:bg-blue-600">Run Cleaner</button>
            </div>
            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <span id="bulk-remove-text-status" className="hidden font-medium">{statusMessage}</span>
            </div>
        </div>
    );
};

export default BulkRemoveText;
