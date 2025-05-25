import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import ArrowIcon from "@/assets/svg/icons/arrow_right_up_black.svg";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-[32px] text-center font-nunito font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-text hover:bg-primary-hover focus:ring-primary text-lg py-4 px-6",
				light:
					"bg-white text-text-dark border border-text-dark hover:bg-gray-light focus:ring-text-dark text-base py-[10px] px-4 md:text-sm md:py-[10px] md:px-4 lg:text-base",
				carousel:
					"bg-primary text-black hover:bg-primary-hover focus:ring-primary text-sm md:text-base font-semibold py-4 px-6 rounded-full h-[46px] md:h-12 lg:text-sm lg:py-4 lg:h-12",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	icon?: boolean;
	variant?: "default" | "light" | "carousel";
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, disabled, icon, variant = "default", children, ...props },
		ref
	) => {
		return (
			<button
				className={cn(
					buttonVariants({ variant }),
					disabled && "bg-disabled text-white/50 pointer-events-none",
					icon && "gap-2",
					className
				)}
				ref={ref}
				disabled={disabled}
				{...props}
			>
				{children}
				{icon &&
					(variant === "default" ? (
						<ArrowIcon className="size-6 object-contain text-primary" />
					) : (
						<svg
							className={cn(
								"ml-2 h-4 w-4",
								variant === "light" ? "text-text-dark" : "text-black"
							)}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					))}
			</button>
		);
	}
);

Button.displayName = "Button";

export { Button, buttonVariants };
