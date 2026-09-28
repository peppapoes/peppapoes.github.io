import type { ImageMetadata } from 'astro';
import milesAndMeals from '../assets/images/milesandmeals_preview.jpg';

export type Category = 'visual-design' | 'motion-design' | 'coding' | 'integration';

export interface Project {
	slug: string;
	title: string;
	year: string;
	tagline: string;
	category: Category;
	preview: ImageMetadata;
	previewAlt: string;
	/** Link to the project page, once it exists. */
	href?: string;
}

export const projects: Project[] = [
	{
		slug: 'miles-and-meals',
		title: 'Miles & Meals app design',
		year: '2026 assignment',
		tagline: 'Branding & visual identity',
		category: 'visual-design',
		preview: milesAndMeals,
		previewAlt: 'Hand holding a phone showing the Miles & Meals app',
	},
];

/** The project shown when a category tag on the home page is clicked. */
export const featuredProject = (category: Category) => projects.find((p) => p.category === category);
