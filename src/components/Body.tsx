import React, { useEffect, useState } from 'react';
import QATable from './QATable';
import {useDispatch, useSelector} from 'react-redux';
import { APIDataModel } from "../models/APIDataModel";
import { setAPIDataReducer, setQAPerPage } from "../store/reducers/APIDataReducer";
import {RootState} from "../store";
import {fetchPageData, qaData} from "../models/APIManager";

const Body: React.FC = () => {
    const dispatch = useDispatch();
    const apiDataPage = useSelector((state: RootState) => state.apiData) as APIDataModel;
    const [pageNumber , setPageNumber] = useState(1); // Initialize page number state
    const [rowsPerPage, setRowsPerPage] = useState(50); // Initialize rows per page state
    const [keyword, setKeyword] = useState('');
    const maxPageValue = Math.ceil(apiDataPage.total_qa_count / apiDataPage.qa_per_page);
    const [rowsPerPageInputValue, setRowsPerPageInputValue] = useState("50");




    useEffect(() => {
        // console.log('Effect triggered');
        qaData()
            .then(data => {
                dispatch(setAPIDataReducer(data));
                // console.log("useEffect:fetchData:then::API Data", data);
            })
            .catch(error => {
                console.error('Error fetching QA data:', error);
            });
    }, [dispatch]);
    // console.log('Component rendered');

    const handleRowsPerPageChange = (rowsPerPage: number) => {
        // Dispatch an action to update qa_per_page
        dispatch(setQAPerPage(rowsPerPage));
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    const handleSearch = () => {
        console.log('Searching for:', keyword);
        // Add search functionality
    };

    const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.match(/^[1-9]\d*$/) || value === '') {
            setPageNumber(parseInt(value)); // Convert value to number before setting state
        }
    };


    const handleGoToPage = () => {
        if (!isNaN(pageNumber)) { // Check if pageNumber is a valid number
            fetchPageData(pageNumber.toString(), rowsPerPage) // Convert pageNumber to string for consistency
                .then(data => {
                    dispatch(setAPIDataReducer(data));
                })
                .catch(error => {
                    console.error('Error fetching QA data:', error);
                });
        }
    };

    useEffect(() => {
    fetchPageData('1', 50); // Fetch data by default on page 1
}, []);




    return (
        <div className="w-full m-6 p-4">
            <div className="min-h-screen flex justify-center items-center">
                <div
                    className="flex flex-col md:flex-row justify-center items-center bg-white shadow-md rounded p-6 border border-gray-300">
                    <div className="flex flex-wrap items-center">
                        <div className="flex items-center m-2">
                            <label className="p-2">Go to Page:</label>
                            <input
                                type="number"
                                placeholder="Go to Page"
                                value={pageNumber}
                                onChange={handlePageChange}
                                className="w-20 md:w-32 h-10 mr-3 rounded-lg bg-gray-100 text-gray-700 px-4 py-2.5 dark:bg-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
                                pattern="[1-9]\d*"
                                max={maxPageValue} // Set the maximum value dynamically
                                required
                            />
                            <button
                                type="button"
                                onClick={handleGoToPage}
                                className="focus:outline-none m-2 mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Go
                            </button>
                        </div>
                        <div className="flex items-center m-2">
                            <input
                                type="number"
                                placeholder="Rows per Page"
                                value={rowsPerPageInputValue}
                                onChange={(e) => setRowsPerPageInputValue(e.target.value)} // Update the input value
                                className="w-20 md:w-32 h-10 mr-3 rounded-lg bg-gray-100 text-gray-700 px-4 py-2.5 dark:bg-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
                                pattern="[1-9]\d*"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => handleRowsPerPageChange(parseInt(rowsPerPageInputValue))} // Pass the value when the button is clicked
                                className="focus:outline-none m-2 md:m-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Set
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div
                    className="flex flex-col md:flex-row justify-center items-center mt-2 p-6 border border-gray-300 bg-white rounded-lg shadow-md">
                    <div className="mb-2 md:mb-0">
                        <input
                            type="text"
                            placeholder="Search Questions"
                            className="w-60 md:w-96 h-10 mr-3 ml-2 rounded-lg bg-gray-100 text-gray-700 px-4 py-2.5 dark:bg-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
                            value={keyword}
                            onChange={handleInputChange}
                            required
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="focus:outline-none m-2 md:m-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Search Questions
                        </button>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Search Answer"
                            className="w-60 md:w-96 h-10 mr-3 ml-2 rounded-lg bg-gray-100 text-gray-700 px-4 py-2.5 dark:bg-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
                            required
                        />
                        <button
                            type="button"
                            className="focus:outline-none mr-2 m-2 md:m-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Search Answers
                        </button>
                    </div>
                    <button
                        type="button"
                        className="focus:outline-none m-2 md:ml-2 md:mr-3 md:mt-2  text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                        Clear Search
                    </button>
                </div>
            </div>
            <QATable />
        </div>
    );
};

export default Body;
