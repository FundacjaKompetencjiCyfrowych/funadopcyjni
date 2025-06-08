"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { SearchInput, Tabs, Button } from "@/components/atoms";
import NewsCard from "./NewsCard";
import { NewsItem } from "@/types/storyblok";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks";
import { useWindowSize } from "@react-hook/window-size";

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
		component?: string;
	};
	published_at?: string;
	created_at?: string;
}

interface NewsPageProps {
	readonly newsSection: readonly NewsItem[];
	readonly articles: readonly StoryblokStory[];
	readonly events: readonly (StoryblokStory | NewsItem)[];
	readonly searchResults?: readonly NewsItem[];
	readonly isSearchMode?: boolean;
	readonly searchTerm?: string;
}

const TABS = [
	{ id: "all", label: "Wszystkie" },
	{ id: "rodzicielstwo", label: "Rodzicielstwo" },
	{ id: "psychologia", label: "Psychologia" },
	{ id: "pierwsza-pomoc", label: "Pierwsza Pomoc" },
	{ id: "wydarzenia", label: "Wydarzenia" },
	{ id: "inne", label: "Inne" },
] as const;

const INITIAL_ARTICLES_COUNT_MOBILE = 3;
const LOAD_MORE_COUNT_MOBILE = 3;
const INITIAL_ARTICLES_COUNT_TABLET = 6;
const LOAD_MORE_COUNT_TABLET = 6;

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

const getInitialArticlesCount = (isTablet: boolean, isDesktop: boolean) => {
	return isTablet || isDesktop
		? INITIAL_ARTICLES_COUNT_TABLET
		: INITIAL_ARTICLES_COUNT_MOBILE;
};

const getLoadMoreCount = (isTablet: boolean, isDesktop: boolean) => {
	return isTablet || isDesktop
		? LOAD_MORE_COUNT_TABLET
		: LOAD_MORE_COUNT_MOBILE;
};

export default function NewsPage({
	newsSection,
	articles,
	events,
	searchResults,
	isSearchMode,
	searchTerm,
}: NewsPageProps) {
	const router = useRouter();
	const [width] = useWindowSize();
	const isTablet = width >= 768 && width < 1024;
	const isDesktop = width >= 1024;
	const [searchTermLocal, setSearchTermLocal] = useState(searchTerm || "");
	const [activeTab, setActiveTab] = useState<string>("all");

	const [articlesToShow, setArticlesToShow] = useState(() =>
		getInitialArticlesCount(isTablet, isDesktop)
	);

	const debouncedSearchTerm = useDebounce(searchTermLocal, 500);

	useEffect(() => {
		if (debouncedSearchTerm.trim() && debouncedSearchTerm !== searchTerm) {
			router.push(
				`/aktualnosci?search=${encodeURIComponent(debouncedSearchTerm)}`
			);
		} else if (!debouncedSearchTerm.trim() && searchTerm) {
			router.push("/aktualnosci");
		}
	}, [debouncedSearchTerm, searchTerm, router]);

	useEffect(() => {
		setArticlesToShow(getInitialArticlesCount(isTablet, isDesktop));
	}, [isTablet, isDesktop]);

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
		if (isSearchMode) {
			return searchResults || [];
		}

		const searchLower = searchTermLocal.toLowerCase();

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
	}, [
		displayedArticles,
		searchTermLocal,
		activeTab,
		isSearchMode,
		searchResults,
	]);

	const handleSearchChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearchTermLocal(e.target.value);
		},
		[]
	);

	const handleTabChange = useCallback(
		(tabId: string) => {
			setActiveTab(tabId);
			setArticlesToShow(getInitialArticlesCount(isTablet, isDesktop));
		},
		[isTablet, isDesktop]
	);

	const handleLoadMore = useCallback(() => {
		setArticlesToShow(
			(prev: number) => prev + getLoadMoreCount(isTablet, isDesktop)
		);
	}, [isTablet, isDesktop]);

	const hasMoreArticles = filteredArticles.length > articlesToShow;

	if (isSearchMode && searchTerm) {
		return (
			<main className="min-h-screen bg-white">
				<div
					className={`mx-auto max-w-screen-2xl ${isTablet || isDesktop ? "pt-12" : ""}`}
				>
					<section
						className={`${isTablet || isDesktop ? "pb-12 pt-0 px-8" : "pb-12 pt-12 px-4"}`}
					>
						<div
							className={`mx-auto flex ${isTablet || isDesktop ? "gap-[330px] max-w-none flex-row justify-between items-start" : "gap-6 max-w-sm flex-col"}`}
						>
							<h1
								className={`font-open-sans font-semibold leading-tight text-text-dark ${isTablet || isDesktop ? "text-[32px] text-left" : "text-4xl text-center"}`}
							>
								AKTUALNOŚCI
							</h1>
							<SearchInput
								value={searchTermLocal}
								onChange={handleSearchChange}
								className={isTablet || isDesktop ? "" : "mx-auto"}
								aria-label="Wyszukaj artykuły"
							/>
						</div>
					</section>

					<section
						className={`pb-12 ${isTablet || isDesktop ? "px-8" : "px-4"}`}
					>
						<div
							className={`mx-auto flex flex-col ${isTablet || isDesktop ? "gap-8 max-w-none items-center" : "gap-6 max-w-sm"}`}
						>
							<div
								className={`flex flex-col ${isTablet || isDesktop ? "gap-4 text-center" : "gap-2 text-center"}`}
							>
								<h2
									className={`font-open-sans font-semibold text-text-dark ${isTablet || isDesktop ? "text-2xl" : "text-xl"}`}
								>
									Wyniki wyszukiwania dla &quot;{searchTerm}&quot;
								</h2>
								<p
									className={`font-open-sans font-semibold ${isTablet || isDesktop ? "text-xl text-[#5C5C5C]" : "text-lg text-text-muted"}`}
								>
									Znaleziono {filteredArticles.length}{" "}
									{filteredArticles.length === 1
										? "artykuł"
										: filteredArticles.length <= 4
											? "artykuły"
											: "artykułów"}
								</p>
							</div>

							{filteredArticles.length > 0 ? (
								isTablet || isDesktop ? (
									<div className="grid grid-cols-3 gap-x-4 gap-y-12 max-w-[790px]">
										{filteredArticles.map((article) => (
											<NewsCard
												key={article._uid}
												item={article}
												variant="article"
											/>
										))}
									</div>
								) : (
									<div className="flex flex-col gap-14">
										{filteredArticles.map((article) => (
											<NewsCard
												key={article._uid}
												item={article}
												variant="article"
											/>
										))}
									</div>
								)
							) : (
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

	return (
		<main className="min-h-screen bg-white">
			<div
				className={`mx-auto max-w-screen-2xl ${isTablet || isDesktop ? "pt-12" : ""}`}
			>
				<section
					className={`${isTablet || isDesktop ? "pb-12 pt-0 px-8" : "pb-12 pt-12 px-4"}`}
				>
					<div
						className={`mx-auto flex ${isTablet || isDesktop ? "gap-[330px] max-w-none flex-row justify-between items-start" : "gap-6 max-w-sm flex-col"}`}
					>
						<h1
							className={`font-open-sans font-semibold leading-tight text-text-dark ${isTablet || isDesktop ? "text-[32px] text-left" : "text-4xl text-center"}`}
						>
							AKTUALNOŚCI
						</h1>
						<SearchInput
							value={searchTermLocal}
							onChange={handleSearchChange}
							className={isTablet || isDesktop ? "" : "mx-auto"}
							aria-label="Wyszukaj artykuły"
						/>
					</div>
				</section>

				{featuredArticle && (
					<section
						className={`pb-12 ${isTablet || isDesktop ? "px-8" : "px-4"}`}
					>
						<div
							className={`mx-auto flex flex-col ${isTablet || isDesktop ? "gap-12 max-w-none items-start" : "gap-6 max-w-sm items-center"}`}
						>
							<h2
								className={`font-open-sans font-semibold text-text-dark ${isTablet || isDesktop ? "text-2xl text-left" : "text-2xl text-center"}`}
							>
								NAJNOWSZY WPIS
							</h2>
							<NewsCard item={featuredArticle} variant="featured" />
						</div>
					</section>
				)}

				{convertedEvents.length > 0 && (
					<section
						className={`pb-12 ${isTablet || isDesktop ? "px-8" : "px-4"}`}
					>
						<div
							className={`mx-auto flex flex-col ${isTablet || isDesktop ? "gap-8 max-w-[770px] items-center" : "gap-6 max-w-sm"}`}
						>
							<h2
								className={`font-open-sans font-semibold text-text-dark ${isTablet || isDesktop ? "text-2xl text-center" : "text-2xl text-center"}`}
							>
								WYDARZENIA
							</h2>
							<div
								className={`flex flex-col ${isTablet || isDesktop ? "gap-14 w-full" : "gap-14"}`}
							>
								{convertedEvents.map((event) => (
									<NewsCard key={event._uid} item={event} variant="event" />
								))}
							</div>
						</div>
					</section>
				)}

				<section
					className={`bg-white ${isTablet || isDesktop ? "py-4 px-4" : "py-8 px-4"}`}
				>
					<div
						className={`mx-auto flex flex-col ${isTablet || isDesktop ? "gap-8 max-w-none items-center" : "gap-6 max-w-sm"}`}
					>
						<h2
							className={`font-open-sans font-semibold text-text-dark ${isTablet || isDesktop ? "text-2xl text-center" : "text-2xl text-center"}`}
						>
							WSZYSTKIE ARTYKUŁY
						</h2>

						<Tabs
							tabs={[...TABS]}
							defaultTab="all"
							onTabChange={handleTabChange}
							className={isTablet || isDesktop ? "w-[762px]" : "mb-12"}
						/>

						{isTablet || isDesktop ? (
							<div className="grid grid-cols-3 gap-x-4 gap-y-12 max-w-[790px]">
								{filteredArticles.slice(0, articlesToShow).map((article) => (
									<NewsCard
										key={article._uid}
										item={article}
										variant="article"
									/>
								))}
							</div>
						) : (
							<div className="flex flex-col gap-14">
								{filteredArticles.slice(0, articlesToShow).map((article) => (
									<NewsCard
										key={article._uid}
										item={article}
										variant="article"
									/>
								))}
							</div>
						)}

						{hasMoreArticles && (
							<div
								className={`${isTablet || isDesktop ? "w-[361px]" : "mt-12"} flex justify-center`}
							>
								<Button
									onClick={handleLoadMore}
									aria-label="Załaduj więcej artykułów"
								>
									Załaduj więcej
								</Button>
							</div>
						)}

						{filteredArticles.length === 0 && searchTermLocal && (
							<div className="mt-8 text-center text-text-muted">
								Nie znaleziono artykułów dla frazy: &quot;{searchTermLocal}
								&quot;
							</div>
						)}
					</div>
				</section>
			</div>
		</main>
	);
}
