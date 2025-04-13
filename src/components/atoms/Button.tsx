import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-button text-center font-nunito font-semibold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
	{
		variants: {
			variant: {
				filled:
					"bg-primary text-primary-text hover:bg-primary-hover focus:ring-primary",
			},
			size: {
				default: "py-4 px-6",
			},
			state: {
				default: "bg-primary text-primary-text",
				hover: "bg-primary-hover text-primary-text",
				disabled: "bg-disabled text-white/50 pointer-events-none",
			},
		},
		defaultVariants: {
			variant: "filled",
			size: "default",
			state: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, state, disabled, children, ...props }, ref) => {
		return (
			<button
				className={cn(
					buttonVariants({
						variant,
						size,
						state: disabled ? "disabled" : state,
					}),
					className
				)}
				ref={ref}
				disabled={disabled}
				{...props}
			>
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";

export { Button, buttonVariants };
