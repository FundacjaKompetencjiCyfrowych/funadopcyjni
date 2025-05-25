"use client";

import React from "react";
import { Button } from "@/components/atoms";
import { NewsItem } from "@/types/storyblok";
import NewsCard from "./NewsCard";

interface NewsProps {
	blok?: {
		_uid: string;
		component: string;
		articles: NewsItem[];
	};
}

const News = ({ blok }: NewsProps) => {
	const newsItems = blok?.articles || [];

	return (
		<section className="w-full bg-white py-8 px-4 md:px-4 lg:px-[64px]">
			<div className="max-w-[1440px] mx-auto flex flex-col items-center gap-6 md:gap-8 lg:gap-12">
				<h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-center font-open-sans">
					AKTUALNOŚCI
				</h2>

				<div className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-4 lg:gap-8 w-full items-center">
					{newsItems.map((item) => (
						<NewsCard key={item._uid} item={item} />
					))}
				</div>

				<Button className="mt-8 text-sm md:text-base lg:text-lg">
					Zobacz wszystko
				</Button>
			</div>
		</section>
	);
};

export default News;
