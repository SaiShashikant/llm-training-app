import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {QADataModel} from "../models/QADataModel";
import {setQADataModelReducer} from "../store/reducers/QADataReducer";


interface QATableProps {
    data_items: QADataModel[];
}

const QATable: React.FC<QATableProps> = () => {
    const dispatch = useDispatch();
    const QADataModel = useSelector((state: RootState) => state.qaData); // Assuming qaData is the relevant state in your Redux store

    const handleSetQAData = (newData: QADataModel[]) => {
        dispatch(setQADataModelReducer(newData)); // Dispatch the action to update the QA data in the Redux store
    }



    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold my-4">LLM Training Data</h1>
                    <div>
                        <p>{QADataModel.length > 0 ? `Total Q&A Pairs: ${QADataModel.length}` : 'No Q&A pairs available.'}</p>
                    </div>
                </div>
                <div className="ml-auto">
                    <button
                        type="button"
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
                    {QADataModel.map((item) => (
                        <tr key={item.id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-id">
                                <div className="flex items-center">{item.id}</div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-question">
                                <div className="flex items-center">{item.question}</div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-answer">
                                <div className="flex items-center">{item.answer}</div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-action">
                                <div className="flex justify-around items-center">
                                    <button className="text-green-500 hover:text-green-800">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                        </svg>
                                        <span>Edit Q</span>
                                    </button>
                                    <button className="text-purple-500 hover:text-purple-900">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M16 15v2m-3-2v2m-3 0v-2m0-9V5a3 3 0 013-3h0a3 3 0 013 3v1m-6 0V5m0 0H9m0 0H7m0 0H5m0 0H3"/>
                                        </svg>
                                        <span>Edit A</span>
                                    </button>
                                    <button className="text-red-500 hover:text-red-800">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
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
                    {/* Insert pagination links here */}
                </div>
            </div>
        </div>

    );
};

export default QATable;
