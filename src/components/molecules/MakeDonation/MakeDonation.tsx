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
		<section className="w-full my-12 md:my-14 lg:my-0">
			<div className="max-w-[1440px] mx-auto">
				<div className="flex flex-col md:flex-row">
					<div className="w-full md:w-1/2 bg-primary py-12 px-6 md:py-8 md:px-8 lg:py-12 lg:px-16">
						<div className="w-full max-w-[528px] md:max-w-[369px] lg:max-w-[528px] mx-auto md:ml-0">
							<div className="flex flex-col gap-4 md:gap-4 lg:gap-6">
								<h2 className="text-3xl md:text-[32px] lg:text-5xl font-semibold text-center font-open-sans md:leading-[38px] lg:leading-normal">
									{title}
								</h2>
								<p className="text-xl md:text-lg lg:text-xl text-center md:text-left lg:text-center font-bold md:font-bold lg:font-semibold font-nunito">
									{subtitle}
								</p>
								<div className="bg-light-background p-6 md:p-4 lg:p-6 rounded-3xl">
									<div className="flex flex-col gap-2 md:gap-2 lg:gap-2">
										<p className="font-nunito text-base md:text-lg lg:text-base">
											<span className="font-bold">Tytuł:</span> Darowizna na
											cele statutowe
										</p>
										<p className="font-nunito text-base md:text-lg lg:text-base">
											<span className="font-bold">Odbiorca:</span> Fundacja
											Adopcyjni
										</p>
										<p className="font-nunito text-base md:text-lg lg:text-base">
											<span className="font-bold">Numer konta:</span> 95 1090
											2705 0000 0001 5812 4243
										</p>
									</div>
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
