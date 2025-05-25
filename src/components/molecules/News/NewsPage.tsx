"use client";

import React, { useState, useMemo } from "react";
import { SearchInput, Tabs, Button } from "@/components/atoms";
import NewsCard from "./NewsCard";
import { NewsItem } from "@/types/storyblok";

interface StoryblokStory {
	uuid: string;
	name: string;
	content?: {
		title?: string;
		content?: string;
		description?: string;
		image?: {
			filename: string;
			alt?: string;
		};
		tags?: string[];
	};
	published_at?: string;
	created_at?: string;
}

interface NewsPageProps {
	newsSection: NewsItem[];
	articles: StoryblokStory[];
	events: StoryblokStory[] | NewsItem[];
}

const tabs = [
	{ id: "all", label: "Wszystkie" },
	{ id: "rodzicielstwo", label: "Rodzicielstwo" },
	{ id: "psychologia", label: "Psychologia" },
	{ id: "pierwsza-pomoc", label: "Pierwsza Pomoc" },
	{ id: "wydarzenia", label: "Wydarzenia" },
	{ id: "inne", label: "Inne" },
];

export default function NewsPage({
	newsSection,
	articles,
	events,
}: NewsPageProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeTab, setActiveTab] = useState("all");
	const [articlesToShow, setArticlesToShow] = useState(3);

	// Konwertuj dane ze Storyblok na format NewsItem
	const convertedArticles = useMemo(() => {
		return articles.map((article: StoryblokStory, index: number) => ({
			_uid: article.uuid || `article-${index}`,
			component: "article",
			title: article.content?.title || article.name || "Bez tytułu",
			content:
				article.content?.content ||
				article.content?.description ||
				"Brak treści",
			image: article.content?.image || {
				filename:
					"https://a.storyblok.com/f/236278/1200x800/eb89f8f27a/about_us.jpg",
				alt: "Domyślne zdjęcie artykułu",
			},
			tags: article.content?.tags || [],
			article_number: index + 1,
			publish_date:
				article.published_at || article.created_at || new Date().toISOString(),
		}));
	}, [articles]);

	const convertedEvents = useMemo(() => {
		const result = events.map(
			(event: StoryblokStory | NewsItem, index: number) => {
				// Jeśli to już jest NewsItem (dane testowe)
				if ("component" in event && "_uid" in event) {
					return event as NewsItem;
				}
				// Jeśli to StoryblokStory
				const storyblokEvent = event as StoryblokStory;
				return {
					_uid: storyblokEvent.uuid || `event-${index}`,
					component: "event",
					title:
						storyblokEvent.content?.title ||
						storyblokEvent.name ||
						"Bez tytułu",
					content:
						storyblokEvent.content?.content ||
						storyblokEvent.content?.description ||
						"Brak treści",
					image: storyblokEvent.content?.image || {
						filename:
							"https://a.storyblok.com/f/236278/1200x800/eb89f8f27a/about_us.jpg",
						alt: "Domyślne zdjęcie wydarzenia",
					},
					tags: [],
					article_number: index + 1,
					publish_date:
						storyblokEvent.published_at ||
						storyblokEvent.created_at ||
						new Date().toISOString(),
				} as NewsItem;
			}
		);
		return result;
	}, [events]);

	const allArticles = useMemo(() => {
		return [...newsSection, ...convertedArticles];
	}, [newsSection, convertedArticles]);

	const featuredArticle = allArticles[0] || null;
	const displayedArticles = allArticles.slice(1);

	const filteredArticles = useMemo(() => {
		return displayedArticles.filter((article) => {
			const matchesSearch =
				article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				article.content.toLowerCase().includes(searchTerm.toLowerCase());

			if (activeTab === "all") return matchesSearch;
			if (activeTab === "wydarzenia") return false;

			return (
				matchesSearch &&
				article.tags?.some((tag: string) =>
					tag.toLowerCase().includes(activeTab.toLowerCase())
				)
			);
		});
	}, [displayedArticles, searchTerm, activeTab]);

	const handleLoadMore = () => {
		setArticlesToShow((prev) => prev + 3);
	};

	return (
		<main className="min-h-screen bg-white">
			<div className="max-w-[1440px] mx-auto">
				{/* Header Section */}
				<section className="px-4 pt-12 pb-12">
					<div className="max-w-[361px] mx-auto flex flex-col gap-6">
						<h1 className="text-[32px] font-semibold text-center font-open-sans leading-[38.4px] text-text-dark">
							AKTUALNOŚCI
						</h1>
						<SearchInput
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="mx-auto"
						/>
					</div>
				</section>

				{featuredArticle && (
					<section className="px-4 pb-12">
						<div className="max-w-[361px] mx-auto flex flex-col gap-6">
							<h2 className="text-2xl font-semibold text-center font-open-sans text-text-dark">
								NAJNOWSZY WPIS
							</h2>
							<NewsCard item={featuredArticle} variant="featured" />
						</div>
					</section>
				)}

				{convertedEvents.length > 0 && (
					<section className="px-4 pb-12">
						<div className="max-w-[361px] mx-auto flex flex-col gap-6">
							<h2 className="text-2xl font-semibold text-center font-open-sans text-text-dark">
								WYDARZENIA
							</h2>
							<div className="flex flex-col gap-14">
								{convertedEvents.map((event) => (
									<NewsCard key={event._uid} item={event} variant="event" />
								))}
							</div>
						</div>
					</section>
				)}

				<section className="bg-white px-4 py-8">
					<div className="max-w-[361px] mx-auto flex flex-col gap-6">
						<h2 className="text-2xl font-semibold text-center font-open-sans text-text-dark">
							WSZYSTKIE ARTYKUŁY
						</h2>

						<Tabs
							tabs={tabs}
							defaultTab="all"
							onTabChange={setActiveTab}
							className="mb-12"
						/>

						<div className="flex flex-col gap-14">
							{filteredArticles.slice(0, articlesToShow).map((article) => (
								<NewsCard key={article._uid} item={article} variant="article" />
							))}
						</div>

						{filteredArticles.length > articlesToShow && (
							<div className="flex justify-center mt-12">
								<Button onClick={handleLoadMore}>Załaduj więcej</Button>
							</div>
						)}
					</div>
				</section>
			</div>
		</main>
	);
}
