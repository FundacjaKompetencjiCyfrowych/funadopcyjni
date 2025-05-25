"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
	({ className, ...props }, ref) => {
		return (
			<div className="relative w-full max-w-[220px]">
				<input
					ref={ref}
					type="text"
					placeholder="Szukaj..."
					className={cn(
						"w-full h-12 px-4 pr-12 text-base font-nunito text-text-dark placeholder:text-text-muted border border-text-muted rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
						className
					)}
					{...props}
				/>
				<div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="text-text-muted"
					>
						<path
							d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</div>
		);
	}
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
