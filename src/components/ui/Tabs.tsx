"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
	id: string;
	label: string;
}

interface TabsProps {
	tabs: Tab[];
	defaultTab?: string;
	onTabChange?: (tabId: string) => void;
	className?: string;
}

export function Tabs({ tabs, defaultTab, onTabChange, className }: TabsProps) {
	const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

	const handleTabClick = (tabId: string) => {
		setActiveTab(tabId);
		onTabChange?.(tabId);
	};

	return (
		<div
			className={cn(
				"flex justify-start border-b border-gray-medium",
				"gap-4 md:gap-6 lg:gap-8",
				"overflow-x-auto scrollbar-hide lg:overflow-x-visible",
				"pb-1",
				className
			)}
		>
			{tabs.map((tab) => (
				<button
					key={tab.id}
					onClick={() => handleTabClick(tab.id)}
					className={cn(
						"relative pb-2 transition-colors whitespace-nowrap",
						"px-2 md:px-4 lg:px-2",
						"text-base md:text-lg lg:text-lg font-nunito",
						"flex-shrink-0",
						activeTab === tab.id
							? "text-text-dark font-bold lg:font-bold"
							: "text-text-dark font-normal lg:font-normal hover:text-primary"
					)}
				>
					{tab.label}
					{activeTab === tab.id && (
						<div className="absolute -bottom-1 left-0 right-0 h-1 bg-primary rounded-t-full lg:h-1" />
					)}
				</button>
			))}
		</div>
	);
}
