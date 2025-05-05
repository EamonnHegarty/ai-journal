"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5;

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
    <div className="flex items-center justify-center space-x-1 md:space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center rounded-lg p-1 md:px-3 md:py-2 ${
          currentPage === 1
            ? "cursor-not-allowed text-gray-400"
            : "text-blue-600 hover:bg-blue-100"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="ml-1 hidden md:inline">Prev</span>
      </button>
      <div className="hidden space-x-1 sm:flex">
        {pageNumbers.map((pageNum, index) => (
          <React.Fragment key={index}>
            {pageNum < 0 ? (
              <span className="p-1 md:px-3 md:py-2">...</span>
            ) : (
              <button
                onClick={() => onPageChange(pageNum)}
                className={`min-w-8 rounded-lg p-1 md:px-3 md:py-2 ${
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
      </div>
      <div className="px-2 sm:hidden">
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center rounded-lg p-1 md:px-3 md:py-2 ${
          currentPage === totalPages
            ? "cursor-not-allowed text-gray-400"
            : "text-blue-600 hover:bg-blue-100"
        }`}
        aria-label="Next page"
      >
        <span className="mr-1 hidden md:inline">Next</span>
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;
