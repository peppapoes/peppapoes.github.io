/**
 * The tools and languages shown as app-style tiles: under a project ("Used tools")
 * and on the about page ("Skills"). A tile is either two letters on a colour, like
 * the Adobe icons, or a small drawing (`svg`, drawn on a 48 × 48 grid).
 */
type Tile = { name: string; bg: string } & ({ short: string; fg: string } | { svg: string });

const shield = 'M11 8h26l-2.4 27L24 39l-10.6-4z';
const digit = (text: string, color: string) =>
	`<path d="${shield}" fill="#fff"/><text x="24" y="31" text-anchor="middle" font-size="20" font-weight="700" fill="${color}">${text}</text>`;

export const tools = {
	'after-effects': { name: 'Adobe After Effects', short: 'Ae', bg: '#00005b', fg: '#9999ff' },
	photoshop: { name: 'Adobe Photoshop', short: 'Ps', bg: '#001e36', fg: '#31a8ff' },
	illustrator: { name: 'Adobe Illustrator', short: 'Ai', bg: '#330000', fg: '#ff9a00' },
	indesign: { name: 'Adobe InDesign', short: 'Id', bg: '#49021f', fg: '#ff3366' },
	lightroom: { name: 'Adobe Lightroom', short: 'Lr', bg: '#001e36', fg: '#31a8ff' },
	figma: {
		name: 'Figma',
		bg: '#1e1e1e',
		svg: `<g transform="translate(24 24) scale(1.45) translate(-24 -24)">
			<path d="M24 12h-4a4 4 0 0 0 0 8h4z" fill="#f24e1e"/>
			<path d="M24 12h4a4 4 0 0 1 0 8h-4z" fill="#ff7262"/>
			<path d="M24 20h-4a4 4 0 0 0 0 8h4z" fill="#a259ff"/>
			<circle cx="28" cy="24" r="4" fill="#1abcfe"/>
			<path d="M20 28h4v4a4 4 0 1 1-4-4z" fill="#0acf83"/>
		</g>`,
	},
	procreate: {
		name: 'Procreate',
		bg: '#151515',
		svg: `<defs><linearGradient id="procreate-stroke" x1="0" y1="1" x2="1" y2="0">
			<stop offset="0" stop-color="#ffb62e"/><stop offset="0.5" stop-color="#ff4f8b"/><stop offset="1" stop-color="#4f7bff"/>
		</linearGradient></defs>
		<path d="M11 36c9-3 20-11 26-24" fill="none" stroke="url(#procreate-stroke)" stroke-width="7" stroke-linecap="round"/>`,
	},
	sketchbook: {
		name: 'Sketchbook',
		bg: '#ee5e37',
		svg: `<g transform="rotate(20 24 24)">
			<path d="M19 6h10v24H19z" fill="#fff"/><path d="M19 6h10v5H19z" fill="#ffd0c2"/>
			<path d="M19 30h10l-5 11z" fill="#f6d9b8"/><path d="M22.2 37h3.6L24 41z" fill="#2b2b2b"/>
		</g>`,
	},
	html: { name: 'HTML', bg: '#e44d26', svg: digit('5', '#e44d26') },
	css: { name: 'CSS', bg: '#1572b6', svg: digit('3', '#1572b6') },
	javascript: {
		name: 'JavaScript',
		bg: '#f7df1e',
		svg: `<text x="42" y="40" text-anchor="end" font-size="21" font-weight="700" fill="#222">JS</text>`,
	},
	'sketchup-layout': {
		name: 'SketchUp Layout',
		bg: '#fff',
		svg: `<path d="M24 9l16 8-16 8-16-8z" fill="#1f5fa8"/>
		<path d="M8 24l16 8 16-8M8 31l16 8 16-8" fill="none" stroke="#1f5fa8" stroke-width="3" stroke-linejoin="round"/>`,
	},
	'siemens-nx': { name: 'Siemens NX', short: 'NX', bg: '#8c1c1c', fg: '#fff' },
	sketchup: {
		name: 'SketchUp',
		bg: '#fff',
		svg: `<g fill="#111" stroke="#fff" stroke-width="1.2" stroke-linejoin="round">
			<path d="M9 16l16-6 14 5-16 7z"/><path d="M9 16l14 6v18L9 33z"/><path d="M23 22l16-7v17l-16 8z"/>
		</g>`,
	},
	blender: {
		name: 'Blender',
		bg: '#fff',
		svg: `<path d="M4 30l19-16 4 4-8 7z" fill="#f5792a"/><path d="M9 21h14v5H9z" fill="#f5792a"/>
		<circle cx="28" cy="27" r="12" fill="#f5792a"/><circle cx="28" cy="27" r="7" fill="#fff"/><circle cx="28" cy="27" r="4.6" fill="#265787"/>`,
	},
} satisfies Record<string, Tile>;

export type Tool = keyof typeof tools;

/** The skills on the about page, per topic, in the order they're shown. */
export const skills: { title: string; tools: Tool[] }[] = [
	{
		title: 'Design skills',
		tools: ['after-effects', 'figma', 'illustrator', 'indesign', 'photoshop', 'lightroom', 'procreate', 'sketchbook'],
	},
	{ title: 'Development skills', tools: ['css', 'html', 'javascript'] },
	{ title: 'Modelling skills', tools: ['sketchup-layout', 'siemens-nx', 'sketchup', 'blender'] },
];
