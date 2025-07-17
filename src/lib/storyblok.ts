import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import { CarouselMain } from "@/components/sections/CarouselMain";
import { AboutUs } from "@/components/sections/AboutUs";
import { News } from "@/components/sections/News";

export const getStoryblokApi = storyblokInit({
	accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
	use: [apiPlugin],
	components: {
		main_carousel: CarouselMain,
		about_us: AboutUs,
		news_section: News,
	},
});
