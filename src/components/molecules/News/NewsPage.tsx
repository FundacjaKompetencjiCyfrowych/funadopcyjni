"use client";

import React, { useState, useMemo, useCallback } from "react";
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
	readonly newsSection: readonly NewsItem[];
	readonly articles: readonly StoryblokStory[];
	readonly events: readonly (StoryblokStory | NewsItem)[];
}

const TABS = [
	{ id: "all", label: "Wszystkie" },
	{ id: "rodzicielstwo", label: "Rodzicielstwo" },
	{ id: "psychologia", label: "Psychologia" },
	{ id: "pierwsza-pomoc", label: "Pierwsza Pomoc" },
	{ id: "wydarzenia", label: "Wydarzenia" },
	{ id: "inne", label: "Inne" },
] as const;

const INITIAL_ARTICLES_COUNT = 3;
const LOAD_MORE_COUNT = 3;

const isValidArticle = (
	article: StoryblokStory
): article is StoryblokStory & {
	uuid: string;
	content: NonNullable<StoryblokStory["content"]> & {
		title: string;
		image: { filename: string; alt?: string };
	};
} => {
	return !!(
		article.uuid &&
		article.content?.title &&
		(article.content?.content || article.content?.description) &&
		article.content?.image?.filename &&
		(article.published_at || article.created_at)
	);
};

const isValidEvent = (event: StoryblokStory | NewsItem): boolean => {
	if ("component" in event && "_uid" in event) {
		const newsItem = event as NewsItem;
		return !!(
			newsItem._uid &&
			newsItem.title &&
			newsItem.content &&
			newsItem.image?.filename &&
			newsItem.publish_date
		);
	}

	const storyblokEvent = event as StoryblokStory;
	return !!(
		storyblokEvent.uuid &&
		(storyblokEvent.content?.title || storyblokEvent.name) &&
		(storyblokEvent.content?.content || storyblokEvent.content?.description) &&
		storyblokEvent.content?.image?.filename &&
		(storyblokEvent.published_at || storyblokEvent.created_at)
	);
};

export default function NewsPage({
	newsSection,
	articles,
	events,
}: NewsPageProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeTab, setActiveTab] = useState<string>("all");
	const [articlesToShow, setArticlesToShow] = useState(INITIAL_ARTICLES_COUNT);

	const convertedArticles = useMemo(() => {
		return articles.filter(isValidArticle).map(
			(article, index): NewsItem => ({
				_uid: article.uuid,
				component: "article" as const,
				title: article.content.title,
				content: article.content.content || article.content.description || "",
				image: article.content.image,
				tags: article.content.tags || [],
				article_number: index + 1,
				publish_date: article.published_at || article.created_at || "",
			})
		);
	}, [articles]);

	const convertedEvents = useMemo(() => {
		return events.filter(isValidEvent).map((event, index): NewsItem => {
			if ("component" in event && "_uid" in event) {
				return event as NewsItem;
			}
			const storyblokEvent = event as StoryblokStory;
			return {
				_uid: storyblokEvent.uuid,
				component: "event" as const,
				title: storyblokEvent.content?.title || storyblokEvent.name || "",
				content:
					storyblokEvent.content?.content ||
					storyblokEvent.content?.description ||
					"",
				image: storyblokEvent.content?.image || { filename: "", alt: "" },
				tags: storyblokEvent.content?.tags || [],
				article_number: index + 1,
				publish_date:
					storyblokEvent.published_at || storyblokEvent.created_at || "",
			};
		});
	}, [events]);

	const allArticles = useMemo(() => {
		return [...newsSection, ...convertedArticles];
	}, [newsSection, convertedArticles]);

	const featuredArticle = allArticles[0] ?? null;
	const displayedArticles = allArticles.slice(1);

	const filteredArticles = useMemo(() => {
		const searchLower = searchTerm.toLowerCase();

		return displayedArticles.filter((article) => {
			const matchesSearch =
				article.title.toLowerCase().includes(searchLower) ||
				article.content.toLowerCase().includes(searchLower);

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

	const handleSearchChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearchTerm(e.target.value);
		},
		[]
	);

	const handleTabChange = useCallback((tabId: string) => {
		setActiveTab(tabId);
		setArticlesToShow(INITIAL_ARTICLES_COUNT);
	}, []);

	const handleLoadMore = useCallback(() => {
		setArticlesToShow((prev) => prev + LOAD_MORE_COUNT);
	}, []);

	const hasMoreArticles = filteredArticles.length > articlesToShow;

	return (
		<main className="min-h-screen bg-white">
			<div className="mx-auto max-w-screen-2xl">
				<section className="px-4 pb-12 pt-12">
					<div className="mx-auto flex max-w-sm flex-col gap-6">
						<h1 className="text-center font-open-sans text-4xl font-semibold leading-tight text-text-dark">
							AKTUALNOŚCI
						</h1>
						<SearchInput
							value={searchTerm}
							onChange={handleSearchChange}
							className="mx-auto"
							aria-label="Wyszukaj artykuły"
						/>
					</div>
				</section>

				{featuredArticle && (
					<section className="px-4 pb-12">
						<div className="mx-auto flex max-w-sm flex-col gap-6">
							<h2 className="text-center font-open-sans text-2xl font-semibold text-text-dark">
								NAJNOWSZY WPIS
							</h2>
							<NewsCard item={featuredArticle} variant="featured" />
						</div>
					</section>
				)}

				{convertedEvents.length > 0 && (
					<section className="px-4 pb-12">
						<div className="mx-auto flex max-w-sm flex-col gap-6">
							<h2 className="text-center font-open-sans text-2xl font-semibold text-text-dark">
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
					<div className="mx-auto flex max-w-sm flex-col gap-6">
						<h2 className="text-center font-open-sans text-2xl font-semibold text-text-dark">
							WSZYSTKIE ARTYKUŁY
						</h2>

						<Tabs
							tabs={[...TABS]}
							defaultTab="all"
							onTabChange={handleTabChange}
							className="mb-12"
						/>

						<div className="flex flex-col gap-14">
							{filteredArticles.slice(0, articlesToShow).map((article) => (
								<NewsCard key={article._uid} item={article} variant="article" />
							))}
						</div>

						{hasMoreArticles && (
							<div className="mt-12 flex justify-center">
								<Button
									onClick={handleLoadMore}
									aria-label="Załaduj więcej artykułów"
								>
									Załaduj więcej
								</Button>
							</div>
						)}

						{filteredArticles.length === 0 && searchTerm && (
							<div className="mt-8 text-center text-text-muted">
								Nie znaleziono artykułów dla frazy: &quot;{searchTerm}&quot;
							</div>
						)}
					</div>
				</section>
			</div>
		</main>
	);
}
