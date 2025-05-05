"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage === 2) endPage = Math.min(totalPages - 1, 4);
    if (endPage === totalPages - 1) startPage = Math.max(2, totalPages - 3);

    if (startPage > 2) pages.push(-1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push(-2);

    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`rounded-lg px-3 py-2 ${
          currentPage === 1
            ? "cursor-not-allowed text-gray-400"
            : "text-blue-600 hover:bg-blue-100"
        }`}
      >
        &lt; Prev
      </button>
      {pageNumbers.map((pageNum, index) => (
        <React.Fragment key={index}>
          {pageNum < 0 ? (
            <span className="px-3 py-2">...</span>
          ) : (
            <button
              onClick={() => onPageChange(pageNum)}
              className={`rounded-lg px-3 py-2 ${
                currentPage === pageNum
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-100"
              }`}
            >
              {pageNum}
            </button>
          )}
        </React.Fragment>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`rounded-lg px-3 py-2 ${
          currentPage === totalPages
            ? "cursor-not-allowed text-gray-400"
            : "text-blue-600 hover:bg-blue-100"
        }`}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
