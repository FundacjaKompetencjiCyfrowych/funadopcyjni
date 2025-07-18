"use client";

import React, { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";
import { Button } from "@/components/ui/Button";

export interface CarouselMainBlok extends SbBlokData {
	autoplay?: boolean;
	autoplayDelay?: number;
	slides: {
		image: {
			filename: string;
			alt?: string;
		};
		title: string;
		description: string;
		buttonText: string;
		link: {
			url: string;
		};
	}[];
}

interface CarouselMainProps {
	blok: CarouselMainBlok;
	className?: string;
}

export function CarouselMain({ blok, className }: CarouselMainProps) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

	const autoplay = blok.autoplay !== undefined ? blok.autoplay : true;
	const autoplayDelay = blok.autoplayDelay || 3000;
	const slides = blok.slides || [];

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;

		emblaApi.on("select", onSelect);
		onSelect();

		return () => {
			emblaApi.off("select", onSelect);
		};
	}, [emblaApi, onSelect]);

	useEffect(() => {
		if (!emblaApi || !autoplay) return;

		const interval = setInterval(() => {
			emblaApi.scrollNext();
		}, autoplayDelay);

		return () => clearInterval(interval);
	}, [emblaApi, autoplay, autoplayDelay]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") {
				scrollPrev();
			} else if (event.key === "ArrowRight") {
				scrollNext();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [scrollPrev, scrollNext]);

	return (
		<div
			{...storyblokEditable(blok)}
			className={cn(
				"relative w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 my-0 md:my-6",
				className
			)}
		>
			<div
				className="overflow-hidden rounded-2xl h-[550px] md:h-full"
				ref={emblaRef}
			>
				<div className="flex h-full">
					{slides.map((slide, index) => (
						<div className="relative flex min-w-full" key={index}>
							<div className="flex w-full flex-col md:flex-row h-full">
								<div className="relative w-full h-[255px] md:hidden">
									<Image
										src={slide.image.filename}
										alt={slide.image.alt || slide.title}
										fill
										className="rounded-t-2xl object-cover"
										priority={index === 0}
									/>
									<div className="absolute inset-0 rounded-t-2xl bg-black/30" />
								</div>

								<div className="flex w-full flex-col justify-end items-center gap-8 h-[295px] md:h-[524px] rounded-b-2xl bg-text-dark px-6 pt-6 pb-8 md:w-[493px] md:rounded-l-2xl md:rounded-r-none md:justify-center md:gap-8 lg:gap-12 lg:px-10">
									<div className="flex flex-col gap-6 w-full max-w-[313px] md:w-[304px] lg:w-[420px]">
										<h2 className="font-open-sans font-semibold text-white text-2xl md:text-[32px] md:leading-[38.4px] lg:text-[32px] lg:leading-[38.4px]">
											{slide.title}
										</h2>
										<p className="text-white font-nunito text-sm md:text-base lg:text-base leading-6">
											{slide.description}
										</p>
									</div>
									<div>
										<Button
											variant="carousel"
											icon={true}
											onClick={() => (window.location.href = slide.link.url)}
										>
											{slide.buttonText}
										</Button>
									</div>
								</div>

								<div className="hidden md:block md:w-full">
									<div className="relative h-full w-full">
										<Image
											src={slide.image.filename}
											alt={slide.image.alt || slide.title}
											fill
											className="rounded-r-2xl object-cover"
											priority={index === 0}
										/>
										<div className="absolute inset-0 rounded-r-2xl bg-black/30" />
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="mt-0 px-4 py-4 md:mt-6 md:px-0 md:py-0 flex items-center justify-between md:justify-center md:relative">
				<div className="flex justify-center items-center space-x-2 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
					{slides.map((_, index) => (
						<button
							key={index}
							onClick={() => emblaApi?.scrollTo(index)}
							className={cn(
								"h-[5px] w-8 rounded transition-all",
								index === selectedIndex ? "bg-primary" : "bg-gray-medium"
							)}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>

				<div className="flex space-x-6 md:ml-auto">
					<button
						onClick={scrollPrev}
						className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-black hover:bg-primary-hover"
						aria-label="Previous slide"
					>
						<svg
							className="h-6 w-6 rotate-180"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</button>
					<button
						onClick={scrollNext}
						className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-black hover:bg-primary-hover"
						aria-label="Next slide"
					>
						<svg
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}

export default CarouselMain;
