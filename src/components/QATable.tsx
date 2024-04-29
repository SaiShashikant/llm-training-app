import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {APIDataModel} from "../models/APIDataModel";
import {useToast} from "./ToastContext";
import striptags from 'striptags';
import {deleteQAPair} from "../store/reducers/APIDataReducer";


const QATable: React.FC = () => {
    const apiData = useSelector((state: RootState) => state.apiData) as APIDataModel;
    const {addqaPair} = useToast();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(apiData.qa_per_page); // Number of items to display per page
    const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
    const [editedQuestion, setEditedQuestion] = useState<string>('');
    const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
    const [editedAnswer, setEditedAnswer] = useState<string>('');



    useEffect(() => {
        // Update itemsPerPage when apiData changes
        setItemsPerPage(apiData.qa_per_page);
    }, [apiData.qa_per_page]);

    // Calculate total number of pages
    const totalPages = Math.ceil(apiData.items.length / itemsPerPage);

    // Function to handle page change
    const handlePageChange = (pageNumber: number) => {
        // Ensure the new page number is within the valid range
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };


    // Calculate start and end index of items to display on current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, apiData.items.length);


    function addQAPairToast() {
        addqaPair();
    }

    const toggleQuestionEditor = (itemId: string) => {
        if (itemId === editingQuestionId) {
            // Save the edited question
            fetch('/api/update_question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({item_id: itemId, new_question: editedQuestion}),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message, false); // Handle success or error message
                })
                .catch(error => {
                    console.log('Error updating question : ' + error, true); // Handle success or error message
                });

            setEditingQuestionId(null);
        } else {
            // Enable editing
            setEditingQuestionId(itemId);
            // Get the current question text from your data source
            const questionText = apiData.items.find(item => String(item.id) === itemId)?.question || '';
            setEditedQuestion(questionText);
        }
    };

    const handleQuestionChange = (e: React.ChangeEvent<HTMLDivElement>) => {
        setEditedQuestion(e.target.textContent || ''); // Use textContent or innerHTML based on your requirement
    };
    const toggleAnswerEditor = (itemId: string) => {
        if (itemId === editingAnswerId) {
            // Save the edited answer
            fetch('/api/update_answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({item_id: itemId, new_answer: editedAnswer}),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message, false); // Handle success or error message
                })
                .catch(error => {
                    console.log('Error updating answer : ' + error, true); // Handle success or error message
                });

            setEditingAnswerId(null);
        } else {
            // Enable editing
            setEditingAnswerId(itemId);
            // Get the current answer text from your data source
            const answerText = apiData.items.find(item => String(item.id) === itemId)?.answer || '';
            setEditedAnswer(answerText);
        }
    };

    const handleAnswerChange = (e: React.ChangeEvent<HTMLDivElement>) => {
        setEditedAnswer(e.target.textContent || ''); // Use textContent or innerHTML based on your requirement
    };

    const handleDelete = (itemId: number) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            dispatch(deleteQAPair(itemId));
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold my-4">LLM Training Data</h1>
                    <div>
                        <p>{apiData.items.length > 0 ? `Total Q&A Pairs: ${apiData.items.length}` : 'No Q&A pairs available.'}</p>
                    </div>
                </div>
                <div className="ml-auto">
                    <button
                        type="button"
                        onClick={() => addQAPairToast()}
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Add new QA Pair
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-md rounded my-6 overflow-x-auto w-full">
                <table className="w-full leading-normal custom-table-layout">
                    <thead>
                    <tr>
                        <th className="px-5 py-3 w-8 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider col-id">
                            IDs
                        </th>
                        <th className="px-5 py-3 w-1/4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider col-question">
                            Questions
                        </th>
                        <th className="px-5 py-3 w-2/4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider col-answer">
                            Answers
                        </th>
                        <th className="px-5 py-3 w-20 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider col-action">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {apiData.items.map(item => (
                        <tr key={item.id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-id">
                                <div className="flex items-center">{item.id}</div>
                            </td>
                            <td className="px-5 py-5 border-b w-1/4 border-gray-200 bg-white text-sm col-question">

                                    {editingQuestionId === String(item.id) ? (
                                        <input
                                            type="text"
                                            className="px-5 py-5 border-b w-full border-gray-200 bg-white text-sm col-question"
                                            value={editedQuestion}
                                            onChange={(e) => setEditedQuestion(e.target.value)}
                                            onBlur={() => toggleQuestionEditor(String(item.id))}
                                        />
                                    ) : (
                                        <div className="flex items-center w-full">{item.question}</div>
                                    )}

                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-answer">
                                {editingAnswerId === String(item.id) ? (
                                    <input
                                        type="text"
                                        className="px-5 py-5 border-b w-full border-gray-200 bg-white text-sm col-answer"
                                        value={editedAnswer}
                                        onChange={(e) => setEditedAnswer(e.target.value)}
                                        onBlur={() => toggleAnswerEditor(String(item.id))}
                                    />
                                ) : (
                                    <div className="flex items-center w-full">{striptags(item.answer)}</div>
                                )}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-action">
                                <div className="flex justify-around items-center">

                                    <button
                                        onClick={() => toggleQuestionEditor(String(item.id))}
                                        className="flex flex-col items-center gap-1 m-1 px-3 py-1 rounded-md focus:outline-none text-sm font-medium text-black bg-green-500 hover:bg-green-600"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                        </svg>
                                        {editingQuestionId === String(item.id) ? (
                                            <span>Save</span>
                                        ) : (
                                            <span>Edit Question</span>
                                        )}
                                    </button>

                                    <button
                                        onClick={() => toggleAnswerEditor(String(item.id))}
                                        className="flex flex-col items-center gap-1 px-3 py-1 ml-1 rounded-md focus:outline-none text-sm font-medium text-black bg-green-500 hover:bg-green-600"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M16 15v2m-3-2v2m-3 0v-2m0-9V5a3 3 0 013-3h0a3 3 0 013 3v1m-6 0V5m0 0H9m0 0H7m0 0H5m0 0H3"/>
                                        </svg>
                                        {editingAnswerId === String(item.id) ? (
                                            <span>Save</span>
                                        ) : (
                                            <span>Edit Answer</span>
                                        )}
                                    </button>

                                    <button
                                        className="flex flex-col items-center gap-1 px-3 py-1 rounded-md focus:outline-none text-red-500 hover:text-red-800"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <svg className="w-4 h-4 stroke-current" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                        <span>Delete Row</span>
                                    </button>

                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {/* Pagination Links */}
                <div className="flex justify-end mt-4">
                    {/* Previous Page Link */}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 mx-1 border rounded bg-gray-200"
                    >
                        Previous
                    </button>
                    {/* Page Number Links */}
                    {Array.from({length: totalPages}, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-3 py-1 mx-1 border rounded ${
                                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    {/* Next Page Link */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 mx-1 border rounded bg-gray-200"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QATable;
