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
				<div className="flex flex-col items-center gap-12 md:gap-8 lg:gap-12">
					<h2 className="text-3xl md:text-2xl lg:text-3xl font-semibold text-center">
						{title || "JAK POMAGAMY?"}
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 md:gap-4 lg:gap-8 w-full">
						{displayItems.map((item, index) => (
							<div
								key={index}
								className="flex flex-col bg-white rounded-3xl p-6 md:py-8 md:px-7 lg:p-6 items-center justify-center aspect-square shadow-sm"
							>
								<div className="flex flex-col items-center justify-center h-full gap-4 md:gap-6 lg:gap-6">
									<div className="flex items-center justify-center w-full overflow-hidden">
										<Image
											src={item.imageUrl}
											alt={item.title}
											width={144}
											height={144}
											className="object-contain w-[120px] h-[120px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px]"
										/>
									</div>
									<h3 className="font-semibold text-lg md:text-base lg:text-lg text-center font-nunito md:font-bold leading-tight">
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
