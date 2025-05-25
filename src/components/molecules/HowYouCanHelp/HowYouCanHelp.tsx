"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/atoms";

interface HelpItem {
	title: string;
	imageUrl: string;
}

interface HowYouCanHelpProps {
	title?: string;
	items?: HelpItem[];
}

const defaultItems: HelpItem[] = [
	{
		title: "Przekaż darowiznę",
		imageUrl: "/assets/images/heart_money.png",
	},
	{
		title: "Zostań wolontariuszem",
		imageUrl: "/assets/images/heart_circle.png",
	},
	{
		title: "Wspieraj nas jako firma",
		imageUrl: "/assets/images/heart_world.png",
	},
];

const HowYouCanHelp = ({
	title = "JAK MOŻESZ NAM POMÓC?",
	items = defaultItems,
}: HowYouCanHelpProps) => {
	return (
		<section className="w-full bg-light-background">
			<div className="py-12 px-4 md:px-8 lg:px-16 max-w-[1440px] mx-auto">
				<div className="flex flex-col items-center gap-12 md:gap-8 lg:gap-12">
					<h2 className="text-3xl md:text-2xl lg:text-3xl font-semibold text-center">
						{title}
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 md:gap-4 lg:gap-8 w-full">
						{items.map((item, index) => (
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

export default HowYouCanHelp;
