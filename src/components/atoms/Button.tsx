import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import ArrowIcon from "@/assets/svg/icons/arrow_right_up_black.svg";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-[32] text-center font-nunito font-semibold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary text-primary-text hover:bg-primary-hover focus:ring-primary py-4 px-6"
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	icon?: boolean;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, disabled, icon, children, ...props }, ref) => {
		return (
			<button
				className={cn(
					buttonVariants(),
					disabled && "bg-disabled text-white/50 pointer-events-none",
					icon && "gap-2",
					className
				)}
				ref={ref}
				disabled={disabled}
				{...props}
			>
				{children}
				{icon && <ArrowIcon className="size-6 text-primary object-contain" />}
			</button>
		);
	}
);

Button.displayName = "Button";

export { Button, buttonVariants };
