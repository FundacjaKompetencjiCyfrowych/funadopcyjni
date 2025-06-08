"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
	className,
}: PaginationProps) => {
	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	const generatePageNumbers = () => {
		const pages: (number | string)[] = [];

		if (totalPages <= 7) {
			// Jeśli mamy 7 lub mniej stron, wyświetl wszystkie
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// Zawsze pokazuj pierwszą stronę
			pages.push(1);

			if (currentPage <= 3) {
				// Jesteśmy na początku
				pages.push(2, 3, 4, "...");
			} else if (currentPage >= totalPages - 2) {
				// Jesteśmy na końcu
				pages.push("...", totalPages - 3, totalPages - 2, totalPages - 1);
			} else {
				// Jesteśmy gdzieś w środku
				pages.push("...", currentPage - 1, currentPage, currentPage + 1, "...");
			}

			// Zawsze pokazuj ostatnią stronę (jeśli nie jest już dodana)
			if (pages[pages.length - 1] !== totalPages) {
				pages.push(totalPages);
			}
		}

		return pages;
	};

	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className={cn("hidden lg:flex items-center gap-8", className)}>
			{/* Przycisk poprzedni */}
			<button
				onClick={handlePrevious}
				disabled={currentPage === 1}
				className={cn(
					"flex items-center justify-center w-10 h-10 rounded-full transition-colors",
					currentPage === 1
						? "bg-gray-light cursor-not-allowed"
						: "bg-primary hover:bg-primary-hover"
				)}
				aria-label="Poprzednia strona"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					className={cn(
						"rotate-180",
						currentPage === 1 ? "text-gray" : "text-black"
					)}
				>
					<path
						d="M9 18L15 12L9 6"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			{/* Numery stron */}
			<div className="flex items-center gap-2">
				{generatePageNumbers().map((page, index) => {
					if (page === "...") {
						return (
							<span
								key={`ellipsis-${index}`}
								className="px-3 py-2 text-text-dark font-nunito font-normal text-lg"
							>
								...
							</span>
						);
					}

					const pageNumber = page as number;
					const isActive = pageNumber === currentPage;

					return (
						<button
							key={pageNumber}
							onClick={() => onPageChange(pageNumber)}
							className={cn(
								"w-10 h-10 rounded-xl flex items-center justify-center transition-colors font-nunito font-normal text-lg",
								isActive
									? "bg-primary text-black"
									: "border border-gray-medium text-text-dark hover:bg-gray-light"
							)}
							aria-label={`Strona ${pageNumber}`}
							aria-current={isActive ? "page" : undefined}
						>
							{pageNumber}
						</button>
					);
				})}
			</div>

			{/* Przycisk następny */}
			<button
				onClick={handleNext}
				disabled={currentPage === totalPages}
				className={cn(
					"flex items-center justify-center w-10 h-10 rounded-full transition-colors",
					currentPage === totalPages
						? "bg-gray-light cursor-not-allowed"
						: "bg-primary hover:bg-primary-hover"
				)}
				aria-label="Następna strona"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					className={cn(
						currentPage === totalPages ? "text-gray" : "text-black"
					)}
				>
					<path
						d="M9 18L15 12L9 6"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
		</div>
	);
};
