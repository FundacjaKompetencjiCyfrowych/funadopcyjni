"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CarouselProps {
	className?: string;
	autoplay?: boolean;
	autoplayDelay?: number;
	slides: {
		image: string;
		title: string;
		description: string;
		buttonText: string;
		buttonLink: string;
	}[];
}

export const Carousel = ({
	className,
	autoplay = true,
	autoplayDelay = 5000,
	slides,
}: CarouselProps) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

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

	// Autoplay functionality
	useEffect(() => {
		if (autoplay && emblaApi) {
			const interval = setInterval(() => {
				emblaApi.scrollNext();
			}, autoplayDelay);

			return () => clearInterval(interval);
		}
	}, [autoplay, autoplayDelay, emblaApi]);

	return (
		<div className={cn("relative w-full", className)}>
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex h-full">
					{slides.map((slide, index) => (
						<div className="relative flex min-w-full" key={index}>
							<div className="flex w-full flex-row">
								{/* Left content */}
								<div className="flex w-full flex-col justify-center space-y-6 bg-black p-8 md:w-2/5 md:p-10">
									<div className="space-y-6">
										<h2 className="font-heading text-2xl font-semibold text-white md:text-3xl lg:text-4xl">
											{slide.title}
										</h2>
										<p className="text-white/90 md:text-lg">
											{slide.description}
										</p>
									</div>
									<div>
										<Link
											href={slide.buttonLink}
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

								{/* Right image */}
								<div className="hidden md:block md:w-3/5">
									<div className="relative h-full w-full">
										<Image
											src={slide.image}
											alt={slide.title}
											fill
											className="object-cover"
											priority={index === 0}
										/>
										<div className="absolute inset-0 bg-black/30" />
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Navigation */}
			<div className="mt-4 flex items-center justify-between">
				{/* Dots */}
				<div className="flex space-x-2">
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

				{/* Arrows */}
				<div className="flex space-x-2">
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

export default Carousel;
