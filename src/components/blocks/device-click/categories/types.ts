export type CategoryColor =
	| 'text-success-500'
	| 'text-other-100'
	| 'text-warning-500'
	| 'text-error-500';

export interface CategoryItem {
	Label: string;
	id: string;
	color?: CategoryColor;
	info?: string;
	value: boolean;
	locked?: boolean;
}

export const categoryOrder = [
	'Technology',
	'Content Servers',
	'Media',
	'Business',
	'Health',
	'SocialMedia',
	'Jobs',
	'Shopping',
	'Mature',
	'Information',
	'Games',
	'Proxies',
	'Travel',
	'Sports',
	'Prohibited',
	'NoData',
	'Search',
	'Ad Services',
	'Chats',
	'News'
] as const;

export const categoryColorMap: Record<string, CategoryColor> = {
	Technology: 'text-success-500',
	'Content Servers': 'text-other-100',
	Media: 'text-warning-500',
	Business: 'text-success-500',
	Health: 'text-other-100',
	SocialMedia: 'text-warning-500',
	Jobs: 'text-other-100',
	Shopping: 'text-warning-500',
	Mature: 'text-error-500',
	Information: 'text-other-100',
	Games: 'text-warning-500',
	Proxies: 'text-error-500',
	Travel: 'text-other-100',
	Sports: 'text-warning-500',
	Prohibited: 'text-error-500',
	NoData: 'text-other-100',
	Search: 'text-warning-500',
	'Ad Services': 'text-error-500',
	Chats: 'text-other-100',
	News: 'text-warning-500'
};
export interface CategoryItem {
	Label: string;
	id: string;
	color?: CategoryColor;
	info?: string;
	value: boolean;
	locked?: boolean;
}
