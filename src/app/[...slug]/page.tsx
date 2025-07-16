import { getStoryblokApi } from "@/lib/storyblok";
import { ISbStoriesParams } from "@storyblok/react";
import { notFound } from "next/navigation";
import { StoryblokServerComponent } from "@storyblok/react/rsc";

async function fetchData(slug: string) {
	const storyblokApi = getStoryblokApi();
	const sbParams: ISbStoriesParams = { version: "draft" };
	try {
		return await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
	} catch (error) {
		console.error(
			`Błąd podczas pobierania danych ze Storyblok dla ścieżki ${slug}:`,
			error
		);
		return null;
	}
}
export async function generateMetadata({
	params,
}: {
	params: { slug: string[] };
}) {
	const slug = params.slug.join("/");
	const data = await fetchData(slug);
	if (!data || !data.data || !data.data.story) {
		return {
			title: "Nie znaleziono strony - Fundacja Adopcyjni",
			description: "Przepraszamy, strona której szukasz nie istnieje.",
		};
	}
	const story = data.data.story;
	return {
		title: story.name + " - Fundacja Adopcyjni",
		description:
			story.content.description ||
			"Wspieramy rodziny na każdym etapie adopcji.",
	};
}
export default async function DynamicPage({
	params,
}: {
	params: { slug: string[] };
}) {
	const slug = params.slug.join("/");
	const data = await fetchData(slug);
	if (!data || !data.data || !data.data.story) {
		notFound();
	}
	return (
		<>
			<div className="container mx-auto px-4 py-8">
				{/* <StoryblokServerComponent blok={data.data.story.content} /> */}
				Test
			</div>
		</>
	);
}
