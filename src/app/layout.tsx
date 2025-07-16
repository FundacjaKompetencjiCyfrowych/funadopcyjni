import type { Metadata } from "next";
import { Nunito, Open_Sans } from "next/font/google";
import "@/styles/globals.css";
import StoryblokProvider from "@/components/storyblok/StoryblokProvider";
import Navbar from "@/components/organisms/Navigation/Navbar";
import Footer from "@/components/organisms/Footer/Footer";

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<StoryblokProvider>
			<html lang="pl" className={`${nunito.variable} ${openSans.variable}`}>
				<body className="font-sans antialiased flex flex-col min-h-[100vh]">
					<Navbar />
					{children}
					<Footer />
				</body>
			</html>
		</StoryblokProvider>
	);
}
