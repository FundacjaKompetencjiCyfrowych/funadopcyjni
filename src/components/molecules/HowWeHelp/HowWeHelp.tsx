"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/atoms";

interface HowWeHelpItem {
	title: string;
	imageUrl: string;
}

interface HowWeHelpProps {
	title?: string;
	items?: HowWeHelpItem[];
}

const defaultItems: HowWeHelpItem[] = [
	{
		title: "Wsparcie poadopcyjne dla rodziców",
		imageUrl: "/assets/images/heart_hand.png",
	},
	{
		title: "Warsztaty i webinary",
		imageUrl: "/assets/images/heart_box.png",
	},
	{
		title: "Edukacja i kampanie społeczne",
		imageUrl: "/assets/images/heart_hands.png",
	},
];

const HowWeHelp = ({ title, items }: HowWeHelpProps) => {
	const displayItems = items || defaultItems;

	return (
		<section className="w-full bg-light-background">
			<div className="py-12 px-4 md:px-8 lg:px-16 max-w-[1440px] mx-auto">
				<div className="flex flex-col items-center gap-12">
					<h2 className="text-3xl font-semibold text-center">
						{title || "JAK POMAGAMY?"}
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
						{displayItems.map((item, index) => (
							<div
								key={index}
								className="flex flex-col bg-white rounded-3xl p-6 items-center justify-between h-[420px] shadow-sm"
							>
								<div className="flex flex-col items-center justify-center h-full">
									<div className="flex items-center justify-center w-full overflow-hidden">
										<Image
											src={item.imageUrl}
											alt={item.title}
											width={144}
											height={144}
											className="object-contain max-h-full"
										/>
									</div>
									<h3 className="font-semibold text-xl text-center mt-6">
										{item.title}
									</h3>
								</div>
							</div>
						))}
					</div>
					<Button className="mt-4">Zobacz wszystko</Button>
				</div>
			</div>
		</section>
	);
};

export default HowWeHelp;
