import { getStoryblokApi } from "@storyblok/react/rsc";
import { ISbStoriesParams } from "@storyblok/react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/organisms/navigation/navbar";

const StoryblokComponent = dynamic(() =>
	import("@storyblok/react").then((mod) => mod.StoryblokComponent)
);

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
			<Navbar />
			<div className="container mx-auto px-4 py-8">
				<StoryblokComponent blok={data.data.story.content} />
			</div>
		</>
	);
}
