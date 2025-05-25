"use client";

import React from "react";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";
import { Button } from "@/components/atoms";

interface AboutUsProps {
	blok: {
		_uid: string;
		title: string;
		description: string;
		image: {
			filename: string;
			alt?: string;
		};
	};
}

const AboutUs = ({ blok }: AboutUsProps) => {
	return (
		<section
			{...storyblokEditable(blok)}
			className="py-16 px-4 md:py-8 md:px-[104px] lg:py-16 lg:px-16 max-w-[1440px] mx-auto"
		>
			<div className="flex flex-col md:flex-col lg:flex-row items-center gap-12 md:gap-10 lg:gap-[120px]">
				<div className="w-full lg:w-[568px] space-y-6 md:space-y-8 lg:space-y-12 order-2 md:order-1 lg:order-2">
					<h3 className="text-3xl md:text-2xl lg:text-3xl font-semibold text-center md:text-center lg:text-left font-open-sans">
						O NAS
					</h3>
					<div className="space-y-4 md:space-y-4 lg:space-y-4">
						<h2 className="text-xl md:text-xl lg:text-2xl font-semibold text-center md:text-left lg:text-left font-open-sans">
							{blok.title}
						</h2>
						<div className="prose prose-lg max-w-none text-center md:text-left lg:text-left">
							<p className="font-nunito text-base leading-6">
								{blok.description}
							</p>
						</div>
					</div>
					<div className="hidden lg:flex justify-start">
						<Button>Więcej o fundacji</Button>
					</div>
				</div>
				<div className="w-full lg:w-[624px] relative order-1 md:order-2 lg:order-1">
					<div className="relative h-[300px] w-[280px] md:h-[400px] md:w-[560px] lg:h-[400px] lg:w-[560px] bg-primary rounded-2xl mt-12 md:mt-8 lg:mt-16 mx-auto">
						<div className="absolute -top-12 left-12 md:-top-16 md:left-16 lg:-top-16 lg:left-16 h-[300px] w-[280px] md:h-[400px] md:w-[560px] lg:h-[400px] lg:w-[560px] overflow-hidden rounded-2xl shadow-xl">
							<Image
								src={blok.image.filename}
								alt={blok.image.alt || "Zdjęcie Fundacji Adopcyjni"}
								fill
								className="object-cover"
								priority
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="flex justify-center mt-8 md:mt-8 lg:hidden">
				<Button>Więcej o fundacji</Button>
			</div>
		</section>
	);
};

export default AboutUs;
