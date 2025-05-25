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

	const testAboutUsData = {
		_uid: "test-uid",
		title: "Fundacja Adopcyjni - Wspieramy rodziny w procesie adopcji",
		description:
			"Nasza misją w Fundacji Adopcyjni jest wspieranie dzieci i rodzin adopcyjnych tworzących bezpieczne domy dla najmłodszych członków społeczeństwa. Działamy zgodnie z wartościami świadomości na temat adopcji oraz zapewniamy pomoc emocjonalną, edukacyjną i specjalistyczną dla rodzin adopcyjnych.",
		image: {
			filename:
				"https://a.storyblok.com/f/236278/1200x800/eb89f8f27a/about_us.jpg",
			alt: "Zdjęcie testowe Fundacji",
		},
	};

	const newsComponent = storyblokData?.data?.story?.content?.body?.find(
		(blok: StoryblokBlock) => blok.component === "news_section"
	);

	// Dane testowe dla komponentu News (użyte, gdy nie ma danych ze Storyblok)
	const testNewsData = {
		_uid: "test-news-uid",
		component: "news_section",
		articles: [
			{
				_uid: "news-1",
				component: "article",
				title: "Wsparcie psychologiczne dla rodzin adopcyjnych",
				content:
					"Profesjonalna pomoc psychologiczna może być nieoceniona zarówno dla rodziców, jak i dla dzieci. Fundacja Adopcyjni oferuje kompleksowe wsparcie na każdym etapie.",
				image: {
					filename:
						"https://a.storyblok.com/f/236278/1200x800/eb89f8f27a/about_us.jpg",
					alt: "Wsparcie psychologiczne",
				},
				tags: ["PSYCHOLOGIA", "ROZWÓJ DZIECKA"],
				article_number: 1,
				publish_date: "2023-05-15",
			},
			{
				_uid: "news-2",
				component: "article",
				title: "Warsztaty dla rodziców adopcyjnych - nowe terminy",
				content:
					"Zapraszamy na cykl warsztatów dla rodziców adopcyjnych, które odbędą się w najbliższych miesiącach. Podczas spotkań będziemy poruszać tematy związane z budowaniem więzi.",
				image: {
					filename:
						"https://a.storyblok.com/f/236278/1200x800/eb89f8f27a/about_us.jpg",
					alt: "Warsztaty dla rodziców",
				},
				tags: ["EDUKACJA", "WYDARZENIA"],
				article_number: 2,
				publish_date: "2023-05-20",
			},
			{
				_uid: "news-3",
				component: "article",
				title: "Jak rozmawiać z dzieckiem o adopcji? Praktyczny poradnik",
				content:
					"Rozmowa z dzieckiem o adopcji to jeden z najważniejszych tematów dla rodzin adopcyjnych. W naszym poradniku podpowiadamy, jak przeprowadzić taką rozmowę.",
				image: {
					filename:
						"https://a.storyblok.com/f/236278/1200x800/eb89f8f27a/about_us.jpg",
					alt: "Rozmowa o adopcji",
				},
				tags: ["PSYCHOLOGIA", "EDUKACJA"],
				article_number: 3,
				publish_date: "2023-05-25",
			},
			{
				_uid: "news-4",
				component: "article",
				title: "Kampania społeczna 'Adopcja to miłość' - podsumowanie",
				content:
					"Zakończyliśmy naszą kampanię społeczną 'Adopcja to miłość', której celem było zwiększenie świadomości społecznej na temat adopcji.",
				image: {
					filename:
						"https://a.storyblok.com/f/236278/1200x800/eb89f8f27a/about_us.jpg",
					alt: "Kampania społeczna",
				},
				tags: ["WYDARZENIA", "SPOŁECZEŃSTWO"],
				article_number: 4,
				publish_date: "2023-06-01",
			},
			{
				_uid: "news-5",
				component: "article",
				title: "Współpraca z ośrodkami adopcyjnymi - nowe możliwości",
				content:
					"Nawiązaliśmy współpracę z kolejnymi ośrodkami adopcyjnymi w Polsce. Dzięki temu możemy dotrzeć z naszym wsparciem do jeszcze większej liczby rodzin.",
				image: {
					filename:
						"https://a.storyblok.com/f/236278/1200x800/eb89f8f27a/about_us.jpg",
					alt: "Współpraca",
				},
				tags: ["WSPÓŁPRACA", "ROZWÓJ"],
				article_number: 5,
				publish_date: "2023-06-05",
			},
		],
	};

	return (
		<>
			<Navbar />

			{carouselComponent && <CarouselMain blok={carouselComponent} />}

			{aboutUsComponent ? (
				<AboutUs blok={aboutUsComponent} />
			) : (
				<div className="mt-8 border-t-4 border-primary pt-4">
					<h3 className="text-center text-red mb-2">
						⚠️ Komponent About Us ze Storyblok nie został znaleziony -
						wyświetlam wersję testową
					</h3>
					<AboutUs blok={testAboutUsData} />
				</div>
			)}

			<HowWeHelp />

			<MakeDonation />

			{newsComponent ? (
				<News blok={newsComponent} />
			) : (
				<div className="mt-8 border-t-4 border-primary pt-4">
					<h3 className="text-center text-red mb-2">
						⚠️ Komponent News ze Storyblok nie został znaleziony - wyświetlam
						wersję testową
					</h3>
					<News blok={testNewsData} />
				</div>
			)}
			<HowYouCanHelp />

			<TheySupport />

			{storyblokData && storyblokData.data && storyblokData.data.story && (
				<StoryblokComponent blok={storyblokData.data.story.content} />
			)}

			<Footer />
		</>
	);
}
