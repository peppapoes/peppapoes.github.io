import type { ImageMetadata } from 'astro';
import milesAndMeals from '../assets/images/milesandmeals_preview.jpg';
import kickstarter from '../assets/images/kickstarter_preview.jpg';
import clickGame from '../assets/images/clickgame_preview.jpg';
import antwerpOnTap from '../assets/images/antwerpontap_preview.jpg';
import kickstarterVideo from '../assets/videos/kickstarter.mp4';

// Every image in src/assets/images, by file name, so projects can list many at once.
const imageFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/images/*.{png,jpg,jpeg,webp}', { eager: true });
const image = (file: string) => {
	const found = imageFiles[`../assets/images/${file}`];
	if (!found) throw new Error(`Image not found in src/assets/images: ${file}`);
	return found.default;
};
/** `series('pitchdeck', 3, 'png', 'Pitch deck slide')` → pitchdeck1.png … pitchdeck3.png */
const series = (name: string, count: number, ext: string, alt: string) =>
	Array.from({ length: count }, (_, i) => ({ src: image(`${name}${i + 1}.${ext}`), alt: `${alt} ${i + 1}` }));

export type Category = 'visual-design' | 'motion-design' | 'coding' | 'ux' | 'integration';

/** Label shown above a project's title. */
export const categoryLabels: Record<Category, string> = {
	'visual-design': 'Visual design',
	'motion-design': 'Motion design',
	coding: 'Creative coding',
	ux: 'UX',
	integration: 'Integration',
};

/** Label of the filters on /work, in the order they appear. */
export const filterLabels: Record<Category, string> = {
	'visual-design': 'Visual design',
	'motion-design': 'Motion Design',
	coding: 'Coding & Development',
	ux: 'UX',
	integration: 'Integration of all courses',
};

export type Tool = 'after-effects' | 'photoshop' | 'illustrator' | 'indesign' | 'figma';

export interface Project {
	/** Used in the URL: /work/slug */
	slug: string;
	title: string;
	category: Category;
	year: number;
	/** Thumbnail in the /work list and the home page preview. */
	preview?: ImageMetadata;
	previewAlt?: string;
	/** Longer title for the home page preview, e.g. "Miles & Meals app design". */
	previewTitle?: string;
	/** Third line in the home page preview; falls back to the category. */
	tagline?: string;
	assignment?: string;
	/** One string per paragraph. */
	idea?: string[];
	tools?: Tool[];
	/** Images in the frame on the project page; falls back to the preview. */
	gallery?: ProjectImage[];
	/** "Process" tab: per step an optional text and a scrollable row of images. */
	process?: { title: string; text?: string; images: ProjectImage[] }[];
	/** "End result" tab on the project page. */
	video?: string;
	/** "Inspiration" tab: a scrollable row of images. */
	inspiration?: ProjectImage[];
}

export type ProjectImage = { src: ImageMetadata; alt: string };

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
		year: 2026,
		preview: clickGame,
		previewAlt: 'Start screen of the CatVolution click game with a cat paw',
		assignment: 'Design a click game in JavaScript with a completely original theme.',
		idea: [
			'The word “game” always makes me happy. I love giving users something interactive to do with my digital work, whether it’s small interactions on a website or full-on conversations with Napoleon Bonaparte in a Figma prototype, as long as there’s an experience to be had.',
			'For this project, I created a cat-themed click game called CatVolution, where cats evolve based on your clicks and merges. I also added upgrades and a “golden poop” bonus for extra clicks. Feel free to play CatVolution if you’re ever bored!',
		],
	},
	{
		slug: 'kickstarter',
		title: 'Kickstarter',
		category: 'motion-design',
		year: 2026,
		preview: kickstarter,
		previewAlt: 'Mug and hexagon soap bar: Second life espresso scrub, support us on Kickstarter',
		video: kickstarterVideo,
		assignment: 'Pick a Kickstarter project and make a promoting video for it.',
		tools: ['after-effects', 'photoshop'],
		process: [
			{ title: 'Storyboard', images: series('storyboard', 4, 'png', 'Storyboard page') },
			{ title: 'Styleframes', images: series('styleframe', 3, 'png', 'Styleframe') },
			{ title: 'Pitch deck', images: series('pitchdeck', 11, 'png', 'Pitch deck slide') },
		],
	},
	{
		slug: 'antwerp-on-tap',
		title: 'Antwerp on Tap',
		category: 'integration',
		year: 2026,
		preview: antwerpOnTap,
		previewAlt: 'App screens of Antwerp on Tap, a bar crawl app',
	},
	{
		slug: 'type01',
		title: 'Type01',
		category: 'visual-design',
		year: 2026,
	},
	{
		slug: 'beyond-brewing',
		title: 'Beyond Brewing',
		category: 'integration',
		year: 2026,
	},
	{
		slug: 'walter-van-beirendonck',
		title: 'Walter Van Beirendonck',
		category: 'integration',
		year: 2026,
	},
];

export const projectUrl = (project: Project) => `/work/${project.slug}`;

/** The project a category tag on the home page links to: the first one with a preview. */
export const featuredProject = (category: Category) => projects.find((p) => p.category === category && p.preview);
