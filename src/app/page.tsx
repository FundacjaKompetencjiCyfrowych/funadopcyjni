import Navbar from "@/components/organisms/Navigation/Navbar";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { ISbStoriesParams } from "@storyblok/react";
import dynamic from "next/dynamic";
import { CarouselMain } from "@/components/organisms/Carousel/CarouselMain";
import { AboutUs } from "@/components/organisms/AboutUs";
import { HowWeHelp } from "@/components/organisms/HowWeHelp";
import { MakeDonation } from "@/components/organisms/MakeDonation";
import { HowYouCanHelp } from "@/components/organisms/HowYouCanHelp";
import { TheySupport } from "@/components/organisms/TheySupport";
import { Footer } from "@/components/organisms/Footer";
import { News } from "@/components/organisms/News";

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

	const carouselComponent = storyblokData?.data?.story?.content?.body?.find(
		(blok: StoryblokBlock) => blok.component === "main_carousel"
	);

	const aboutUsComponent = storyblokData?.data?.story?.content?.body?.find(
		(blok: StoryblokBlock) => blok.component === "about_us"
	);

	const newsComponent = storyblokData?.data?.story?.content?.body?.find(
		(blok: StoryblokBlock) => blok.component === "news_section"
	);

	return (
		<>
			<Navbar />

			<div className="flex flex-col gap-14 md:gap-0 lg:gap-0">
				{carouselComponent && <CarouselMain blok={carouselComponent} />}

				{aboutUsComponent && <AboutUs blok={aboutUsComponent} />}

				<HowWeHelp />

				<MakeDonation />

				{newsComponent && <News blok={newsComponent} />}
				<HowYouCanHelp />

				<TheySupport />

				{storyblokData && storyblokData.data && storyblokData.data.story && (
					<StoryblokComponent blok={storyblokData.data.story.content} />
				)}
			</div>

			<Footer />
		</>
	);
}
