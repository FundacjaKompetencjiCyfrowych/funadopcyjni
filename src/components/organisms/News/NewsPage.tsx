"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { SearchInput, Tabs, Button, Pagination } from "@/components/atoms";
import { NewsCard } from "@/components/molecules/NewsCard";
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
	readonly articles: readonly (StoryblokStory | NewsItem)[];
	readonly events: readonly (StoryblokStory | NewsItem)[];
	readonly searchResults?: readonly NewsItem[];
	readonly isSearchMode?: boolean;
	readonly searchTerm?: string;
	readonly totalStories?: number;
	readonly currentPage?: number;
	readonly perPage?: number;
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
const INITIAL_ARTICLES_COUNT_DESKTOP = 9;
const LOAD_MORE_COUNT_DESKTOP = 9;

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
	searchResults,
	isSearchMode,
	searchTerm,
	totalStories = 0,
	currentPage = 1,
	perPage = 9,
}: NewsPageProps) {
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
	}, []);

	const router = useRouter();
	const [width] = useWindowSize();
	const isTabletOrDesktop = isClient && width >= 768;
	const isDesktop = isClient && width >= 1024;
	const [searchTermLocal, setSearchTermLocal] = useState(searchTerm || "");
	const [activeTab, setActiveTab] = useState<string>("all");

	const [articlesToShow, setArticlesToShow] = useState(() => {
		if (isDesktop) return INITIAL_ARTICLES_COUNT_DESKTOP;
		if (isTabletOrDesktop) return INITIAL_ARTICLES_COUNT_TABLET;
		return INITIAL_ARTICLES_COUNT_MOBILE;
	});

	const debouncedSearchTerm = useDebounce(searchTermLocal, 500);

	useEffect(() => {
		if (debouncedSearchTerm.trim() && debouncedSearchTerm !== searchTerm) {
			router.push(
				`/aktualnosci?search=${encodeURIComponent(debouncedSearchTerm)}`,
				{
					scroll: false,
				}
			);
		} else if (!debouncedSearchTerm.trim() && searchTerm) {
			router.push("/aktualnosci", { scroll: false });
		}
	}, [debouncedSearchTerm, searchTerm, router]);

	useEffect(() => {
		if (isDesktop) {
			setArticlesToShow(INITIAL_ARTICLES_COUNT_DESKTOP);
		} else if (isTabletOrDesktop) {
			setArticlesToShow(INITIAL_ARTICLES_COUNT_TABLET);
		} else {
			setArticlesToShow(INITIAL_ARTICLES_COUNT_MOBILE);
		}
	}, [isTabletOrDesktop, isDesktop]);

	const convertedArticles = useMemo(() => {
		return articles
			.filter(
				(article): article is StoryblokStory =>
					"uuid" in article && "name" in article
			)
			.filter(isValidArticle)
			.map(
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

	const allArticlesForMobileTablet = useMemo(() => {
		return [...newsSection, ...convertedArticles];
	}, [newsSection, convertedArticles]);

	const allArticlesForDesktop = useMemo(() => {
		const newsItems = articles.filter(
			(article): article is NewsItem =>
				"_uid" in article && "component" in article
		);
		const storyblokStories = convertedArticles;

		return newsItems.length > 0 ? newsItems : storyblokStories;
	}, [articles, convertedArticles]);

	const featuredArticle = allArticlesForMobileTablet[0] ?? null;
	const displayedArticlesForMobileTablet = allArticlesForMobileTablet.slice(1);
	const displayedArticlesForDesktop = allArticlesForDesktop;

	const filteredArticlesMobileTablet = useMemo(() => {
		if (isSearchMode) {
			return searchResults || [];
		}

		const searchLower = searchTermLocal.toLowerCase();

		return displayedArticlesForMobileTablet.filter((article: NewsItem) => {
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
		displayedArticlesForMobileTablet,
		searchTermLocal,
		activeTab,
		isSearchMode,
		searchResults,
	]);

	const filteredArticlesDesktop = useMemo(() => {
		if (isSearchMode) {
			return searchResults || [];
		}

		const searchLower = searchTermLocal.toLowerCase();

		return displayedArticlesForDesktop.filter((article: NewsItem) => {
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
		displayedArticlesForDesktop,
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
			if (isDesktop) {
				setArticlesToShow(INITIAL_ARTICLES_COUNT_DESKTOP);
				const searchParams = new URLSearchParams(window.location.search);
				searchParams.delete("page");
				if (debouncedSearchTerm) {
					searchParams.set("search", debouncedSearchTerm);
				} else {
					searchParams.delete("search");
				}
				const newUrl = searchParams.toString()
					? `/aktualnosci?${searchParams.toString()}`
					: "/aktualnosci";
				router.push(newUrl, { scroll: false });
			} else if (isTabletOrDesktop) {
				setArticlesToShow(INITIAL_ARTICLES_COUNT_TABLET);
			} else {
				setArticlesToShow(INITIAL_ARTICLES_COUNT_MOBILE);
			}
		},
		[isTabletOrDesktop, isDesktop, router, debouncedSearchTerm]
	);

	const handleLoadMore = useCallback(() => {
		setArticlesToShow((prev: number) => {
			if (isDesktop) return prev + LOAD_MORE_COUNT_DESKTOP;
			if (isTabletOrDesktop) return prev + LOAD_MORE_COUNT_TABLET;
			return prev + LOAD_MORE_COUNT_MOBILE;
		});
	}, [isTabletOrDesktop, isDesktop]);

	const hasMoreArticlesMobileTablet =
		filteredArticlesMobileTablet.length > articlesToShow;

	const totalPages = Math.ceil(totalStories / perPage);
	const handlePageChange = useCallback(
		(page: number) => {
			const searchParams = new URLSearchParams(window.location.search);
			searchParams.set("page", page.toString());
			if (debouncedSearchTerm) {
				searchParams.set("search", debouncedSearchTerm);
			} else {
				searchParams.delete("search");
			}
			router.push(`/aktualnosci?${searchParams.toString()}`, { scroll: false });
		},
		[router, debouncedSearchTerm]
	);

	if (isSearchMode && searchTerm) {
		return (
			<main className="min-h-screen bg-white">
				<div className="mx-auto max-w-[1440px] pt-0 md:pt-12">
					<section className="pb-12 pt-12 px-4 md:pb-12 md:pt-0 md:px-8 lg:px-16">
						<div className="mx-auto flex flex-col gap-6 md:gap-[330px] lg:gap-[321px] md:max-w-none md:flex-row md:justify-between md:items-start lg:items-center">
							<h1 className="font-open-sans font-semibold leading-tight text-text-dark text-4xl text-left md:text-[32px] lg:text-5xl">
								AKTUALNOŚCI
							</h1>
							<SearchInput
								value={searchTermLocal}
								onChange={handleSearchChange}
								className="mx-auto md:mx-0"
								aria-label="Wyszukaj artykuły"
							/>
						</div>
					</section>

					<section className="pb-12 px-4 md:px-8 lg:px-16">
						<div className="mx-auto flex flex-col gap-6 md:gap-8 md:max-w-none md:items-center lg:gap-12">
							<div className="flex flex-col gap-2 text-center md:gap-4 md:text-center">
								<h2 className="font-open-sans font-semibold text-text-dark text-xl md:text-2xl lg:text-[32px]">
									Wyniki wyszukiwania dla &quot;{searchTerm}&quot;
								</h2>
								<p className="font-open-sans font-semibold text-lg text-text-muted md:text-xl md:text-[#5C5C5C]">
									Znaleziono {(searchResults || []).length}{" "}
									{(searchResults || []).length === 1
										? "artykuł"
										: (searchResults || []).length <= 4
											? "artykuły"
											: "artykułów"}
								</p>
							</div>

							{(searchResults || []).length > 0 ? (
								<>
									<div className="flex md:hidden flex-col gap-14">
										{(searchResults || []).map((article) => (
											<NewsCard
												key={article._uid}
												item={article}
												variant="article"
											/>
										))}
									</div>
									<div className="hidden md:grid lg:hidden grid-cols-3 gap-x-4 gap-y-12 max-w-[790px]">
										{(searchResults || []).map((article) => (
											<NewsCard
												key={article._uid}
												item={article}
												variant="article"
											/>
										))}
									</div>
									<div className="hidden lg:grid grid-cols-3 gap-x-8 gap-y-8 w-full max-w-[1312px]">
										{(searchResults || []).map((article) => (
											<NewsCard
												key={article._uid}
												item={article}
												variant="article"
											/>
										))}
									</div>
								</>
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
			<div className="mx-auto max-w-[1440px] pt-0 md:pt-12">
				<section className="pb-12 pt-12 px-4 md:pb-12 md:pt-0 md:px-8 lg:px-16">
					<div className="mx-auto flex flex-col gap-6 md:gap-[330px] lg:gap-[321px] md:max-w-none md:flex-row md:justify-between md:items-start lg:items-center">
						<h1 className="font-open-sans font-semibold leading-tight text-text-dark text-4xl text-left md:text-[32px] lg:text-5xl">
							AKTUALNOŚCI
						</h1>
						<SearchInput
							value={searchTermLocal}
							onChange={handleSearchChange}
							className="mx-auto md:mx-0"
							aria-label="Wyszukaj artykuły"
						/>
					</div>
				</section>

				{featuredArticle && (
					<section className="pb-12 px-4 md:px-8 lg:px-16">
						<div className="mx-auto flex flex-col gap-6 items-center md:gap-12 md:max-w-none md:items-start lg:gap-12 lg:items-center">
							<h2 className="font-open-sans font-semibold text-text-dark text-2xl text-center md:text-2xl md:text-left lg:text-[32px] lg:text-center">
								NAJNOWSZY WPIS
							</h2>
							<NewsCard item={featuredArticle} variant="featured" />
						</div>
					</section>
				)}

				{convertedEvents.length > 0 && (
					<section className="pb-12 px-4 md:px-8 lg:px-16">
						<div className="mx-auto flex flex-col gap-6 md:gap-8 md:max-w-[770px] md:items-center lg:max-w-none lg:gap-12">
							<h2 className="font-open-sans font-semibold text-text-dark text-2xl text-center lg:text-[32px]">
								WYDARZENIA
							</h2>
							<div className="flex flex-col gap-14 md:gap-14 md:w-full lg:flex-row lg:gap-6 lg:justify-center">
								{convertedEvents.map((event) => (
									<NewsCard key={event._uid} item={event} variant="event" />
								))}
							</div>
						</div>
					</section>
				)}

				<section className="bg-white py-8 px-4 md:py-4 md:px-4 lg:px-16 lg:py-12">
					<div className="mx-auto flex flex-col gap-6 md:gap-8 md:max-w-none md:items-center lg:gap-12 lg:items-center">
						<h2 className="font-open-sans font-semibold text-text-dark text-2xl text-center lg:text-[32px]">
							WSZYSTKIE ARTYKUŁY
						</h2>

						<Tabs
							tabs={[...TABS]}
							defaultTab="all"
							onTabChange={handleTabChange}
							className="w-full mb-12 -mx-4 px-4 md:mb-0 lg:mx-0 lg:px-0 lg:w-full lg:max-w-[1312px] lg:mb-8"
						/>

						<div className="flex md:hidden flex-col gap-14">
							{filteredArticlesMobileTablet
								.slice(0, articlesToShow)
								.map((article) => (
									<NewsCard
										key={article._uid}
										item={article}
										variant="article"
									/>
								))}
						</div>

						<div className="hidden md:grid lg:hidden grid-cols-3 gap-x-4 gap-y-12 max-w-[790px]">
							{filteredArticlesMobileTablet
								.slice(0, articlesToShow)
								.map((article) => (
									<NewsCard
										key={article._uid}
										item={article}
										variant="article"
									/>
								))}
						</div>

						<div className="hidden lg:grid grid-cols-3 gap-x-8 gap-y-8 w-full max-w-[1312px]">
							{filteredArticlesDesktop.map((article) => (
								<NewsCard key={article._uid} item={article} variant="article" />
							))}
						</div>

						{hasMoreArticlesMobileTablet && (
							<div className="flex justify-center mt-12 md:w-[361px] md:mt-0 lg:hidden">
								<Button
									onClick={handleLoadMore}
									aria-label="Załaduj więcej artykułów"
								>
									Załaduj więcej
								</Button>
							</div>
						)}

						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
							className="mt-12"
						/>

						{filteredArticlesMobileTablet.length === 0 && searchTermLocal && (
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
