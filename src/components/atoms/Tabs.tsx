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

const Tabs = ({ tabs, defaultTab, onTabChange, className }: TabsProps) => {
	const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

	const handleTabClick = (tabId: string) => {
		setActiveTab(tabId);
		onTabChange?.(tabId);
	};

	return (
		<div
			className={cn(
				"flex justify-center md:justify-between flex-wrap border-b border-gray-medium",
				"gap-4 md:gap-6",
				className
			)}
		>
			{tabs.map((tab) => (
				<button
					key={tab.id}
					onClick={() => handleTabClick(tab.id)}
					className={cn(
						"relative pb-1 px-2 text-base md:text-lg font-nunito transition-colors",
						activeTab === tab.id
							? "text-text-dark font-bold"
							: "text-text-dark font-normal hover:text-primary"
					)}
				>
					{tab.label}
					{activeTab === tab.id && (
						<div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
					)}
				</button>
			))}
		</div>
	);
};

export { Tabs };
