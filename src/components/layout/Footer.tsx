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

export function Footer({
	contactEmail = "fundacja.adopcyjni@gmail.com",
	contactPhone = "+48 888 888 888",
	nip = "8888888888",
	regon = "8888888888",
	krs = "8888888888",
}: FooterProps) {
	return (
		<footer className="w-full bg-white border-t border-gray-100">
			<div className="flex flex-col gap-6 p-4 md:hidden">
				<div className="flex items-center gap-3">
					<Image
						src="/assets/images/logo.png"
						alt="Fundacja Adopcyjni Logo"
						width={48}
						height={48}
						className="object-contain"
					/>
					<h3 className="font-bold text-lg font-nunito">Fundacja Adopcyjni</h3>
				</div>

				<div className="flex flex-col gap-3">
					<h4 className="font-bold text-base font-nunito">Kontakt:</h4>
					<div className="flex items-center gap-3">
						<Mail className="size-5 text-orange-400" />
						<span className="text-sm font-nunito break-all">
							{contactEmail}
						</span>
					</div>
					<div className="flex items-center gap-3">
						<Phone className="size-5 text-orange-400" />
						<span className="text-sm font-nunito">{contactPhone}</span>
					</div>
				</div>

				<div className="flex flex-col gap-1">
					<p className="text-sm font-nunito">
						<span className="font-bold">NIP:</span> {nip}
					</p>
					<p className="text-sm font-nunito">
						<span className="font-bold">REGON:</span> {regon}
					</p>
					<p className="text-sm font-nunito">
						<span className="font-bold">KRS:</span> {krs}
					</p>
				</div>

				<div className="flex flex-col gap-3">
					<h4 className="font-bold text-base font-nunito">Obserwuj nas:</h4>
					<div className="flex items-center gap-4">
						<Link href="#" aria-label="Instagram">
							<Instagram className="size-6 text-orange-400 hover:text-orange-500 transition-colors" />
						</Link>
						<Link href="#" aria-label="Facebook">
							<Facebook className="size-6 text-orange-400 hover:text-orange-500 transition-colors" />
						</Link>
						<Link href="#" aria-label="YouTube">
							<Youtube className="size-6 text-orange-400 hover:text-orange-500 transition-colors" />
						</Link>
					</div>
				</div>
			</div>

			<div className="hidden md:flex lg:hidden flex-col gap-8 p-8">
				<div className="flex items-center gap-3">
					<Image
						src="/assets/images/logo.png"
						alt="Fundacja Adopcyjni Logo"
						width={56}
						height={56}
						className="object-contain"
					/>
					<h3 className="font-bold text-xl font-nunito">Fundacja Adopcyjni</h3>
				</div>

				<div className="flex flex-col gap-4">
					<h4 className="font-bold text-lg font-nunito">Kontakt:</h4>
					<div className="flex items-center gap-3">
						<Mail className="size-6 " />
						<span className="text-base font-nunito">{contactEmail}</span>
					</div>
					<div className="flex items-center gap-3">
						<Phone className="size-6 text-orange-400" />
						<span className="text-base font-nunito">{contactPhone}</span>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<p className="text-base font-nunito">
						<span className="font-bold">NIP:</span> {nip}
					</p>
					<p className="text-base font-nunito">
						<span className="font-bold">REGON:</span> {regon}
					</p>
					<p className="text-base font-nunito">
						<span className="font-bold">KRS:</span> {krs}
					</p>
				</div>

				<div className="flex flex-col gap-4">
					<h4 className="font-bold text-lg font-nunito">Obserwuj nas:</h4>
					<div className="flex items-center gap-6">
						<Link href="#" aria-label="Instagram">
							<Instagram className="size-7 text-orange-400 hover:text-orange-500 transition-colors" />
						</Link>
						<Link href="#" aria-label="Facebook">
							<Facebook className="size-7 text-orange-400 hover:text-orange-500 transition-colors" />
						</Link>
						<Link href="#" aria-label="YouTube">
							<Youtube className="size-7 text-orange-400 hover:text-orange-500 transition-colors" />
						</Link>
					</div>
				</div>
			</div>

			<div className="hidden lg:flex items-center justify-center py-6 px-16">
				<div className="max-w-[1440px] w-full flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Image
							src="/assets/images/logo.png"
							alt="Fundacja Adopcyjni Logo"
							width={64}
							height={64}
							className="object-contain"
						/>
						<h3 className="font-bold text-xl font-nunito">
							Fundacja Adopcyjni
						</h3>
					</div>

					<div className="flex flex-col gap-2">
						<h4 className="font-bold text-lg font-nunito">Kontakt:</h4>
						<div className="flex items-center gap-3">
							<Mail className="size-6 text-orange-400" />
							<span className="text-lg font-nunito">{contactEmail}</span>
						</div>
						<div className="flex items-center gap-3">
							<Phone className="size-6 text-orange-400" />
							<span className="text-lg font-nunito">{contactPhone}</span>
						</div>
					</div>

					<div className="flex flex-col gap-3">
						<div className="flex flex-col gap-2">
							<h4 className="font-bold text-lg font-nunito">Obserwuj nas:</h4>
							<div className="flex items-center gap-4">
								<Link href="#" aria-label="Instagram">
									<Instagram className="size-8 text-orange-400 hover:text-orange-500 transition-colors" />
								</Link>
								<Link href="#" aria-label="Facebook">
									<Facebook className="size-8 text-orange-400 hover:text-orange-500 transition-colors" />
								</Link>
								<Link href="#" aria-label="YouTube">
									<Youtube className="size-8 text-orange-400 hover:text-orange-500 transition-colors" />
								</Link>
							</div>
						</div>

						<div className="flex flex-col gap-1">
							<p className="text-lg font-nunito">
								<span className="font-bold">NIP:</span> {nip}
							</p>
							<p className="text-lg font-nunito">
								<span className="font-bold">REGON:</span> {regon}
							</p>
							<p className="text-lg font-nunito">
								<span className="font-bold">KRS:</span> {krs}
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
