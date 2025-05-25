export interface StoryblokImage {
	filename: string;
	alt?: string;
}

export interface NewsItem {
	_uid: string;
	title: string;
	content: string;
	image: StoryblokImage;
	tags: string[];
	article_number: number;
	publish_date: string;
	component: string;
	[key: string]: string | number | boolean | object | undefined;
}

export interface NewsBlockStoryblok {
	_uid: string;
	component: "news_section";
	articles: NewsItem[];
	[key: string]: string | number | boolean | object | undefined;
}
