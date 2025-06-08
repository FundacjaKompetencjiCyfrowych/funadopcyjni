import React from "react";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { ISbStoriesParams } from "@storyblok/react";
import Navbar from "@/components/organisms/navigation/navbar";
import { Footer } from "@/components/molecules/Footer";
import { NewsPage } from "@/components/molecules/News";
import { NewsItem } from "@/types/storyblok";

interface FetchNewsDataOptions {
	searchTerm?: string;
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
		const sbParams: ISbStoriesParams = { version: "draft" };

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
			};
		}

		const homeData = await storyblokApi.get("cdn/stories/home", sbParams);
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

		const articles = newsArticles.filter(
			(article: { tags?: string[]; title?: string; content?: string }) => {
				const tags = article.tags || [];
				const title = article.title || "";
				const content = article.content || "";

				return !(
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

		return {
			newsSection: newsSection?.articles || [],
			articles,
			events,
			isSearchMode: false,
			searchResults: [],
		};
	} catch (error) {
		console.error("Błąd podczas pobierania danych ze Storyblok:", error);
		return {
			newsSection: [],
			articles: [],
			events: [],
			searchResults: [],
			isSearchMode: false,
		};
	}
}

export default async function AktualnosciPage({
	searchParams,
}: {
	searchParams: { search?: string };
}) {
	const searchTerm = searchParams.search;
	const data = await fetchNewsData({ searchTerm });

	return (
		<>
			<Navbar />
			<NewsPage {...data} />
			<Footer />
		</>
	);
}
