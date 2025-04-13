import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "@/styles/globals.css";

const nunito = Nunito({
	variable: "--font-nunito",
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
		<html lang="pl" className={nunito.variable}>
			<body className="font-sans antialiased">{children}</body>
		</html>
	);
}
