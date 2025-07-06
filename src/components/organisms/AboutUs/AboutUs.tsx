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
			className="py-8 px-4 md:py-8 md:px-[104px] lg:pt-[104px] lg:pb-14 lg:px-[104px] max-w-[1440px] mx-auto"
		>
			<div className="flex flex-col items-center gap-6 md:hidden">
				<h3 className="text-2xl font-semibold text-center font-open-sans w-full">
					O NAS
				</h3>
				<div className="w-full space-y-4">
					<h2 className="text-lg font-bold text-left font-nunito leading-[27px]">
						{blok.title}
					</h2>
					<div className="prose prose-lg max-w-none text-left">
						<p className="font-nunito text-sm leading-[21px]">
							{blok.description}
						</p>
					</div>
				</div>
				<div className="flex flex-col items-center gap-8 w-full">
					<div className="relative w-[calc(100%-48px)] aspect-[1.4/1] bg-primary rounded-2xl mt-12 mr-12">
						<div className="absolute -top-12 left-12 w-full aspect-[1.4/1] overflow-hidden rounded-2xl shadow-xl">
							<Image
								src={blok.image.filename}
								alt={blok.image.alt || "Zdjęcie Fundacji Adopcyjni"}
								fill
								className="object-cover"
								priority
							/>
						</div>
					</div>
					<Button className="text-sm">Więcej o fundacji</Button>
				</div>
			</div>
			<div className="hidden md:flex flex-col md:flex-col lg:flex-row items-center gap-6 md:gap-10 lg:gap-[120px] lg:max-w-[1312px] lg:mx-auto">
				<div className="w-full md:w-full lg:w-auto lg:flex-1 space-y-4 md:space-y-8 lg:space-y-12 order-2 md:order-1 lg:order-2">
					<h3 className="text-2xl md:text-2xl lg:text-[32px] font-semibold text-center md:text-center lg:text-left font-open-sans lg:leading-[38.4px]">
						O NAS
					</h3>
					<div className="space-y-4 md:space-y-4 lg:space-y-4">
						<h2 className="text-lg md:text-xl lg:text-2xl font-bold text-left md:text-left lg:text-left font-nunito">
							{blok.title}
						</h2>
						<div className="prose prose-lg max-w-none text-left md:text-left lg:text-left">
							<p className="font-nunito text-sm md:text-base lg:text-base leading-6">
								{blok.description}
							</p>
						</div>
					</div>
					<div className="hidden lg:flex justify-start">
						<Button>Więcej o fundacji</Button>
					</div>
				</div>
				<div className="w-full md:w-full lg:w-auto lg:flex-shrink-0 relative order-1 md:order-2 lg:order-1">
					<div className="relative w-[280px] md:w-[560px] lg:w-[35vw] lg:max-w-[560px] lg:min-w-[400px] aspect-[1.4/1] bg-primary rounded-2xl mt-12 md:mt-8 lg:mt-16 mx-auto lg:mx-0">
						<div className="absolute -top-12 left-12 md:-top-16 md:left-16 lg:-top-16 lg:left-16 w-[280px] md:w-[560px] lg:w-[35vw] lg:max-w-[560px] lg:min-w-[400px] aspect-[1.4/1] overflow-hidden rounded-2xl shadow-xl">
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

			<div className="hidden md:flex lg:hidden justify-center mt-8">
				<Button className="text-base">Więcej o fundacji</Button>
			</div>
		</section>
	);
};

export default AboutUs;
