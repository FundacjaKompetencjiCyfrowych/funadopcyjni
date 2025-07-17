"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { NewsItem } from "@/types/storyblok";

interface NewsCardProps {
	item: NewsItem;
	variant?: "article" | "event" | "featured";
}

export function NewsCard({ item, variant = "article" }: NewsCardProps) {
	const isEvent = variant === "event";
	const isFeatured = variant === "featured";

	return (
		<>
			{isFeatured && (
				<article className="hidden md:flex flex-row gap-8 lg:gap-6 w-full h-[278px] lg:h-auto">
					<div className="flex-1 h-[278px] lg:w-[624px] lg:h-[360px] lg:flex-none">
						{item.image?.filename ? (
							<div className="w-full h-full relative">
								<Image
									src={item.image.filename}
									alt={item.image.alt || item.title}
									fill
									className="object-cover rounded-3xl lg:rounded-2xl"
								/>
							</div>
						) : (
							<div className="w-full h-full flex items-center justify-center bg-gray-light rounded-3xl lg:rounded-2xl">
								<p className="text-gray">Brak zdjęcia</p>
							</div>
						)}
					</div>

					<div className="flex flex-col justify-center gap-6 flex-1 lg:max-w-[568px] lg:gap-12">
						<div className="flex flex-col gap-2 lg:gap-4">
							{item.tags && item.tags.length > 0 && (
								<div className="flex items-center gap-1 flex-wrap lg:gap-2">
									{item.tags.slice(0, 3).map((tag, index) => (
										<React.Fragment key={tag}>
											<span className="text-base font-nunito text-text-dark uppercase">
												{tag}
											</span>
											{index < Math.min(item.tags!.length, 3) - 1 && (
												<div className="w-1 h-1 bg-text-muted rounded-full mx-1" />
											)}
										</React.Fragment>
									))}
								</div>
							)}

							<h3
								className="text-xl font-open-sans font-semibold text-text-dark leading-[1.2] overflow-hidden lg:text-2xl"
								style={{
									display: "-webkit-box",
									WebkitLineClamp: 2,
									WebkitBoxOrient: "vertical",
								}}
							>
								{item.title}
							</h3>

							<p
								className="text-base font-nunito text-text-dark leading-[1.5] overflow-hidden lg:text-lg"
								style={{
									display: "-webkit-box",
									WebkitLineClamp: 3,
									WebkitBoxOrient: "vertical",
								}}
							>
								{item.content}
							</p>
						</div>

						<Button className="self-start">Czytaj więcej</Button>
					</div>
				</article>
			)}

			{isEvent && (
				<article className="hidden md:flex flex-col gap-4 w-full lg:w-[421px] lg:gap-6">
					<div className="w-full h-[350px] lg:h-auto lg:aspect-[421/316]">
						{item.image?.filename ? (
							<div className="w-full h-full relative">
								<Image
									src={item.image.filename}
									alt={item.image.alt || item.title}
									fill
									className="object-cover rounded-3xl lg:rounded-2xl"
								/>
							</div>
						) : (
							<div className="w-full h-full flex items-center justify-center bg-gray-light rounded-3xl lg:rounded-2xl">
								<p className="text-gray">Brak zdjęcia</p>
							</div>
						)}
					</div>

					<div className="flex flex-col gap-6 lg:gap-6">
						<div className="flex flex-col gap-4 lg:gap-4">
							<h3 className="text-xl font-open-sans font-semibold text-text-dark leading-[1.2] lg:text-2xl">
								{item.title}
							</h3>

							<p
								className="text-base font-nunito text-text-dark leading-[1.5] lg:text-lg lg:overflow-hidden"
								style={{
									display: "-webkit-box",
									WebkitLineClamp: 6,
									WebkitBoxOrient: "vertical",
								}}
							>
								{item.content}
							</p>
						</div>

						<Button variant="event" icon={true} className="self-start">
							Dowiedz się więcej
						</Button>
					</div>
				</article>
			)}

			{!isFeatured && !isEvent && (
				<>
					<article className="hidden md:flex lg:hidden flex-col h-full w-[246px]">
						<div className="mb-4">
							{item.image?.filename ? (
								<div className="w-full h-[156px] relative">
									<Image
										src={item.image.filename}
										alt={item.image.alt || item.title}
										fill
										className="object-cover rounded-3xl"
									/>
								</div>
							) : (
								<div className="w-full h-[156px] flex items-center justify-center bg-gray-light rounded-3xl">
									<p className="text-gray">Brak zdjęcia</p>
								</div>
							)}
						</div>

						<div className="flex items-center mb-2 gap-1 w-full">
							{item.tags &&
								Array.isArray(item.tags) &&
								item.tags.map((tag, index) => {
									if (index > 2) return null;

									return (
										<React.Fragment key={index}>
											{index > 0 && (
												<div className="w-1 h-1 bg-text-muted rounded-full flex-shrink-0"></div>
											)}
											<span
												className={`text-text-dark text-sm font-normal leading-[1.5] uppercase ${
													index === 2 ? "truncate min-w-0" : "flex-shrink-0"
												}`}
												title={tag}
											>
												{tag}
											</span>
										</React.Fragment>
									);
								})}
							{item.tags && item.tags.length > 3 && (
								<>
									<div className="w-1 h-1 bg-text-muted rounded-full flex-shrink-0"></div>
									<span className="text-text-muted text-sm font-normal leading-[1.5] flex-shrink-0">
										...
									</span>
								</>
							)}
						</div>

						<h3 className="font-bold text-lg text-text-dark mb-2 leading-[1.5]">
							{item.title}
						</h3>

						<p className="text-text-dark text-base mb-4 leading-[1.5]">
							{item.content && item.content.length > 120
								? `${item.content.substring(0, 120)}...`
								: item.content}
						</p>

						<div className="mt-auto justify-start flex">
							<Button
								variant="light"
								icon={true}
								onClick={() =>
									(window.location.href = `/aktualnosci/${item.article_number}`)
								}
							>
								Czytaj więcej
							</Button>
						</div>
					</article>

					<article className="hidden lg:flex flex-col gap-2 h-full w-full">
						<div className="flex flex-col gap-4">
							<div className="">
								{item.image?.filename ? (
									<div className="w-full aspect-[421/266] relative">
										<Image
											src={item.image.filename}
											alt={item.image.alt || item.title}
											fill
											className="object-cover rounded-3xl"
										/>
									</div>
								) : (
									<div className="w-full aspect-[421/266] flex items-center justify-center bg-gray-light rounded-3xl">
										<p className="text-gray">Brak zdjęcia</p>
									</div>
								)}
							</div>

							<div className="flex flex-col gap-2">
								<div className="flex items-center gap-2 w-full">
									{item.tags &&
										Array.isArray(item.tags) &&
										item.tags.map((tag, index) => {
											if (index > 2) return null;

											return (
												<React.Fragment key={index}>
													{index > 0 && (
														<div className="w-1 h-1 bg-text-muted rounded-full flex-shrink-0"></div>
													)}
													<span
														className={`text-text-dark text-base font-nunito font-normal leading-[1.5] uppercase ${
															index === 2 ? "truncate min-w-0" : "flex-shrink-0"
														}`}
														title={tag}
													>
														{tag}
													</span>
												</React.Fragment>
											);
										})}
									{item.tags && item.tags.length > 3 && (
										<>
											<div className="w-1 h-1 bg-text-muted rounded-full flex-shrink-0"></div>
											<span className="text-text-muted text-base font-nunito font-normal leading-[1.5] flex-shrink-0">
												...
											</span>
										</>
									)}
								</div>

								<h3 className="font-open-sans font-semibold text-2xl text-text-dark leading-[1.2]">
									{item.title}
								</h3>

								<p
									className="text-text-dark text-lg font-nunito leading-[1.5] overflow-hidden"
									style={{
										display: "-webkit-box",
										WebkitLineClamp: 4,
										WebkitBoxOrient: "vertical",
									}}
								>
									{item.content}
								</p>
							</div>
						</div>

						<div className="mt-auto">
							<Button
								variant="light"
								icon={true}
								onClick={() =>
									(window.location.href = `/aktualnosci/${item.article_number}`)
								}
							>
								Czytaj więcej
							</Button>
						</div>
					</article>
				</>
			)}

			<article className="flex md:hidden flex-col h-full w-full">
				<div className="mb-4">
					{item.image?.filename ? (
						<div
							className={`w-full relative ${
								isFeatured ? "aspect-[361/228]" : "aspect-[420/266]"
							}`}
						>
							<Image
								src={item.image.filename}
								alt={item.image.alt || item.title}
								fill
								className="object-cover rounded-2xl"
							/>
						</div>
					) : (
						<div
							className={`w-full flex items-center justify-center bg-gray-light rounded-2xl ${
								isFeatured ? "aspect-[361/228]" : "aspect-[420/266]"
							}`}
						>
							<p className="text-gray">Brak zdjęcia</p>
						</div>
					)}
				</div>

				{!isEvent && (
					<div className="flex items-center mb-2 gap-1 w-full">
						{item.tags &&
							Array.isArray(item.tags) &&
							item.tags.map((tag, index) => {
								if (index > 2) return null;

								return (
									<React.Fragment key={index}>
										{index > 0 && (
											<div className="w-1 h-1 bg-text-muted rounded-full flex-shrink-0"></div>
										)}
										<span
											className={`text-text-dark text-sm font-normal leading-[1.5] uppercase ${
												index === 2 ? "truncate min-w-0" : "flex-shrink-0"
											}`}
											title={tag}
										>
											{tag}
										</span>
									</React.Fragment>
								);
							})}
						{item.tags && item.tags.length > 3 && (
							<>
								<div className="w-1 h-1 bg-text-muted rounded-full flex-shrink-0"></div>
								<span className="text-text-muted text-sm font-normal leading-[1.5] flex-shrink-0">
									...
								</span>
							</>
						)}
					</div>
				)}

				<h3
					className={`font-semibold text-text-dark mb-2 ${
						isFeatured ? "text-xl font-open-sans" : "text-xl"
					}`}
				>
					{item.title}
				</h3>

				<p
					className={`text-text-dark mb-4 ${
						isFeatured ? "text-base" : "text-base"
					}`}
				>
					{item.content && item.content.length > (isFeatured ? 200 : 120)
						? `${item.content.substring(0, isFeatured ? 200 : 120)}...`
						: item.content}
				</p>

				<div className="mt-auto justify-start flex">
					<Button
						variant={isFeatured ? "default" : isEvent ? "event" : "light"}
						icon={!isFeatured}
						onClick={() =>
							(window.location.href = `/aktualnosci/${item.article_number}`)
						}
					>
						{isEvent ? "Dowiedz się więcej" : "Czytaj więcej"}
					</Button>
				</div>
			</article>
		</>
	);
}
