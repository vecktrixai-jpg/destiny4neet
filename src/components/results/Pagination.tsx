import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-1 mt-12 bg-white rounded-lg p-2 shadow-sm border border-slate-100 max-w-fit mx-auto">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-slate-500 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-sm font-medium transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Prev
      </button>

      <div className="flex items-center space-x-1 px-2">
        {getPageNumbers().map((page, idx) =>
          typeof page === 'number' ? (
            <button
              key={idx}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200",
                currentPage === page
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {page}
            </button>
          ) : (
            <span key={idx} className="w-9 h-9 flex items-center justify-center text-slate-400">
              {page}
            </span>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 text-slate-500 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-sm font-medium transition-colors"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
}
