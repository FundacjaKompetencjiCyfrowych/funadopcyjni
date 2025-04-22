import React from "react";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import ArrowIcon from "@/assets/svg/icons/arrow_up.svg";
import { UrlObject } from "url";

const linkButtonVariants = cva(
	"flex items-center justify-center text-primary text-center font-semibold text-lg transition-colors focus:outline-none py-2 px-1 hover:underline hover:underline-offset-6 hover:decoration-2 hover:decoration-primary"
);

export interface LinkButtonProps
	extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
	children: React.ReactNode;
	href: string | UrlObject;
	icon?: boolean;
	disabled?: boolean;
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
	({ className, disabled, icon, children, href, ...props }, ref) => {
		return (
			<Link
				className={cn(
					linkButtonVariants(),
					icon && " gap-2",
					disabled && "text-[#707070] pointer-events-none",
					className
				)}
				href={href}
				ref={ref}
				{...props}
			>
				{children}
				{icon && <ArrowIcon className="size-6 rotate-45 text-black" />}
			</Link>
		);
	}
);

LinkButton.displayName = "LinkButton";

export { LinkButton, linkButtonVariants };
