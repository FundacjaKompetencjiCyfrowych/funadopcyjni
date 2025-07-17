"use client";

import { getStoryblokApi } from "@/lib/storyblok";
import { PropsWithChildren } from "react";

export function StoryblokProvider({ children }: PropsWithChildren) {
	getStoryblokApi();
	return children;
}
