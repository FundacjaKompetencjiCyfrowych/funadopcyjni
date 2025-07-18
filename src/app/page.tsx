import { getStoryblokApi, findBlok } from "@/lib/storyblok";
import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { AboutUsBlok } from "@/components/sections/AboutUs";
import { CarouselMainBlok } from "@/components/sections/CarouselMain";
import { NewsBlok } from "@/components/sections/News";
import { HowWeHelp } from "@/components/sections/HowWeHelp";
import { MakeDonation } from "@/components/sections/MakeDonation";
import { HowYouCanHelp } from "@/components/sections/HowYouCanHelp";
import { TheySupport } from "@/components/sections/TheySupport";
import type { Story } from "@/types/storyblok";

type HomePageBlock = CarouselMainBlok | AboutUsBlok | NewsBlok;

export async function fetchHomePage(): Promise<Story<HomePageBlock>> {
	const storyblokApi = getStoryblokApi();
	return await storyblokApi.get("cdn/stories/home", { version: "draft" });
}

export default async function HomePage() {
	const { data } = await fetchHomePage();

	const carousel = findBlok<CarouselMainBlok>(data, "main_carousel");
	const aboutUs = findBlok<AboutUsBlok>(data, "about_us");
	const news = findBlok<NewsBlok>(data, "news_section");

	return (
		<>
			<div className="flex flex-col gap-14 md:gap-0 lg:gap-0">
				{/* {data.story.content.body.map((blok: HomePageBlock) => {
					return <StoryblokServerComponent blok={blok} key={blok._uid} />;
				})} */}
				<StoryblokServerComponent blok={carousel} />
				<StoryblokServerComponent blok={aboutUs} />
				<HowWeHelp />
				<MakeDonation />
				<StoryblokServerComponent blok={news} />
				<HowYouCanHelp />
				<TheySupport />
			</div>
		</>
	);
}
