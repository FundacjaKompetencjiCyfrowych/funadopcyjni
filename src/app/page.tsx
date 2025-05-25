// import Image from "next/image";
import Navbar from "@/components/organisms/navigation/navbar";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { ISbStoriesParams } from "@storyblok/react";
import dynamic from "next/dynamic";
import { CarouselMain } from "@/components/molecules/Carousel/CarouselMain";
import { AboutUs } from "@/components/molecules/AboutUs";
import { HowWeHelp } from "@/components/molecules/HowWeHelp";
import { MakeDonation } from "@/components/molecules/MakeDonation";
import { HowYouCanHelp } from "@/components/molecules/HowYouCanHelp";
import { TheySupport } from "@/components/molecules/TheySupport";
import { Footer } from "@/components/molecules/Footer";
import { News } from "@/components/molecules/News";

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
