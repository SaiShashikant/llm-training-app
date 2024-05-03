import React, { useState} from 'react';

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
        }
    };

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        if (nextPage <= totalPages) {
            setCurrentPage(nextPage);
            onPageChange(nextPage);
        }
    };

    return (
        <div className="flex justify-center mt-4 mb-4 mr-4">
            {/* Previous Page Button */}
            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 mr-2 border rounded ${
                    currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-black hover:bg-blue-600'
                }`}
            >
                Previous
            </button>

            {/* Next Page Button */}
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${
                    currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-black hover:bg-blue-600'
                }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
