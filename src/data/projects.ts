import type { ImageMetadata } from 'astro';
import milesAndMeals from '../assets/images/milesandmeals_preview.jpg';

export type Category = 'visual-design' | 'motion-design' | 'coding' | 'experience-design' | 'integration';

export const categoryLabels: Record<Category, string> = {
	'visual-design': 'Visual design',
	'motion-design': 'Motion design',
	coding: 'Creative coding',
	'experience-design': 'Experience Design',
	integration: 'Integration',
};

export interface Project {
	/** Used in the URL: /work#slug */
	slug: string;
	title: string;
	category: Category;
	year: number;
	preview: ImageMetadata;
	previewAlt: string;
	/** Longer title for the home page preview, e.g. "Miles & Meals app design". */
	previewTitle?: string;
	/** Third line in the home page preview; falls back to the category. */
	tagline?: string;
	assignment?: string;
	idea?: string;
	/** Images for the gallery on /work. Grey placeholders are shown until these are added. */
	gallery?: { src: ImageMetadata; alt: string }[];
}

// TODO: replace the placeholder preview images and add each project's own texts.
export const projects: Project[] = [
	{
		slug: 'miles-and-meals',
		title: 'Miles & Meals',
		previewTitle: 'Miles & Meals app design',
		category: 'visual-design',
		year: 2026,
		tagline: 'Branding & visual identity',
		preview: milesAndMeals,
		previewAlt: 'Hand holding a phone showing the Miles & Meals app',
	},
	{
		slug: 'click-game',
		title: 'Click game',
		category: 'coding',
		year: 2024,
		preview: milesAndMeals,
		previewAlt: 'Preview of the CatVolution click game',
		assignment: 'Design a click game in JavaScript with a completely original theme.',
		idea:
			'The word “game” always makes me happy. I love giving users something interactive to do with my digital work, whether it’s small interactions on a website or full-on conversations with Napoleon Bonaparte in a Figma prototype, as long as there’s an experience to be had. For this project, I created a cat-themed click game called CatVolution, where cats evolve based on your clicks and merges. I also added upgrades and a “golden poop” bonus for extra clicks. Feel free to play CatVolution if you’re ever bored!',
	},
	{
		slug: 'case-study',
		title: 'Case study',
		category: 'experience-design',
		year: 2025,
		preview: milesAndMeals,
		previewAlt: 'Preview of the experience design case study',
	},
	{
		slug: 'antwerp-on-tap',
		title: 'Antwerp on Tap',
		category: 'integration',
		year: 2026,
		preview: milesAndMeals,
		previewAlt: 'Preview of Antwerp on Tap',
	},
];

export const projectUrl = (project: Project) => `/work#${project.slug}`;

/** The project shown when a category tag on the home page is clicked. */
export const featuredProject = (category: Category) => projects.find((p) => p.category === category);
