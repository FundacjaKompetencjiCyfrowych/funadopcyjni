"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/atoms";
import { NewsItem } from "@/types/storyblok";

interface NewsCardProps {
	item: NewsItem;
}

const NewsCard = ({ item }: NewsCardProps) => {
	return (
		<article className="flex flex-col h-full w-full max-w-[420px] md:max-w-[246px] lg:max-w-[420px]">
			<div className="mb-4">
				{item.image?.filename ? (
					<div className="w-full aspect-[420/266] md:aspect-[246/156] lg:aspect-[420/266] relative">
						<Image
							src={item.image.filename}
							alt={item.image.alt || item.title}
							fill
							className="object-cover rounded-2xl"
						/>
					</div>
				) : (
					<div className="w-full aspect-[420/266] md:aspect-[246/156] lg:aspect-[420/266] flex items-center justify-center bg-gray-light rounded-2xl">
						<p className="text-gray">Brak zdjęcia</p>
					</div>
				)}
			</div>

			<div className="flex items-center mb-2 gap-1 w-full">
				{item.tags &&
					Array.isArray(item.tags) &&
					item.tags.map((tag, index) => {
						if (index > 2) return null;

						return (
							<React.Fragment key={index}>
								{index > 0 && (
									<div className="w-1 h-1 bg-text-muted rounded-full flex-shrink-0"></div>
								)}
								<span
									className={`text-text-dark text-sm md:text-xs lg:text-sm font-normal leading-[1.5] uppercase ${
										index === 2 ? "truncate min-w-0" : "flex-shrink-0"
									}`}
									title={tag}
								>
									{tag}
								</span>
							</React.Fragment>
						);
					})}
				{item.tags && item.tags.length > 3 && (
					<>
						<div className="w-1 h-1 bg-text-muted rounded-full flex-shrink-0"></div>
						<span className="text-text-muted text-sm md:text-xs lg:text-sm font-normal leading-[1.5] flex-shrink-0">
							...
						</span>
					</>
				)}
			</div>

			<h3 className="text-xl md:text-lg lg:text-xl font-semibold text-text-dark mb-2">
				{item.title}
			</h3>

			<p className="text-text-dark text-base md:text-sm lg:text-base mb-4">
				{item.content && item.content.length > 120
					? `${item.content.substring(0, 120)}...`
					: item.content}
			</p>

			<div className="mt-auto justify-start flex">
				<Button
					variant="light"
					icon
					onClick={() =>
						(window.location.href = `/aktualnosci/${item.article_number}`)
					}
				>
					Czytaj więcej
				</Button>
			</div>
		</article>
	);
};

export default NewsCard;
