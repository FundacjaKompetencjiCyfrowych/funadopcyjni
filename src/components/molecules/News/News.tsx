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
		<section className="w-full bg-white py-[104px] px-4 md:px-4 lg:px-[64px]">
			<div className="max-w-[1440px] mx-auto flex flex-col items-center gap-12 md:gap-8 lg:gap-12">
				<h2 className="text-3xl md:text-2xl lg:text-3xl font-semibold text-center">
					AKTUALNOŚCI
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 md:gap-4 lg:gap-8 w-full justify-items-center">
					{newsItems.map((item) => (
						<NewsCard key={item._uid} item={item} />
					))}
				</div>

				<Button className="mt-8 rounded-full px-8 py-4">Zobacz wszystko</Button>
			</div>
		</section>
	);
};

export default News;
