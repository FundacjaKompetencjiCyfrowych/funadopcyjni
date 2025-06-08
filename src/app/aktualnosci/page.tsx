import React from "react";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { ISbStoriesParams } from "@storyblok/react";
import Navbar from "@/components/organisms/navigation/navbar";
import { Footer } from "@/components/molecules/Footer";
import { NewsPage } from "@/components/molecules/News";

async function fetchNewsData() {
	try {
		const storyblokApi = getStoryblokApi();
		const sbParams: ISbStoriesParams = { version: "draft" };

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
		};
	} catch (error) {
		console.error("Błąd podczas pobierania danych ze Storyblok:", error);
		return {
			newsSection: [],
			articles: [],
			events: [],
		};
	}
}

export default async function AktualnosciPage() {
	const { newsSection, articles, events } = await fetchNewsData();

	return (
		<>
			<Navbar />
			<NewsPage newsSection={newsSection} articles={articles} events={events} />
			<Footer />
		</>
	);
}
