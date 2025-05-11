"use client";

import React from "react";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";

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
			className="py-16 px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto"
		>
			<div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
				{/* Lewa kolumna z obrazem */}
				<div className="w-full lg:w-5/12 relative">
					{/* Żółty kształt za zdjęciem */}
					<div className="absolute top-4 -left-6 bg-[#FFB833] h-[400px] w-[560px] rounded-2xl -z-10"></div>

					{/* Kontener ze zdjęciem */}
					<div className="relative h-[400px] w-[560px] overflow-hidden rounded-2xl shadow-xl">
						<Image
							src={blok.image.filename}
							alt={blok.image.alt || "Zdjęcie Fundacji Adopcyjni"}
							fill
							className="object-cover"
							priority
						/>
					</div>
				</div>

				{/* Prawa kolumna z tekstem */}
				<div className="w-full lg:w-7/12 space-y-12">
					{/* Tytuł sekcji "O NAS" */}
					<h3 className="text-3xl font-semibold font-['Open_Sans']">O NAS</h3>

					<div className="space-y-4">
						{/* Cytat */}
						<h2 className="text-xl md:text-2xl font-semibold font-['Open_Sans']">
							&ldquo;{blok.title}&rdquo;
						</h2>

						{/* Opis */}
						<div className="prose prose-lg font-['Nunito']">
							<p>{blok.description}</p>
						</div>
					</div>

					{/* Przycisk "Więcej o fundacji" */}
					<div>
						<button className="bg-[#FFB833] text-[#1A1A1A] px-6 py-4 rounded-full font-semibold font-['Nunito']">
							Więcej o fundacji
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutUs;
