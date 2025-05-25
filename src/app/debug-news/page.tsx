import React from "react";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { ISbStoriesParams } from "@storyblok/react";
import Navbar from "@/components/organisms/navigation/navbar";

interface StoryblokBlock {
	_uid: string;
	component: string;
	[key: string]: unknown;
}

interface StoryblokArticle {
	uuid: string;
	content: {
		_uid: string;
		component: string;
		title: string;
		tags?: string[];
		article_number?: number;
		publish_date?: string;
		[key: string]: unknown;
	};
	[key: string]: unknown;
}

async function fetchNewsData() {
	try {
		const storyblokApi = getStoryblokApi();
		const sbParams: ISbStoriesParams = { version: "draft" };
		const homeData = await storyblokApi.get("cdn/stories/home", sbParams);
		const newsSection = homeData?.data?.story?.content?.body?.find(
			(blok: StoryblokBlock) => blok.component === "news_section"
		);

		const articlesData = await storyblokApi.get("cdn/stories", {
			...sbParams,
			starts_with: "article",
			per_page: 20,
		});

		return {
			newsSection,
			articlesData: articlesData?.data,
			homeData: homeData?.data,
		};
	} catch (error) {
		console.error("Błąd podczas pobierania danych z API Storyblok:", error);
		return {
			error: "Wystąpił błąd podczas pobierania danych",
		};
	}
}

export default async function DebugNewsPage() {
	const data = await fetchNewsData();

	return (
		<>
			<Navbar />
			<div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow">
				<h1 className="text-3xl font-bold mb-6">Debug News Data</h1>

				<div className="grid grid-cols-1 gap-8">
					<section>
						<h2 className="text-2xl font-semibold mb-4">
							Struktura komponentu news_section
						</h2>
						{data.newsSection ? (
							<div className="space-y-4">
								<div>
									<h3 className="text-xl font-medium">
										Podstawowe informacje:
									</h3>
									<div className="bg-gray-100 p-4 rounded-lg">
										<p>
											<strong>Component:</strong> {data.newsSection.component}
										</p>
										<p>
											<strong>UID:</strong> {data.newsSection._uid}
										</p>
										<p>
											<strong>Liczba artykułów:</strong>{" "}
											{Array.isArray(data.newsSection.articles)
												? data.newsSection.articles.length
												: "N/A"}
										</p>
									</div>
								</div>

								<div>
									<h3 className="text-xl font-medium">Klucze w obiekcie:</h3>
									<div className="bg-gray-100 p-4 rounded-lg">
										<ul className="list-disc ml-6">
											{Object.keys(data.newsSection).map((key) => (
												<li key={key}>
													{key}: {typeof data.newsSection[key]}
												</li>
											))}
										</ul>
									</div>
								</div>

								<div>
									<h3 className="text-xl font-medium">Dane surowe:</h3>
									<pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-sm">
										{JSON.stringify(data.newsSection, null, 2)}
									</pre>
								</div>
							</div>
						) : (
							<div className="bg-red-100 text-red-700 p-4 rounded-lg">
								Nie znaleziono komponentu news_section na stronie głównej
							</div>
						)}
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">Lista artykułów</h2>
						{data.articlesData?.stories &&
						data.articlesData.stories.length > 0 ? (
							<div className="space-y-4">
								<p className="text-gray-700">
									Znaleziono {data.articlesData.stories.length} artykułów w
									Storyblok
								</p>

								<div className="overflow-x-auto">
									<table className="min-w-full bg-white">
										<thead className="bg-gray-100">
											<tr>
												<th className="px-4 py-2 text-left">UID</th>
												<th className="px-4 py-2 text-left">Tytuł</th>
												<th className="px-4 py-2 text-left">Tagi</th>
												<th className="px-4 py-2 text-left">Nr art.</th>
												<th className="px-4 py-2 text-left">Data</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200">
											{data.articlesData.stories.map(
												(story: StoryblokArticle) => (
													<tr key={story.uuid} className="hover:bg-gray-50">
														<td className="px-4 py-2 text-sm">
															{story.content._uid}
														</td>
														<td className="px-4 py-2">{story.content.title}</td>
														<td className="px-4 py-2 text-sm">
															{Array.isArray(story.content.tags)
																? story.content.tags.join(", ")
																: "N/A"}
														</td>
														<td className="px-4 py-2">
															{story.content.article_number || "N/A"}
														</td>
														<td className="px-4 py-2 text-sm">
															{story.content.publish_date || "N/A"}
														</td>
													</tr>
												)
											)}
										</tbody>
									</table>
								</div>

								<div>
									<h3 className="text-xl font-medium">
										Przykładowy artykuł (pierwszy):
									</h3>
									<pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-sm">
										{JSON.stringify(data.articlesData.stories[0], null, 2)}
									</pre>
								</div>
							</div>
						) : (
							<div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg">
								Nie znaleziono żadnych artykułów w Storyblok lub wystąpił błąd
								podczas ich pobierania
							</div>
						)}
					</section>

					{data.error && (
						<section className="bg-red-100 text-red-700 p-4 rounded-lg">
							<h2 className="text-xl font-semibold mb-2">Błąd</h2>
							<p>{data.error}</p>
						</section>
					)}
				</div>
			</div>
		</>
	);
}
