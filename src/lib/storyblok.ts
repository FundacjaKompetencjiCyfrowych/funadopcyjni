import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import MainCarouselStoryblok from "@/components/storyblok/MainCarouselStoryblok";
import AboutUsStoryblok from "@/components/storyblok/AboutUsStoryblok";
import NewsStoryblok from "@/components/storyblok/NewsStoryblok";

export const getStoryblokApi = storyblokInit({
	accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
	use: [apiPlugin],
	components: {
		main_carousel: MainCarouselStoryblok,
		about_us: AboutUsStoryblok,
		news_section: NewsStoryblok,
	},
});
