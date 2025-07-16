import React from "react";
import { getStoryblokApi } from "@/lib/storyblok";
import { ISbStoriesParams } from "@storyblok/react";
import { NewsPage } from "@/components/organisms/News";
import { NewsItem } from "@/types/storyblok";

interface FetchNewsDataOptions {
	searchTerm?: string;
	page?: number;
	perPage?: number;
}

interface StoryblokSearchResult {
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
		body?: Array<{
			component: string;
			articles?: NewsItem[];
			[key: string]: unknown;
		}>;
	};
	published_at?: string;
	created_at?: string;
	is_folder?: boolean;
}

async function fetchNewsData(options: FetchNewsDataOptions = {}) {
	try {
		const storyblokApi = getStoryblokApi();
		const sbParams: ISbStoriesParams = {
			version: "draft",
			page: options.page || 1,
			per_page: options.perPage || 25,
		};

		if (options.searchTerm) {
			const searchParams: ISbStoriesParams = {
				...sbParams,
				version: "published",
				search_term: options.searchTerm,
				per_page: 100,
			};

			const searchResults = await storyblokApi.get("cdn/stories", searchParams);
			const searchedStories: StoryblokSearchResult[] =
				searchResults?.data?.stories || [];

			const searchedArticles = searchedStories.filter(
				(story: StoryblokSearchResult) => {
					const isNotFolder = !story.is_folder;
					return isNotFolder;
				}
			);

			const extractedArticles: NewsItem[] = [];

			searchedArticles.forEach((story) => {
				if (story.content?.body && Array.isArray(story.content.body)) {
					const newsSection = story.content.body.find(
						(blok: { component: string; articles?: NewsItem[] }) =>
							blok.component === "news_section"
					);

					if (newsSection?.articles && Array.isArray(newsSection.articles)) {
						const matchingArticles = newsSection.articles.filter(
							(article: NewsItem) => {
								const title = article.title || "";
								const content = article.content || "";
								const searchTerm = options.searchTerm?.toLowerCase() || "";

								return (
									title.toLowerCase().includes(searchTerm) ||
									content.toLowerCase().includes(searchTerm)
								);
							}
						);

						extractedArticles.push(...matchingArticles);
					}
				}
			});

			return {
				searchResults: extractedArticles,
				searchTerm: options.searchTerm,
				isSearchMode: true,
				newsSection: [],
				articles: [],
				events: [],
				totalStories: 0,
				currentPage: 1,
				perPage: 25,
			};
		}

		const homeData = await storyblokApi.get("cdn/stories/home", {
			version: "draft",
		});
		const newsSection = homeData?.data?.story?.content?.body?.find(
			(blok: { component: string }) => blok.component === "news_section"
		);

		const newsArticles = newsSection?.articles || [];

		const allEvents = newsArticles.filter(
			(article: {
				tags?: string[];
				title?: string;
				content?: string;
				publish_date?: string;
			}) => {
				const tags = article.tags || [];
				const title = article.title || "";
				const content = article.content || "";

				return (
					tags.some(
						(tag: string) =>
							tag.toLowerCase().includes("wydarzen") ||
							tag.toLowerCase().includes("event") ||
							tag.toLowerCase().includes("warsztaty") ||
							tag.toLowerCase().includes("konferencja") ||
							tag.toLowerCase().includes("spotkanie")
					) ||
					title.toLowerCase().includes("warsztaty") ||
					title.toLowerCase().includes("konferencja") ||
					title.toLowerCase().includes("spotkanie") ||
					title.toLowerCase().includes("wydarzen") ||
					content.toLowerCase().includes("warsztaty") ||
					content.toLowerCase().includes("konferencja")
				);
			}
		);

		const events = allEvents
			.sort((a: { publish_date?: string }, b: { publish_date?: string }) => {
				const dateA = new Date(a.publish_date || 0).getTime();
				const dateB = new Date(b.publish_date || 0).getTime();
				return dateB - dateA;
			})
			.slice(0, 3);

		const articles = newsArticles;

		const currentPage = options.page || 1;
		const perPage = options.perPage || 9;
		const startIndex = (currentPage - 1) * perPage;
		const endIndex = startIndex + perPage;
		const paginatedArticles = articles.slice(startIndex, endIndex);

		return {
			newsSection: newsSection?.articles || [],
			articles: paginatedArticles,
			events,
			isSearchMode: false,
			searchResults: [],
			totalStories: articles.length,
			currentPage,
			perPage,
		};
	} catch (error) {
		console.error("Błąd podczas pobierania danych ze Storyblok:", error);
		return {
			newsSection: [],
			articles: [],
			events: [],
			searchResults: [],
			isSearchMode: false,
			totalStories: 0,
			currentPage: 1,
			perPage: 25,
		};
	}
}

export default async function AktualnosciPage({
	searchParams,
}: {
	searchParams: { search?: string; page?: string };
}) {
	const searchTerm = searchParams.search;
	const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
	const data = await fetchNewsData({ searchTerm, page, perPage: 9 });

	return (
		<>
			<NewsPage {...data} />
		</>
	);
}
