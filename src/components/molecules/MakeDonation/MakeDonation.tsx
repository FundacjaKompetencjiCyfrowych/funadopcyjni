"use client";

import React from "react";
import Image from "next/image";

interface MakeDonationProps {
	title?: string;
	subtitle?: string;
}

const MakeDonation = ({
	title = "WESPRZYJ NAS",
	subtitle = "Pomóż nam działać na rzecz dzieci i rodzin.",
}: MakeDonationProps) => {
	return (
		<section className="w-full">
			<div className="max-w-[1440px] mx-auto">
				<div className="flex flex-col md:flex-row">
					<div className="w-full md:w-1/2 bg-primary py-12 px-6 md:px-16">
						<div className="w-[528px] mx-auto md:ml-0">
							<h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
								{title}
							</h2>
							<p className="text-xl mb-8 text-center font-semibold">
								{subtitle}
							</p>
							<div className="bg-[#FFF8EB] p-6 rounded-3xl ">
								<div className="flex flex-col gap-2">
									<p>
										<span className="font-bold">Tytuł:</span> Darowizna na cele
										statutowe
									</p>
									<p>
										<span className="font-bold">Odbiorca:</span> Fundacja
										Adopcyjni
									</p>
									<p>
										<span className="font-bold">Numer konta:</span> 95 1090 2705
										0000 0001 5812 4243
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full md:w-1/2 relative h-[300px] md:h-auto">
						<Image
							src="/assets/images/make_donation.png"
							alt="Wesprzyj nas"
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, 50vw"
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MakeDonation;
