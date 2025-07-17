import { getStoryblokApi } from "@/lib/storyblok";
import { CarouselMain } from "@/components/sections/CarouselMain";
import { AboutUs } from "@/components/sections/AboutUs";
import { HowWeHelp } from "@/components/sections/HowWeHelp";
import { MakeDonation } from "@/components/sections/MakeDonation";
import { HowYouCanHelp } from "@/components/sections/HowYouCanHelp";
import { TheySupport } from "@/components/sections/TheySupport";
import { News } from "@/components/sections/News";

interface StoryblokBlock {
	_uid: string;
	component: string;
	slides?: unknown[];
	[key: string]: unknown;
}

async function fetchData() {
	const storyblokApi = getStoryblokApi();
	try {
		return await storyblokApi.get("cdn/stories/home", { version: "draft" });
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
			<div className="flex flex-col gap-14 md:gap-0 lg:gap-0">
				{carouselComponent && <CarouselMain blok={carouselComponent} />}

				{aboutUsComponent && <AboutUs blok={aboutUsComponent} />}

				<HowWeHelp />

				<MakeDonation />

				{newsComponent && <News blok={newsComponent} />}
				<HowYouCanHelp />

				<TheySupport />
			</div>
		</>
	);
}
