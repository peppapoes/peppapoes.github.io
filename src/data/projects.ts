import type { ImageMetadata } from 'astro';
import type { Tool } from './tools';
import milesAndMeals from '../assets/images/milesandmeals_preview.jpg';
import kickstarter from '../assets/images/kickstarter_preview.jpg';
import clickGame from '../assets/images/clickgame_preview.jpg';
import antwerpOnTap from '../assets/images/antwerpontap_preview.jpg';
import type01 from '../assets/images/type01-mockupBG.png';
import kickstarterVideo from '../assets/videos/kickstarter.mp4';

// Every image in src/assets/images (and its folders), by file name, so projects can list many at once.
const imageFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/images/**/*.{png,jpg,jpeg,webp}', { eager: true });
const image = (file: string) => {
	const found = imageFiles[`../assets/images/${file}`];
	if (!found) throw new Error(`Image not found in src/assets/images: ${file}`);
	return found.default;
};
/** `series('pitchdeck', 3, 'png', 'Pitch deck slide')` → pitchdeck1.png … pitchdeck3.png */
const series = (name: string, count: number, ext: string, alt: string) =>
	Array.from({ length: count }, (_, i) => ({ src: image(`${name}${i + 1}.${ext}`), alt: `${alt} ${i + 1}` }));
/** `folder('type01-inspiration', 'Type01 inspiration')` → every image in src/assets/images/type01-inspiration, by file name. */
const folder = (name: string, alt: string) => {
	const prefix = `../assets/images/${name}/`;
	const files = Object.keys(imageFiles)
		.filter((file) => file.startsWith(prefix))
		.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
	if (!files.length) throw new Error(`No images found in src/assets/images/${name}`);
	return files.map((file, i) => ({ src: imageFiles[file].default, alt: `${alt} ${i + 1}` }));
};

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
	/** The project its category's tag on the home page opens. */
	featured?: boolean;
	assignment?: string;
	/** One string per paragraph. */
	idea?: string[];
	tools?: Tool[];
	/** The live site, linked from a label on the photo on the project page. */
	website?: string;
	/** Images in the frame on the project page; falls back to the preview. */
	gallery?: ProjectImage[];
	/** "Process" tab: per step an optional text and a scrollable row of images. */
	process?: { title: string; text?: string; images: ProjectImage[] }[];
	/** "End result" tab on the project page: a video (with an optional title and text) and/or rows of images, like the process steps. */
	video?: string;
	videoTitle?: string;
	videoText?: string;
	results?: { title: string; text?: string; images: ProjectImage[] }[];
	/** "Inspiration" tab: a wall of images in columns. */
	inspiration?: ProjectImage[];
	/** Optional for the "Inspiration" tab: one large image beside the others, and a colour palette under them. */
	inspirationFeature?: ProjectImage;
	inspirationPalette?: ProjectImage;
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
		videoTitle: 'Finished product',
		videoText:
			'My video turned into a piece full of collage techniques, playfulness, movement and colour. The voice-over makes the message so much clearer and stronger, especially combined with the fresh music. I learned a lot about how a video can be put together to hold the viewer’s attention. The same goes for sound: small sound effects take a product to the next level, and I really noticed that in this project.',
		assignment:
			'Make a promo video for a Kickstarter project, using all kinds of techniques in After Effects and working in Audition for the sound.',
		idea: [
			'Choosing a Kickstarter project was a challenge in itself. Many projects relied on visuals that were too complex to dive into with little experience. Then I came across the Second Life espresso scrub and immediately saw the real story behind it: giving something a second life.',
			'That became my anchor for telling a clear and appealing story in a video. I chose a collage-like style because it has a recycled feel to it, which made it a perfect fit. Take a look at my process and the result below!',
		],
		tools: ['after-effects', 'photoshop'],
		process: [
			{
				title: 'Storyboard',
				text: 'My storyboard consists of 21 carefully selected scenes, complemented by a script. This is where I decided to use a voice-over and worked out which match cuts to add.',
				images: series('storyboard', 4, 'png', 'Storyboard page'),
			},
			{
				title: 'Styleframes',
				text: 'I went for a collage-like style with a bold colour palette. It felt like a natural fit for a product built around recycling, and I wanted that to come through in the styling of the video.',
				images: series('styleframe', 3, 'png', 'Styleframe'),
			},
			{
				title: 'Pitch deck',
				text: 'My pitch deck shows all the preparation behind the project: the storytelling, sketches, inspiration and voice-over scripts.',
				images: series('pitchdeck', 11, 'png', 'Pitch deck slide'),
			},
		],
		inspiration: folder('kickstarter-inspiration', 'Kickstarter inspiration'),
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
		previewTitle: 'Type01 conference website',
		category: 'visual-design',
		year: 2026,
		featured: true,
		preview: type01,
		previewAlt: 'Phone and laptop showing the website of the Type01 magazine typography conference',
		assignment: 'Design a website for the Type01 magazine typography conference for mobile and desktop.',
		idea: [
			'The idea behind this concept was to play with typography, of course, but also to make the experience genuinely playful by turning the website into something dynamic. The neon colours add an extra layer to that sense of play.',
			'I wanted every visitor to feel a wave of curiosity and a touch of playfulness, offering them a fresh way to get to know Type01.',
		],
		process: [
			// TODO: replace the placeholder text.
			{ title: 'Try-outs', text: 'Placeholder: a short description of the try-outs comes here.', images: folder('type01-tryouts', 'Type01 try-out') },
		],
		inspiration: folder('type01-inspiration', 'Type01 inspiration'),
		results: [
			{ title: 'Desktop', images: folder('type01-desktopresults', 'Type01 website on desktop, screen') },
			{ title: 'Mobile', images: folder('type01-mobileresults', 'Type01 website on mobile, screen') },
		],
	},
	{
		slug: 'beyond-brewing',
		title: 'Beyond Brewing',
		category: 'integration',
		year: 2026,
	},
	{
		slug: 'momu-antwerp',
		title: 'MoMu Antwerp',
		category: 'integration',
		year: 2026,
		preview: image('mockup-wvb.jpg'),
		previewAlt: 'Mockup of the MoMu Antwerp website about Walter Van Beirendonck',
		website: 'https://delatterfemke.be/outofmeasure/',
		assignment:
			'Design a detail page that puts a designer in the spotlight within MoMu, the Fashion Museum of Antwerp, and sparks curiosity for the exhibition. Visual design, UX and code all matter equally in this assignment, and each had to be fully worked out.',
		idea: [
			'I chose Walter Van Beirendonck, one of the Antwerp Six designers. I set out to put his collections “W.A.R.” and “Why Is a Raven Like a Writing Desk?” in the spotlight with a fairly hard, punky atmosphere.',
			'I tried to bring out the heavier side of Walter by adding animations that make you part of the collection and of the way he thinks.',
		],
		// A board: the moodboard beside the others, the colour palette underneath (the tiny font sample is left out).
		inspiration: folder('wvb-inspiration', 'MoMu Antwerp inspiration').filter(
			({ src }) => ![image('wvb-inspiration/Group 132.png'), image('wvb-inspiration/Group 133.png'), image('wvb-inspiration/font_ Zuume.png')].includes(src),
		),
		inspirationFeature: { src: image('wvb-inspiration/Group 132.png'), alt: 'Moodboard of magazine spreads with “Walter Van Beirendonck” in bold type' },
		inspirationPalette: { src: image('wvb-inspiration/Group 133.png'), alt: 'Colour palette: #DCCC00, #E54887, #3B77B3, #252525 and #56C37B' },
		results: [
			{ title: 'Desktop', images: folder('wvb-resultsdesktop', 'MoMu Antwerp website on desktop, screen') },
			{ title: 'Mobile', images: folder('wvb-resultsmobile', 'MoMu Antwerp website on mobile, screen') },
		],
	},
];

export const projectUrl = (project: Project) => `/work/${project.slug}`;

/** The project a category tag on the home page links to: the featured one, or else the first one with a preview. */
export const featuredProject = (category: Category) => {
	const inCategory = projects.filter((p) => p.category === category && p.preview);
	return inCategory.find((p) => p.featured) ?? inCategory[0];
};
