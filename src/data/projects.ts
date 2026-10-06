import type { ImageMetadata } from 'astro';
import type { Tool } from './tools';
import kickstarter from '../assets/images/kickstarter_preview.jpg';
import antwerpOnTap from '../assets/images/antwerpontap_preview.jpg';
import type01 from '../assets/images/type01-mockupBG.png';
import kickstarterVideo from '../assets/videos/kickstarter.mp4';
import antwerpOnTapVideo from '../assets/videos/antwerpontap.mp4';

// Every image in src/assets/images (and its folders), by file name, so projects can list many at once.
const imageFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/images/**/*.{png,jpg,jpeg,webp}', { eager: true });
// File names from macOS can spell accents differently (é as e + accent), so compare them normalised.
const byNormalisedName = new Map(Object.entries(imageFiles).map(([path, module]) => [path.normalize('NFC'), module]));
const image = (file: string) => {
	const found = byNormalisedName.get(`../assets/images/${file}`.normalize('NFC'));
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
	/** Text on that label; "visit website" by default. */
	websiteLabel?: string;
	/** Where the whole process can be seen (e.g. a Figma file), linked under "Process". */
	processLink?: string;
	/** Images in the frame on the project page; falls back to the preview. */
	gallery?: ProjectImage[];
	/** "Process" tab: per step an optional text and a scrollable row of images. */
	process?: { title: string; text?: string; images: ProjectImage[] }[];
	/** "End result" tab on the project page: a video (with an optional title and text) and/or rows of images, like the process steps. */
	video?: string;
	videoTitle?: string;
	videoText?: string;
	/** Show the video after the image rows instead of before them. */
	videoLast?: boolean;
	results?: { title: string; text?: string; images: ProjectImage[] }[];
	/** "Inspiration" tab: a wall of images in columns. */
	inspiration?: ProjectImage[];
	/** Optional for the "Inspiration" tab: one large image beside the others, and a colour palette under them. */
	inspirationFeature?: ProjectImage;
	/**
	 * Optional: the inspiration laid out exactly like a design, each image at its own
	 * spot (x, y, width, height in the design's pixels). `fit: 'contain'` keeps an
	 * image whole instead of cropping it (for stickers and palettes).
	 */
	inspirationCollage?: { size: [number, number]; items: CollageItem[] };
	inspirationPalette?: ProjectImage;
}

export type ProjectImage = { src: ImageMetadata; alt: string };
export type CollageItem = ProjectImage & { at: [number, number, number, number]; fit?: 'contain' };

export const projects: Project[] = [
	{
		slug: 'miles-and-meals',
		title: 'Miles & Meals',
		previewTitle: 'Miles & Meals app design',
		category: 'visual-design',
		year: 2026,
		tagline: 'Branding & visual identity',
		preview: image('miles&meals-mockup.png'),
		previewAlt: 'Four phones showing screens of the Miles & Meals app',
		assignment:
			'Create a completely new brand identity for Miles & Meals, a food box company built around specialities from all over the world. Design a brandboard first, then a full multi-page app.',
		idea: [
			'Miles & Meals brings street food culture into the home kitchen, so I wanted the brand to feel like a busy market. I chose fiery tones like Nomad Ember and Roasted Paprika, balanced by Market Linen and a soft light blue.',
			'The logo is a pan with a rising flame that subtly forms the letter M. Illustrations and bold stripes, like market stall awnings, give the brandboard and the app a world-market vibe. In my mockups you can see the brand in context and the atmosphere it creates.',
		],
		tools: ['figma'],
		processLink: 'https://www.figma.com/design/S1jXyFqNyIQtXdqVa3S3Kd/Miles---Meals?node-id=6817-1889&t=seLy3uXWtWS5mY24-1',
		process: [
			{
				title: 'Sketches & concepts',
				text: 'I started with a moodboard of local markets and street food stalls to pin down the mood and style. From there I filled my sketchbook with logo ideas, from striped awnings and food carts to a lot of Ms, until the pan with a flame stuck. I worked that sketch out digitally, then designed a set of matching icons for the app navigation and a striped box pattern.',
				images: folder('milesmeals-process', 'Miles & Meals process'),
			},
		],
		// Laid out like the moodboard in Femke's design (1483 × 631).
		inspirationCollage: {
			size: [1483, 631],
			items: (
				[
					['The Public Food Hub _ Communication Arts 1.png', 'The Public food hub poster', [0, 4, 258, 367]],
					['Breakfast time 1.png', 'Breakfast time illustration', [0, 396, 258, 107]],
					['_ (17) 4.png', 'Illustrated tomatoes', [0, 523, 258, 108]],
					['_ (20) 2.png', 'Sono veri striped packaging', [274, 4, 236, 217]],
					['-29 2.png', 'Make your cravings come true poster', [274, 231, 236, 148]],
					['Screenshot 2026-02-26 at 10.36.35 1.png', 'Pork buns poster', [274, 397, 236, 234]],
					['_ (10) 5.png', 'Crisp & Crunch packaging', [528, 0, 353, 358]],
					['_ (11) 6.png', 'Burger yum illustration', [528, 376, 184, 255]],
					['Santino Stevani´s American Spritz 1.png', 'Pizza & Spritz poster', [730, 376, 204, 255]],
					['Univers graphique coloré et estival 1.png', 'Green sticker illustrations', [957, 374, 206, 257]],
					['Does it POP 2.png', 'Jam labels with fruit illustrations', [901, 0, 330, 358]],
					['Mask group-1.png', 'Mediterranean badge', [1251, 93, 232, 243], 'contain'],
					['Group 1171274923.png', 'Colour palette: orange, red, light blue, dark red and cream', [1180, 376, 258, 83], 'contain'],
					['Mask group.png', 'Meadowland Farm badge', [1180, 471, 155, 155], 'contain'],
				] as const
			).map(([file, alt, at, fit]) => ({ src: image(`milesmeals-inspiration/${file}`), alt, at: [...at], fit })),
		},
		results: [
			// The last screenshot is the first page of the brandboard.
			{ title: 'Brandboard', images: folder('milesmeals-resultbrandboard', 'Miles & Meals brandboard, page').map((_, i, all) => all[(i + all.length - 1) % all.length]) },
			{ title: 'Mobile', images: folder('milesmeals-resultsmobile', 'Miles & Meals app, screen') },
			{ title: 'Mockups', images: folder('milesmeals-mockups', 'Miles & Meals mockup') },
		],
	},
	{
		slug: 'click-game',
		title: 'Click game',
		category: 'coding',
		year: 2026,
		preview: image('klikgame-mockup.png'),
		previewAlt: 'Laptop showing the CatVolution click game',
		website: 'https://femkedelatter.be/catVolution/game.html',
		websiteLabel: 'play the game',
		assignment: 'Design a click game in JavaScript with a completely original theme.',
		idea: [
			'The word “game” always makes me happy. I love giving users something interactive to do with my digital work, whether it’s small interactions on a website or full-on conversations with Napoleon Bonaparte in a Figma prototype, as long as there’s an experience to be had.',
			'For this project, I created a cat-themed click game called CatVolution, where cats evolve based on your clicks and merges. I also added upgrades and a “golden poop” bonus for extra clicks. Feel free to play CatVolution if you’re ever bored!',
		],
		tools: ['vscode'],
		inspiration: folder('klikgame-inspiration', 'Click game inspiration'),
		results: [{ title: 'Finished game', images: folder('klikgame-results', 'CatVolution click game, screen') }],
	},
	{
		slug: 'kickstarter',
		title: 'Kickstarter',
		category: 'motion-design',
		year: 2026,
		processLink: 'https://www.figma.com/design/sYzi4gnhVscRfJ4AI9OdCo/Motion---kickstarter?node-id=0-1&t=9sxUUgod6judiQLt-1',
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
		tools: ['after-effects', 'figma', 'photoshop', 'audition'],
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
		tools: ['figma', 'vscode', 'photoshop'],
		video: antwerpOnTapVideo,
		videoTitle: 'Project presentation video',
		videoLast: true,
		// Slides exported from Presentatie.pdf in the same folder.
		process: [
			{
				title: 'Design iterations',
				text: 'We explored many versions of the round coaster logo in different colours, then worked out the tap illustration and scan screen. In the app we tried out several layouts for the bar pages and the account screens, playing with the pixel pattern until it felt just right.',
				images: folder('antwerpontap-process', 'Antwerp on Tap process'),
			},
		],
		inspiration: [{ src: image('antwerpontap-mockups/styleboard-antwerpontap.png'), alt: 'Antwerp on Tap styleboard' }],
		results: [
			{ title: 'Mobile', images: folder('antwerpontap-mobileresults', 'Antwerp on Tap app, screen') },
			{ title: 'Mockups', images: folder('antwerpontap-mockups', 'Antwerp on Tap mockup').filter(({ src }) => src !== image('antwerpontap-mockups/styleboard-antwerpontap.png')) },
			{ title: 'Concept presentation', images: folder('antwerpontap-slidesconcept', 'Antwerp on Tap concept presentation, slide') },
		],
	},
	{
		slug: 'type01',
		title: 'Type01',
		previewTitle: 'Type01 conference website',
		category: 'visual-design',
		year: 2026,
		processLink: 'https://www.figma.com/design/kwTJKp1QLucy6APICrry9K/Type01?node-id=0-1&t=Xz5O7SzOhFDRD9pD-1',
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
		tools: ['figma'],
	},
	{
		slug: 'momu-antwerp',
		title: 'MoMu Antwerp',
		category: 'integration',
		year: 2026,
		processLink: 'https://www.figma.com/design/BKS1iNeh0GECr7MtrxNjbI/Dress-to-impress?node-id=0-1&t=bK2mR0I1XsAW8NKM-1',
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
		tools: ['vscode', 'figma', 'photoshop'],
	},
];

export const projectUrl = (project: Project) => `/work/${project.slug}`;

/** The project a category tag on the home page links to: the featured one, or else the first one with a preview. */
export const featuredProject = (category: Category) => {
	const inCategory = projects.filter((p) => p.category === category && p.preview);
	return inCategory.find((p) => p.featured) ?? inCategory[0];
};
