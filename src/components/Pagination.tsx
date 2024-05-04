import React, {useState} from 'react';

interface PaginationProps {
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({totalPages, onPageChange}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
            onPageChange(currentPage - 1);
            localStorage.setItem('page_num', "" + currentPage);
        }
    };

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        if (nextPage <= totalPages) {
            setCurrentPage(nextPage);
            onPageChange(nextPage);
            localStorage.setItem('page_num', "" + currentPage);

        }
    };


    return (
        <div className="flex justify-between mt-4 mb-4 mx-4">
            {/* Previous Page Button */}
            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center px-3 py-1 border rounded ${
                    currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-green-500 hover:bg-blue-600'
                }`}
            >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Previous
            </button>

            {/* Next Page Button */}
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center px-3 py-1 border rounded ${
                    currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-green-500 hover:bg-blue-600'
                }`}
            >
                Next
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
            </button>
        </div>


    );
};

export default Pagination;
