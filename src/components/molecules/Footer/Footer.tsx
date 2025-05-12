"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Mail from "@/assets/svg/icons/mail.svg";
import Phone from "@/assets/svg/icons/phone.svg";
import Facebook from "@/assets/svg/icons/facebook.svg";
import Instagram from "@/assets/svg/icons/instagram.svg";
import Youtube from "@/assets/svg/icons/youtube.svg";

interface FooterProps {
	contactEmail?: string;
	contactPhone?: string;
	nip?: string;
	regon?: string;
	krs?: string;
}

const Footer = ({
	contactEmail = "fundacja.adopcyjni@gmail.com",
	contactPhone = "+48 888 888 888",
	nip = "8888888888",
	regon = "8888888888",
	krs = "8888888888",
}: FooterProps) => {
	return (
		<footer className="w-full py-10 px-4 md:px-8 lg:px-16">
			<div className="max-w-[1440px] mx-auto">
				<div className="flex flex-col md:flex-row justify-between gap-10 md:gap-6">
					<div className="flex flex-col gap-8">
						<div className="flex items-center gap-3">
							<Image
								src="/assets/images/logo.png"
								alt="Fundacja Adopcyjni Logo"
								width={64}
								height={64}
								className="object-contain"
							/>
							<h3 className="font-bold text-lg">Fundacja Adopcyjni</h3>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<h3 className="font-bold text-lg">Kontakt:</h3>
						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-3">
								<Mail className="size-8" />
								<span className="font-bold">{contactEmail}</span>
							</div>
							<div className="flex items-center gap-3">
								<Phone className="size-8" />
								<span className="font-bold">{contactPhone}</span>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<h3 className="font-bold text-lg">Obserwuj nas:</h3>
						<div className="flex items-center gap-6">
							<Link href="#" aria-label="Instagram">
								<Instagram className="size-8" />
							</Link>
							<Link href="#" aria-label="Facebook">
								<Facebook className="size-8" />
							</Link>
							<Link href="#" aria-label="YouTube">
								<Youtube className="size-8" />
							</Link>
						</div>
					</div>

					{/* Informacje */}
					<div className="flex flex-col gap-1">
						<p className="text-lg">
							<span className="font-bold">NIP:</span> {nip}
						</p>
						<p className="text-lg">
							<span className="font-bold">REGON:</span> {regon}
						</p>
						<p className="text-lg">
							<span className="font-bold">KRS:</span> {krs}
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
