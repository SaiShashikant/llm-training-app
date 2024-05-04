import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {APIDataModel} from "../models/APIDataModel";
import {setAPIDataReducer} from "../store/reducers/APIDataReducer";
import {RootState} from "../store";
import {qaData} from "../models/APIManager";
import {
    default_page_num,
    default_rows_per_page,
    ls_page_num,
    ls_query_ans,
    ls_query_qa,
    ls_rows_per_page
} from "../utils/Constants";
import QATable from "./QATable";
import toast from "react-hot-toast";
import Pagination from "./Pagination"; // Import the Toast component


const QABody: React.FC = () => {
    const dispatch = useDispatch();
    const apiData = useSelector((state: RootState) => state.apiData) as APIDataModel;
    const [pageNumber, setPageNumber] = useState(default_page_num); // Initialize page number state
    const [rowsPerPage, setRowsPerPage] = useState(default_rows_per_page); // Initialize rows per page state
    const [queryQA, setQueryStringForQuestion] = useState(""); // Initialize rows per page state
    const [queryAns, setQueryStringForAnswer] = useState(""); // Initialize rows per page state
    const maxPageValue = Math.ceil(apiData.total_results_count / apiData.qa_per_page) || 0; // Handle NaN
    const maxPageValueString = String(maxPageValue); // Cast to string
    const totalPages = Math.ceil(apiData.total_results_count / apiData.items.length);
    // console.log('Total pages', totalPages, "apiData.length", apiData.items.length, "apiData.total_results_count", apiData.total_results_count);


    useEffect(() => {
        // Load all the variables from local storage
        const storedPageNumber = parseInt(localStorage.getItem(ls_page_num) || default_page_num.toString());
        const storedRowsPerPage = parseInt(localStorage.getItem(ls_rows_per_page) || default_rows_per_page.toString());
        const storedQueryQA = localStorage.getItem(ls_query_qa) || "";
        const storedQueryAns = localStorage.getItem(ls_query_ans) || "";
        // console.log('UseEffect blank values -- Page number', storedPageNumber, "Rows Per Page Number", storedRowsPerPage);
        // console.log('UseEffect blank values -- Set Values  Page number', pageNumber, "Rows Per Page Number", rowsPerPage);
        // Update state with stored values
        setPageNumber(storedPageNumber);
        setRowsPerPage(storedRowsPerPage);
        setQueryStringForQuestion(storedQueryQA);
        setQueryStringForAnswer(storedQueryAns);

    }, []); // Run only on initial component mount

    useEffect(() => {
        // console.log('UseEffect 2nd time values -- Page number', pageNumber, "Rows Per Page Number", rowsPerPage);

        try {
            qaData(pageNumber, rowsPerPage, queryQA, queryAns)
                .then(data => {
                    dispatch(setAPIDataReducer(data));
                    // console.log('Response body data:', data.items.length);
                    // console.log('Response body data - Total count:', data.total_results_count);
                })
                .catch(error => {
                    console.error('Error fetching QA data:', error);
                    toast.error("Error fetching Data from the Server");
                });
        } catch (error) {
            console.error('Caught an error:', error);
            toast.error("Caught an error");
        }

        // console.log('UseEffect 2nd time values after try catch -- Page number', pageNumber, "Rows Per Page Number", rowsPerPage);

    }, [dispatch, rowsPerPage, queryQA, queryAns, pageNumber]);


    const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.match(/^[1-9]\d*$/) || value === '') {
            setPageNumber(parseInt(value)); // Convert value to number before setting state
            localStorage.setItem('page_num', "" + value);
        }

    };

    const onPageChange = (pageNumber: number) => {
        // Update the current page number
        setPageNumber(pageNumber);
    };

    const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.match(/^[1-9]\d*$/) || value === '') {
            setRowsPerPage(parseInt(value));
            localStorage.setItem(ls_rows_per_page, "" + rowsPerPage);
        }

        console.log('rows-per-page changed', rowsPerPage);
    };
    const handleQASearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQueryStringForQuestion(value);
        localStorage.setItem(ls_query_qa, "" + value);
        localStorage.setItem(ls_page_num, "" + 1);
        setPageNumber(1);
        // console.log('handleQASearchChange changed', value);
    };
    const handleAnsSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQueryStringForAnswer(value);
        localStorage.setItem(ls_query_ans, "" + value);
        localStorage.setItem(ls_page_num, "" + 1);
        setPageNumber(1);
        // console.log('handleAnsSearchChange changed', value);
    };


    function clearSearchQueries() {
        setQueryStringForAnswer("");
        localStorage.setItem(ls_query_ans, "");
        setQueryStringForQuestion("");
        localStorage.setItem(ls_query_qa, "");
        setPageNumber(1);
        toast.success("Search Queries cleared");
    }

    return (
        <div className="w-full m-6 p-4 bg-gray-200">
            <div className="min-h-screen flex justify-center items-center">
                <div className="flex flex-col w-full md:flex-row justify-center items-center">
                    <div className="bg-white shadow-md rounded p-6 border border-gray-300 mb-4 md:mb-0 md:mr-4">
                        <div className="flex flex-col md:flex-row justify-evenly items-center mt-2 ">
                            <div className="flex items-center m-2">
                                <label className="p-2">Go to Page:</label>
                                <input
                                    type="number"
                                    placeholder="Go to Page"
                                    value={pageNumber}
                                    onChange={handlePageChange}
                                    className="w-20 md:w-32 h-10 mr-3 rounded-lg bg-gray-100 text-gray-700 px-4 py-2.5 dark:bg-gray-600 dark:text-gray-300 dark:placeholder-gray-400 p-2 m-2"
                                    pattern="[1-9]\d*"
                                    max={maxPageValueString}
                                    required
                                />
                            </div>
                            <div className="flex items-center m-2">
                                <label className="p-2">Rows Per Page:</label>
                                <input
                                    type="number"
                                    placeholder="Rows per Page"
                                    value={rowsPerPage}
                                    onChange={handleRowsPerPageChange}
                                    className="w-20 md:w-32 h-10 mr-3 rounded-lg bg-gray-100 text-gray-700 px-4 py-2.5 dark:bg-gray-600 dark:text-gray-300 dark:placeholder-gray-400 p-2 m-2"
                                    pattern="[1-9]\d*"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Search Questions"
                                    className="w-60 md:w-96 h-10 mr-3 ml-2 rounded-lg bg-gray-100 text-gray-700 px-4 py-2.5 dark:bg-gray-600 dark:text-gray-300 dark:placeholder-gray-400 p-2 m-2"
                                    value={queryQA}
                                    onChange={handleQASearchChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Search Answer"
                                    value={queryAns}
                                    onChange={handleAnsSearchChange}
                                    className="w-60 md:w-96 h-10 mr-3 ml-2 rounded-lg bg-gray-100 text-gray-700 px-4 py-2.5 dark:bg-gray-600 dark:text-gray-300 dark:placeholder-gray-400 p-2 m-2"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={clearSearchQueries}
                                className="focus:outline-none m-2 md:ml-2 md:mr-3 md:mt-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 p-2 m-2"
                            >
                                Clear Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <QATable/>
            <div className="flex justify-center mt-4">
                <Pagination totalPages={totalPages} onPageChange={onPageChange}/>

            </div>
        </div>


    )
        ;
};

export default QABody;
