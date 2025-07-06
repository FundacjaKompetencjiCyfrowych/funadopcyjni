import { storyblokEditable } from "@storyblok/react/rsc";
import { CarouselMain } from "@/components/organisms/Carousel/CarouselMain";

interface CarouselSlide {
	image: {
		filename: string;
		alt?: string;
	};
	title: string;
	description: string;
	buttonText: string;
	link: {
		url: string;
	};
}

interface MainCarouselStoryblokProps {
	blok: {
		_uid: string;
		slides: CarouselSlide[];
	};
}

const MainCarouselStoryblok = ({ blok }: MainCarouselStoryblokProps) => {
	return <CarouselMain blok={blok} {...storyblokEditable(blok)} />;
};

export default MainCarouselStoryblok;
