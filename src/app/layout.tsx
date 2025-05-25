import type { Metadata } from "next";
import { Nunito, Open_Sans } from "next/font/google";
import "@/styles/globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import MainCarouselStoryblok from "@/components/storyblok/MainCarouselStoryblok";
import AboutUsStoryblok from "@/components/storyblok/AboutUsStoryblok";
import NewsStoryblok from "@/components/storyblok/NewsStoryblok";

const nunito = Nunito({
	variable: "--font-nunito",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
});

const openSans = Open_Sans({
	variable: "--font-open-sans",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Fundacja adopcyjni",
	description:
		"Wspieramy rodziny na każdym etapie adopcji, zapewniając spokój i pełne zrozumienie procesu. Razem tworzymy bezpieczne i pełne miłości środowisko, by adopcja przebiegła bez zbędnego stresu.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

storyblokInit({
	accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
	use: [apiPlugin],
	components: {
		main_carousel: MainCarouselStoryblok,
		about_us: AboutUsStoryblok,
		news_section: NewsStoryblok,
	},
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pl" className={`${nunito.variable} ${openSans.variable}`}>
			<body className="font-sans antialiased">{children}</body>
		</html>
	);
}
