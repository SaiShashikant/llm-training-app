import React, { useEffect } from 'react';
import QATable from './QATable';
import axios, { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {APIDataModel} from "../models/APIDataModel";
import {QADataModel} from "../models/QADataModel";
import {setQADataReducer} from "../store/reducers/QADataSlice";

interface BodyProps {}

const Body: React.FC<BodyProps> = () => {
    const dispatch = useDispatch();
    const qaData = useSelector((state: RootState) => state.qaData);

    async function fetchData() {
        try {
            const response: AxiosResponse<APIDataModel> = await axios.get<APIDataModel>('http://localhost:5000/api/data');
            return response.data;
        } catch (error) {
            console.error('Error fetching QA data:', error);
            throw error;
        }
    }

    useEffect(() => {
        fetchData()
            .then(data => {
                const data_items=data.items;
                const convertedData: Record<string, QADataModel> = {};
                data_items.forEach((item, index) => {
                    convertedData[`QA ${index + 1}`] = {
                        id: item.id,
                        question: item.question,
                        answer: item.answer
                    };
                });
                // @ts-ignore
                dispatch(setQADataReducer(convertedData));
            })
            .catch(error => {
                console.error('Error fetching QA data:', error);
            });
    }, [dispatch]);

    // @ts-ignore
    // @ts-ignore
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
                                className="w-20 md:w-32 h-10 mr-3 rounded-lg bg-gray-100 text-gray-700 px-4 py-2.5 dark:bg-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
                                onInput={(e) => {
                                    const inputElement = e.target as HTMLInputElement;
                                    const value = inputElement.value;

                                    if (value.match(/^[1-9]\d*$/)) {
                                        inputElement.value = value;
                                    } else {
                                        inputElement.value = value.slice(0, -1);
                                    }
                                }}
                                pattern="[1-9]\d*"
                                required
                            />
                            <button
                                type="button"
                                className="focus:outline-none m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Go
                            </button>
                        </div>
                        <div className="flex items-center m-2">
                            <label className="p-2">Rows per Page:</label>
                            <input
                                type="number"
                                placeholder="Rows"
                                value="50"
                                className="w-20 md:w-32 h-10 mr-3 rounded-lg bg-gray-100 text-gray-700 px-4 py-2.5 dark:bg-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
                                onInput={(e) => {
                                    const inputElement = e.target as HTMLInputElement;
                                    const value = inputElement.value;

                                    if (value.match(/^[1-9]\d*$/)) {
                                        inputElement.value = value;
                                    } else {
                                        inputElement.value = value.slice(0, -1);
                                    }
                                }}
                                pattern="[1-9]\d*"
                                required
                            />
                            <button
                                type="button"
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
                            required
                        />
                        <button
                            type="button"
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
                            className="focus:outline-none m-2 md:m-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

            <QATable data_items={qaData} />

        </div>
    );
};

export default Body;