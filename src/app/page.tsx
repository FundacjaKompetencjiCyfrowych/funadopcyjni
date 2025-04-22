// import Image from "next/image";
import Navbar from "@/components/organisms/navigation/navbar";
import { Carousel } from "@/components/molecules/Carousel";

export default function Home() {
	const carouselSlides = [
		{
			image: "/images/carousel-image.jpg",
			title: "Akcja (Nie)zwykła Rodzina",
			description:
				"Wspieramy rodziny na każdym etapie adopcji, zapewniając spokój i pełne zrozumienie procesu. Razem tworzymy bezpieczne i pełne miłości środowisko, by adopcja przebiegła bez zbędnego stresu.",
			buttonText: "Dowiedz się więcej",
			buttonLink: "/o-akcji",
		},
		{
			image: "/images/carousel-image.jpg",
			title: "Proces adopcyjny",
			description:
				"Przeprowadzamy przez wszystkie etapy adopcji, oferując wsparcie i porady na każdym kroku. Nasz zespół ekspertów jest gotowy pomóc Ci zrozumieć wymagania i procedury.",
			buttonText: "Sprawdź szczegóły",
			buttonLink: "/proces",
		},
		{
			image: "/images/carousel-image.jpg",
			title: "Wsparcie dla rodzin",
			description:
				"Oferujemy kompleksowe wsparcie dla rodzin adopcyjnych, w tym konsultacje z psychologiem, grupy wsparcia i materiały edukacyjne, które pomogą w przygotowaniu do adopcji.",
			buttonText: "Poznaj ofertę",
			buttonLink: "/wsparcie",
		},
	];
	return (
		<>
			<Navbar />
			<Carousel slides={carouselSlides} />
			<div className="bg-primary">dupa</div>
		</>
	);
}
