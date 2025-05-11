import Link from "next/link";
import Navbar from "@/components/organisms/navigation/navbar";

export default function NotFound() {
	return (
		<>
			<Navbar />
			<div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
				<h1 className="text-4xl font-bold mb-4">404 - Strona nie znaleziona</h1>
				<p className="text-xl mb-8">
					Przepraszamy, strona której szukasz nie istnieje lub została
					przeniesiona.
				</p>
				<Link
					href="/"
					className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
				>
					Wróć do strony głównej
				</Link>
			</div>
		</>
	);
}
