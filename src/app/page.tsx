// import Image from "next/image";
import Navbar from "@/components/organisms/navigation/navbar";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { ISbStoriesParams } from "@storyblok/react";
import dynamic from "next/dynamic";
import { CarouselMain } from "@/components/molecules/Carousel/CarouselMain";

const StoryblokComponent = dynamic(() =>
	import("@storyblok/react").then((mod) => mod.StoryblokComponent)
);

interface StoryblokBlock {
	_uid: string;
	component: string;
	slides?: unknown[];
	[key: string]: unknown;
}

async function fetchData() {
	const storyblokApi = getStoryblokApi();
	const sbParams: ISbStoriesParams = { version: "draft" };

	try {
		return await storyblokApi.get("cdn/stories/home", sbParams);
	} catch (error) {
		console.error("Błąd podczas pobierania danych ze Storyblok:", error);
		return null;
	}
}

export default async function Home() {
	const storyblokData = await fetchData();
	console.log("Dane strony głównej ze Storyblok:", storyblokData?.data);

	const carouselComponent = storyblokData?.data?.story?.content?.body?.find(
		(blok: StoryblokBlock) => blok.component === "main_carousel"
	);

	console.log("Znaleziony komponent karuzeli:", carouselComponent);

	return (
		<>
			<Navbar />

			{carouselComponent && <CarouselMain blok={carouselComponent} />}

			<div className="container mx-auto p-4 mt-8 bg-gray-100 rounded">
				<h2 className="text-lg font-bold mb-2">Debug Storyblok Data:</h2>
				<div className="grid grid-cols-1 gap-4">
					<div>
						<h3 className="font-semibold">Struktura strony głównej:</h3>
						<p>
							Strona główna znaleziona:{" "}
							{storyblokData?.data?.story ? "TAK" : "NIE"}
						</p>
						<p>
							Komponent body:{" "}
							{storyblokData?.data?.story?.content?.body ? "TAK" : "NIE"}
						</p>
						<p>
							Liczba bloków w body:{" "}
							{storyblokData?.data?.story?.content?.body?.length || 0}
						</p>
						<p>Karuzela znaleziona: {carouselComponent ? "TAK" : "NIE"}</p>
						{carouselComponent && (
							<>
								<p>Component: {carouselComponent.component}</p>
								<p>Liczba slajdów: {carouselComponent.slides?.length || 0}</p>
							</>
						)}
					</div>
					<details>
						<summary className="cursor-pointer font-semibold">
							Pokaż pełne dane strony
						</summary>
						<pre className="text-xs overflow-auto mt-2 bg-gray-200 p-2 rounded">
							{JSON.stringify(storyblokData?.data?.story?.content, null, 2)}
						</pre>
					</details>
				</div>
			</div>

			{storyblokData && storyblokData.data && storyblokData.data.story && (
				<StoryblokComponent blok={storyblokData.data.story.content} />
			)}
		</>
	);
}
