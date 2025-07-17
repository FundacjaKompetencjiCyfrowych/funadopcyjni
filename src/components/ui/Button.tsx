import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import ArrowIcon from "@/assets/svg/icons/arrow_right_up_black.svg";
import ArrowRightIcon from "@/assets/svg/icons/arrow_right_button.svg";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-4xl text-center font-nunito font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-12",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-text hover:bg-primary-hover focus:ring-primary text-lg py-3 px-6",
				event:
					"bg-primary text-primary-text hover:bg-primary-hover focus:ring-primary text-lg py-2.5 px-6",
				light:
					"bg-white text-text-dark border border-text-dark hover:bg-gray-light focus:ring-text-dark text-base py-2.5 px-4 md:text-sm lg:text-base",
				carousel:
					"bg-primary text-black hover:bg-primary-hover focus:ring-primary text-sm md:text-base font-semibold py-2.5 px-6 rounded-full lg:text-sm",
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
	variant?: "default" | "light" | "carousel" | "event";
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
						<ArrowIcon className="size-6 object-contain text-black" />
					) : (
						<ArrowRightIcon className="ml-2 size-4 text-black" />
					))}
			</button>
		);
	}
);

Button.displayName = "Button";

export { Button, buttonVariants };
