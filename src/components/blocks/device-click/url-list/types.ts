export interface LogItem {
	status: string;
	date: string;
	industry: string;
	url: string;
	domain: string;
}

export interface ApiLogItem {
	state: string;
	time: string;
	log: string;
	url: string;
}

export interface AddonSiteItem {
	Label: string;
	id: string;
	info?: string;
	value: boolean;
}

export interface AddonSiteLists {
	title: string;
	info: string;
	value: boolean;
}
export interface FilteringItem {
	title: string;
	info: string;
	icon: string;
	showButton?: boolean;
	value?: boolean;
	option?: { value: string; styles?: string };
	dropdownOptions?: Array<{ value: string; styles: string }>;
}
