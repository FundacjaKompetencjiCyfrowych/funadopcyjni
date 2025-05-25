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
		<article className="flex flex-col h-full w-[420px]">
			<div className="mb-4">
				{item.image?.filename ? (
					<div className="w-full h-[266px] relative">
						<Image
							src={item.image.filename}
							alt={item.image.alt || item.title}
							fill
							className="object-cover rounded-2xl"
						/>
					</div>
				) : (
					<div className="w-full h-[266px] flex items-center justify-center bg-gray-light rounded-2xl">
						<p className="text-gray">Brak zdjęcia</p>
					</div>
				)}
			</div>

			<div className="flex items-center flex-wrap mb-2 gap-2">
				{item.tags &&
					Array.isArray(item.tags) &&
					item.tags.slice(0, 5).map((tag, index) => (
						<React.Fragment key={index}>
							{index > 0 && (
								<div className="w-1 h-1 bg-text-muted rounded-full"></div>
							)}
							<span className="text-text-dark text-base font-normal leading-6 uppercase">
								{tag}
							</span>
						</React.Fragment>
					))}
			</div>

			<h3 className="text-xl font-semibold text-text-dark mb-2">
				{item.title}
			</h3>

			<p className="text-text-dark text-base mb-4">
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
