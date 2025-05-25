"use client";

import React from "react";
import Image from "next/image";

interface SponsorLogo {
	id: number;
	src: string;
	alt: string;
}

interface TheySupportProps {
	title?: string;
	logos?: SponsorLogo[];
}

const defaultLogos: SponsorLogo[] = [
	{
		id: 1,
		src: "/assets/images/logoipsum-216 1.png",
		alt: "Logo Sponsor 1",
	},
	{
		id: 2,
		src: "/assets/images/logoipsum-253 1.png",
		alt: "Logo Sponsor 2",
	},
	{
		id: 3,
		src: "/assets/images/logoipsum-216 1.png",
		alt: "Logo Sponsor 3",
	},
	{
		id: 4,
		src: "/assets/images/logoipsum-253 1.png",
		alt: "Logo Sponsor 4",
	},
	{
		id: 5,
		src: "/assets/images/logoipsum-216 1.png",
		alt: "Logo Sponsor 5",
	},
	{
		id: 6,
		src: "/assets/images/logoipsum-253 1.png",
		alt: "Logo Sponsor 6",
	},
	{
		id: 7,
		src: "/assets/images/logoipsum-216 1.png",
		alt: "Logo Sponsor 7",
	},
	{
		id: 8,
		src: "/assets/images/logoipsum-253 1.png",
		alt: "Logo Sponsor 8",
	},
	{
		id: 9,
		src: "/assets/images/logoipsum-216 1.png",
		alt: "Logo Sponsor 9",
	},
];

const TheySupport = ({
	title = "WSPIERAJĄ NAS",
	logos = defaultLogos,
}: TheySupportProps) => {
	return (
		<section className="w-full bg-white py-8 md:py-12 lg:py-12">
			<div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
				<div className="flex flex-col items-center gap-6 md:gap-8 lg:gap-12">
					<h2 className="text-2xl lg:text-3xl font-semibold text-center font-open-sans">
						{title}
					</h2>

					<div className="w-full overflow-hidden">
						<div className="flex flex-wrap justify-center gap-2 md:gap-4">
							{logos.map((logo) => (
								<div
									key={logo.id}
									className="w-[100px] h-[60px] md:w-[120px] md:h-[70px] flex items-center justify-center"
								>
									<Image
										src={logo.src}
										alt={logo.alt}
										width={80}
										height={40}
										className="object-contain max-w-full max-h-full"
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TheySupport;
