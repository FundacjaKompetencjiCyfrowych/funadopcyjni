import { storyblokEditable } from "@storyblok/react/rsc";
import { News } from "@/components/organisms/News";
import { NewsBlockStoryblok } from "@/types/storyblok";

interface NewsStoryblokProps {
	blok: NewsBlockStoryblok;
}

const NewsStoryblok = ({ blok }: NewsStoryblokProps) => {
	return <News blok={blok} {...storyblokEditable(blok)} />;
};

export default NewsStoryblok;
