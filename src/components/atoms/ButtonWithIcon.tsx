import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonWithIconVariants = cva(
	"inline-flex items-center justify-center rounded-button text-center font-nunito font-semibold text-lg py-4 px-6 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
	{
		variants: {
			variant: {
				filled:
					"bg-primary text-primary-text hover:bg-primary-hover focus:ring-primary",
			},
			size: {
				default: "py-4 px-6 gap-2",
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

export interface ButtonWithIconProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonWithIconVariants> {
	children: React.ReactNode;
}

const ButtonWithIcon = React.forwardRef<HTMLButtonElement, ButtonWithIconProps>(
	({ className, variant, size, state, disabled, children, ...props }, ref) => {
		const getIconSrc = () => {
			if (disabled) return "/icons/arrow-icon-disabled.svg";
			if (state === "hover") return "/icons/arrow-icon-hover.svg";
			return "/icons/arrow-icon.svg";
		};

		return (
			<button
				className={cn(
					buttonWithIconVariants({
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
				<div className="w-6 h-6 flex items-center justify-center">
					<img
						src={getIconSrc()}
						alt=""
						width={24}
						height={24}
						className="w-6 h-6"
					/>
				</div>
			</button>
		);
	}
);

ButtonWithIcon.displayName = "ButtonWithIcon";

export { ButtonWithIcon, buttonWithIconVariants };
