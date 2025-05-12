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
			className="py-16 px-4 md:px-8 lg:px-16 max-w-[1440px] mx-auto"
		>
			<div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-[120px]">
				{/* Lewa kolumna z obrazem */}
				<div className="w-full lg:w-[624px] relative">
					{/* Żółty kształt - teraz jako główny element */}
					<div className="relative h-[400px] w-[560px] bg-primary rounded-2xl mt-16">
						{/* Kontener ze zdjęciem - teraz pozycjonowany względem żółtej figury */}
						<div className="absolute -top-16 left-16 h-[400px] w-[560px] overflow-hidden rounded-2xl shadow-xl">
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

				{/* Prawa kolumna z tekstem */}
				<div className="w-full lg:w-[568px] space-y-12">
					{/* Tytuł sekcji "O NAS" */}
					<h3 className="text-3xl font-semibold ">O NAS</h3>

					<div className="space-y-4">
						<h2 className="text-xl md:text-2xl font-semibold">{blok.title}</h2>

						{/* Opis */}
						<div className="prose prose-lg ">
							<p>{blok.description}</p>
						</div>
					</div>

					{/* Przycisk "Więcej o fundacji" */}
					<div>
						<Button>Więcej o fundacji</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutUs;
