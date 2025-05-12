// import Image from "next/image";
import Navbar from "@/components/organisms/navigation/navbar";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { ISbStoriesParams } from "@storyblok/react";
import dynamic from "next/dynamic";
import { CarouselMain } from "@/components/molecules/Carousel/CarouselMain";
import { AboutUs } from "@/components/molecules/AboutUs";
import { HowWeHelp } from "@/components/molecules/HowWeHelp";
import { MakeDonation } from "@/components/molecules/MakeDonation";

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

	const bodyBlocks = storyblokData?.data?.story?.content?.body || [];
	console.log("Wszystkie bloki w body:", bodyBlocks);
	console.log(
		"Typy komponentów:",
		bodyBlocks.map((blok: StoryblokBlock) => blok.component)
	);

	const carouselComponent = storyblokData?.data?.story?.content?.body?.find(
		(blok: StoryblokBlock) => blok.component === "main_carousel"
	);

	const aboutUsComponent = storyblokData?.data?.story?.content?.body?.find(
		(blok: StoryblokBlock) => blok.component === "about_us"
	);

	console.log("Znaleziony komponent karuzeli:", carouselComponent);
	console.log("Znaleziony komponent o nas:", aboutUsComponent);

	if (aboutUsComponent) {
		console.log("Dane komponentu about_us:", aboutUsComponent);
		console.log(
			"Typy danych w about_us:",
			Object.keys(aboutUsComponent).map(
				(key) => `${key}: ${typeof aboutUsComponent[key]}`
			)
		);
	} else {
		console.log(
			"Komponent about_us nie został znaleziony - sprawdź nazwę techniczną w Storyblok"
		);
	}

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

	return (
		<>
			<Navbar />

			{carouselComponent && <CarouselMain blok={carouselComponent} />}

			{aboutUsComponent ? (
				<AboutUs blok={aboutUsComponent} />
			) : (
				<div className="mt-8 border-t-4 border-yellow-400 pt-4">
					<h3 className="text-center text-red-500 mb-2">
						⚠️ Komponent About Us ze Storyblok nie został znaleziony -
						wyświetlam wersję testową
					</h3>
					<AboutUs blok={testAboutUsData} />
				</div>
			)}

			<HowWeHelp />

			<MakeDonation />

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
						<p>
							Komponenty na stronie:{" "}
							{bodyBlocks.map((b: StoryblokBlock) => b.component).join(", ")}
						</p>
						<p>Karuzela znaleziona: {carouselComponent ? "TAK" : "NIE"}</p>
						{carouselComponent && (
							<>
								<p>Component: {carouselComponent.component}</p>
								<p>Liczba slajdów: {carouselComponent.slides?.length || 0}</p>
							</>
						)}
						<p>Sekcja O nas znaleziona: {aboutUsComponent ? "TAK" : "NIE"}</p>
						{aboutUsComponent && (
							<>
								<p>Component: {aboutUsComponent.component}</p>
								<p>Tytuł: {aboutUsComponent.title || "brak"}</p>
								<p>Opis: {aboutUsComponent.description ? "jest" : "brak"}</p>
								<p>
									Zdjęcie: {aboutUsComponent.image?.filename ? "jest" : "brak"}
								</p>
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
