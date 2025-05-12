"use client";

import React, { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react";

interface CarouselSlide {
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
}

interface CarouselMainProps {
	blok: {
		_uid: string;
		autoplay?: boolean;
		autoplayDelay?: number;
		slides: CarouselSlide[];
	};
	className?: string;
}

export const CarouselMain = ({ blok, className }: CarouselMainProps) => {
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
				"relative w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 max-h-[524px]",
				className
			)}
		>
			<div
				className="overflow-hidden rounded-none md:rounded-2xl h-full"
				ref={emblaRef}
			>
				<div className="flex h-full">
					{slides.map((slide, index) => (
						<div className="relative flex min-w-full" key={index}>
							<div className="flex w-full flex-col md:flex-row">
								<div className="relative w-full md:hidden">
									<Image
										src={slide.image.filename}
										alt={slide.image.alt || slide.title}
										fill
										className="rounded-t-2xl object-cover"
										priority={index === 0}
									/>
									<div className="absolute inset-0 rounded-t-2xl bg-black/30" />
								</div>

								<div className="flex w-full flex-col justify-center space-y-6 rounded-b-2xl bg-black p-6 md:w-2/5 md:rounded-l-2xl md:rounded-r-none md:p-8 lg:space-y-8 lg:p-10">
									<div className="space-y-6">
										<h2 className="font-heading text-xl font-semibold text-white sm:text-2xl md:text-3xl">
											{slide.title}
										</h2>
										<p className="text-sm text-white/90 sm:text-base md:text-lg">
											{slide.description}
										</p>
									</div>
									<div>
										<Link
											href={slide.link.url}
											className="inline-flex items-center rounded-full bg-yellow-400 px-6 py-3 font-medium text-black hover:bg-yellow-500"
										>
											{slide.buttonText}
											<svg
												className="ml-2 h-4 w-4"
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
										</Link>
									</div>
								</div>

								<div className="hidden md:block md:w-3/5">
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
			<div className="mt-6 flex flex-col items-center justify-center space-y-4 md:flex-row md:justify-between md:space-y-0 md:px-8">
				<div className="flex justify-center space-x-2 md:justify-start md:order-1">
					{slides.map((_, index) => (
						<button
							key={index}
							onClick={() => emblaApi?.scrollTo(index)}
							className={cn(
								"h-1 w-8 rounded transition-all",
								index === selectedIndex ? "bg-yellow-400" : "bg-gray-300"
							)}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>

				<div className="flex space-x-6 md:order-2">
					<button
						onClick={scrollPrev}
						className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-black hover:bg-yellow-500"
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
						className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-black hover:bg-yellow-500"
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
};

export default CarouselMain;
